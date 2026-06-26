import {
    test,
    expect
} from '@playwright/test';

import {
    LandingPage
} from '../../pages/booking/LandingPage';

import {
    BookingPage
} from '../../pages/booking/BookingPage';

import {
    ConfirmationModal
} from '../../pages/booking/ConfirmationModal';

test.describe(
    'Smoke - Confirmation',
    () => {

        test(
            '[@smoke] resumo deve refletir exatamente a reserva realizada',

            async ({ page }) => {

                const landingPage =
                    new LandingPage(page);

                const bookingPage =
                    new BookingPage(page);

                const confirmationModal =
                    new ConfirmationModal(page);

                const selectedUnit =
                    'Unidade I';

                const selectedService =
                    'Barba • 30 min';

                const selectedBarber =
                    'Carlos Henrique';

                await landingPage.goto();

                await landingPage.selectUnit(
                    0
                );

                await bookingPage.selectService(
                    0
                );

                await bookingPage.selectBarber(
                    selectedBarber
                );

                await bookingPage.fillClient();

                await bookingPage.selectFutureDate();

                const selectedHour =
                    await page
                        .locator(
                            'button'
                        )
                        .filter({
                            hasText:
                                /^\d{2}:\d{2}$/
                        })
                        .first()
                        .textContent();

                await bookingPage.selectHour();

                await bookingPage.confirmButton.click();

                await confirmationModal.validateSuccess();

                await expect(
                    page.locator(
                        'main'
                    )
                ).toContainText(
                    selectedService
                );

                await expect(
                    page.locator(
                        'main'
                    )
                ).toContainText(
                    selectedBarber
                );

                await expect(
                    page.locator(
                        'main'
                    )
                ).toContainText(
                    selectedUnit
                );

                await expect(
                    page.locator(
                        'main'
                    )
                ).toContainText(
                    selectedHour ?? ''
                );

                await expect(
                    page.getByText(
                        /\d{2}\/\d{2}\/\d{4}/
                    )
                ).toBeVisible();

            }

        );

    }

);