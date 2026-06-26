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

test.describe(
    'Booking Alternative',

    () => {

        test(
            'não deve permitir confirmar sem data',

            async ({ page }) => {

                const landingPage =
                    new LandingPage(page);

                const bookingPage =
                    new BookingPage(page);

                await landingPage.open();

                await landingPage.selectUnit(
                    1
                );

                await bookingPage.selectService();

                await bookingPage.selectBarber(
                    'Dilsinho'
                );

                await bookingPage.fillClientCustom(
                    'Guilherme QA',
                    '(11) 99999-9999'
                );

                /*
                 SEM DATA
                */

                const availableTimes =
                    page
                        .locator(
                            'button'
                        )
                        .filter({
                            hasText:
                                /^\d{2}:\d{2}$/
                        });

                await expect(
                    availableTimes
                )
                    .toHaveCount(
                        0
                    );

                await expect(
                    bookingPage.confirmButton
                )
                    .toBeDisabled();

            }

        );

    }

);