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
            'não deve permitir confirmar reserva sem selecionar barbeiro',
            async ({ page }) => {

                const landingPage =
                    new LandingPage(page);

                const bookingPage =
                    new BookingPage(page);

                await landingPage.open();

                await landingPage.selectUnit();

                await bookingPage.selectService();

                // NÃO seleciona barbeiro

                await bookingPage.fillClientCustom(
                    'Guilherme QA',
                    '(11) 99999-9999'
                );

                const futureDate =
                    page.getByRole(
                        'button',
                        {
                            name:
                                /segunda-feira|terça-feira|quarta-feira|quinta-feira|sexta-feira/i
                        }
                    ).last();

                await expect(
                    futureDate
                ).toBeVisible();

                await futureDate.click();

                const availableTimes =
                    page.locator('button')
                        .filter({
                            hasText:
                                /^\d{2}:\d{2}$/
                        });

                await expect(
                    availableTimes
                ).toHaveCount(0);

                const confirmButton =
                    page.getByRole(
                        'button',
                        {
                            name:
                                'Confirmar reserva'
                        }
                    );

                await expect(
                    confirmButton
                ).toBeVisible();

                await expect(
                    confirmButton
                ).toBeDisabled();
            }
        );
    }
);