import { test, expect } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';
import { BookingPage } from '../../pages/booking/BookingPage';

test.describe(
    'Smoke - Barbers',
    () => {

        test(
            '[@smoke] barbeiros da unidade I devem pertencer à unidade e ser selecionáveis',
            async ({ page }) => {

                const landingPage =
                    new LandingPage(page);

                const bookingPage =
                    new BookingPage(page);

                await landingPage.goto();

                await landingPage.selectUnit(0);

                await bookingPage.selectService(0);

                await expect(
                    page.getByRole(
                        'button',
                        {
                            name:
                                /Carlos Henrique/
                        }
                    )
                ).toBeVisible();

                await expect(
                    page.getByRole(
                        'button',
                        {
                            name:
                                /Matheus|Thiago|Dilsinho/
                        }
                    )
                ).toHaveCount(0);

                await bookingPage.selectBarber(
                    'Carlos Henrique'
                );

                await expect(
                    page.getByRole('textbox')
                        .first()
                ).toBeVisible();
            }
        );

        test(
            '[@smoke] barbeiros da unidade II devem pertencer à unidade e ser selecionáveis',
            async ({ page }) => {

                const landingPage =
                    new LandingPage(page);

                const bookingPage =
                    new BookingPage(page);

                await landingPage.goto();

                await landingPage.selectUnit(1);

                await bookingPage.selectService(0);

                await expect(
                    page.getByRole(
                        'button',
                        {
                            name: /Matheus/
                        }
                    )
                ).toBeVisible();

                await expect(
                    page.getByRole(
                        'button',
                        {
                            name: /Thiago/
                        }
                    )
                ).toBeVisible();

                await expect(
                    page.getByRole(
                        'button',
                        {
                            name: /Dilsinho/
                        }
                    )
                ).toBeVisible();

                await expect(
                    page.getByRole(
                        'button',
                        {
                            name:
                                /Carlos Henrique/
                        }
                    )
                ).toHaveCount(0);

                await bookingPage.selectBarber(
                    'Thiago'
                );

                await expect(
                    page.getByRole('textbox')
                        .first()
                ).toBeVisible();
            }
        );
    }
);