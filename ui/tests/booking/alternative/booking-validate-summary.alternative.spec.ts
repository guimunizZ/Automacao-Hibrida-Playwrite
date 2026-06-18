import {
    test,
    expect
} from '@playwright/test';

import { LandingPage } from '../../../pages/booking/LandingPage';
import { BookingPage } from '../../../pages/booking/BookingPage';

test.describe(
    'Booking Alternative',
    () => {

        test(
            'deve validar resumo do agendamento',
            async ({ page }) => {

                const landingPage =
                    new LandingPage(page);

                const bookingPage =
                    new BookingPage(page);

                await landingPage.open();

                await landingPage.selectUnit();

                const serviceName =
                    (
                        await page
                            .getByRole(
                                'heading',
                                {
                                    name: /barba/i
                                }
                            )
                            .first()
                            .textContent()
                    )?.trim() ?? '';

                console.log(
                    'Serviço:',
                    serviceName
                );

                const servicePrice =
                    (
                        await page
                            .getByText(
                                /r\$\s*\d+/i
                            )
                            .first()
                            .textContent()
                    )?.trim() ?? '';

                console.log(
                    'Preço:',
                    servicePrice
                );

                await bookingPage.selectService();

                await bookingPage.selectBarber(
                    'Dilsinho'
                );

                await bookingPage.fillClientCustom(
                    'Guilherme QA',
                    '(11) 99999-9999'
                );

                const selectedDate =
                    (
                        await page
                            .getByRole(
                                'button',
                                {
                                    name:
                                        /segunda-feira|terça-feira|quarta-feira|quinta-feira|sexta-feira/i
                                }
                            )
                            .last()
                            .getAttribute(
                                'aria-label'
                            )
                    ) ?? '';

                console.log(
                    'Data:',
                    selectedDate
                );

                await bookingPage.selectFutureDate();

                const selectedTime =
                    (
                        await page
                            .locator('button')
                            .filter({
                                hasText:
                                    /^\d{2}:\d{2}$/
                            })
                            .first()
                            .textContent()
                    )?.trim() ?? '';

                console.log(
                    'Horário:',
                    selectedTime
                );

                await bookingPage.selectAvailableTime();

                const summary =
                    page.locator(
                        '.border-t.border-secondary'
                    ).nth(1);

                await expect(
                    summary
                ).toBeVisible();

                const summaryText =
                    (
                        await summary.textContent()
                    )?.trim() ?? '';

                console.log(
                    'Resumo:',
                    summaryText
                );

                await expect(
                    summary
                ).toContainText(
                    serviceName
                );

                await expect(
                    summary
                ).toContainText(
                    servicePrice
                );

                await expect(
                    summary
                ).toContainText(
                    selectedTime
                );

                const dayMatch =
                    selectedDate.match(
                        /(\d+)/
                    );

                if (
                    dayMatch
                ) {

                    await expect(
                        summary
                    ).toContainText(
                        dayMatch[1]
                    );
                }

                const monthMatch =
                    selectedDate.match(
                        /de\s+([a-zç]+)/i
                    );

                if (
                    monthMatch
                ) {

                    await expect(
                        summary
                    ).toContainText(
                        new RegExp(
                            monthMatch[1],
                            'i'
                        )
                    );
                }
            }
        );
    }
);