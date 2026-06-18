import { test, expect } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';
import { BookingPage } from '../../pages/booking/BookingPage';

test.describe(
    'Smoke - Times',
    () => {

        test(
            '[@smoke] horários devem aparecer somente após selecionar barbeiro e data',
            async ({ page }) => {

                const landingPage =
                    new LandingPage(page);

                const bookingPage =
                    new BookingPage(page);

                await landingPage.goto();

                await landingPage.selectUnit(0);

                await bookingPage.selectService(0);

                const hoursBeforeBarber =
                    page.locator('button')
                        .filter({
                            hasText: /^\d{2}:\d{2}$/
                        });

                await expect(
                    hoursBeforeBarber
                ).toHaveCount(0);

                await bookingPage.selectBarber(
                    'Dilsinho'
                );

                const hoursBeforeDate =
                    page.locator('button')
                        .filter({
                            hasText: /^\d{2}:\d{2}$/
                        });

                await expect(
                    hoursBeforeDate
                ).toHaveCount(0);

                await bookingPage.selectFutureDate();

                const availableHours =
                    page.locator('button')
                        .filter({
                            hasText: /^\d{2}:\d{2}$/
                        });

                await expect(
                    availableHours.first()
                ).toBeVisible();
            }
        );
    }
);