import { test, expect } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';
import { BookingPage } from '../../pages/booking/BookingPage';

test.describe(
    'Smoke - Services',
    () => {

        test(
            '[@smoke] serviço selecionado deve aparecer corretamente no resumo',
            async ({ page }) => {

                const landingPage =
                    new LandingPage(page);

                const bookingPage =
                    new BookingPage(page);

                await landingPage.goto();

                await landingPage.selectUnit(0);

                // Serviço Barba
                await bookingPage.selectService(0);

                // Resumo

                await expect(
                    page.getByRole(
                        'heading',
                        {
                            name: 'Barba',
                            exact: true
                        }
                    )
                ).toBeVisible();

                await expect(
                    page.getByRole(
                        'heading',
                        {
                            name: 'R$ 30,00',
                            exact: true
                        }
                    )
                ).toBeVisible();

                // Seleciona barbeiro

                await bookingPage.selectBarber(
                    'Dilsinho'
                );

                // Seleciona data

                await bookingPage.selectFutureDate();

                // Duração do serviço

                await expect(
                    page.getByText(
                        'Serviço com duração de 30 min',
                        {
                            exact: true
                        }
                    )
                ).toBeVisible();
            }
        );
    }
);