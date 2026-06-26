import {
    test,
    expect
} from '@playwright/test';

import {
    LandingPage
} from '../../../pages/booking/LandingPage';

import {
    BookingPage
} from '../../../pages/booking/BookingPage';

function normalize(
    value: string
) {

    return value
        .replace(/\u00A0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

}

test.describe(
    'Booking Alternative',

    () => {

        test(

            'deve validar resumo do agendamento',

            async ({ page }) => {

                const landingPage =
                    new LandingPage(
                        page
                    );

                const bookingPage =
                    new BookingPage(
                        page
                    );

                await landingPage.goto();

                /*
                 Unidade II
                 (Dilsinho)
                */

                await landingPage.selectUnit(
                    1
                );

                /*
                 serviço esperado
                */

                const selectedService =
                    'Barba';

                /*
                 pega exatamente
                 o card escolhido
                */

                const serviceTitle =
                    page
                        .getByText(
                            selectedService,
                            {
                                exact: true
                            }
                        )
                        .first();

                await expect(
                    serviceTitle
                )
                    .toBeVisible();

                const serviceCard =
                    serviceTitle
                        .locator(
                            'xpath=ancestor::*[.//button[contains(.,"Reservar")]][1]'
                        );

                const serviceData =
                    normalize(
                        (
                            await serviceCard
                                .textContent()
                        )
                        ?? ''
                    );

                const selectedPrice =
                    (
                        serviceData.match(
                            /R\$\s*[\d.,]+/
                        )
                        ?? []
                    )[0]

                    ?? '';

                console.log(
                    '\n===== SERVIÇO ESCOLHIDO ====='
                );

                console.log(
                    serviceData
                );

                /*
                 reserva exatamente
                 esse serviço
                */

                await serviceCard
                    .getByRole(
                        'button',
                        {
                            name:
                                'Reservar'
                        }
                    )
                    .click();

                await bookingPage.selectBarber(
                    'Dilsinho'
                );

                await bookingPage.fillClientCustom(
                    'Guilherme QA',
                    '(11) 99999-9999'
                );

                await bookingPage.selectFutureDate();

                const selectedHour =
                    (
                        await page
                            .locator(
                                'button'
                            )
                            .filter({
                                hasText:
                                    /^\d{2}:\d{2}$/
                            })
                            .first()
                            .textContent()
                    )
                        ?.trim()

                    ?? '';

                await bookingPage.selectAvailableTime();

                /*
                 resumo REAL
                */

                const summary =
                    page
                        .locator(
                            'div'
                        )
                        .filter({
                            hasText:
                                /Previsão do atendimento/i
                        })
                        .first();

                await expect(
                    summary
                )
                    .toBeVisible();

                const summaryText =
                    normalize(
                        (
                            await summary
                                .textContent()
                        )
                        ?? ''
                    );

                console.log(
                    '\n===== RESUMO ====='
                );

                console.log(
                    summaryText
                );

                /*
                 validação
                */

                expect(
                    summaryText
                )
                    .toContain(
                        selectedService
                    );

                expect(
                    normalize(
                        summaryText
                    )
                )
                    .toContain(
                        normalize(
                            selectedPrice
                        )
                    );

                expect(
                    summaryText
                )
                    .toContain(
                        selectedHour
                    );

                await expect(
                    page.getByText(
                        'Previsão do atendimento'
                    )
                )
                    .toBeVisible();

                console.log(
                    '\n✓ Resumo corresponde ao serviço reservado\n'
                );

            }

        );

    }

);