import {
    test
} from '@playwright/test';

import {
    LandingPage
} from '../../pages/booking/LandingPage';

import {
    BookingPage
} from '../../pages/booking/BookingPage';

test.use({
    storageState:
        'auth/user.json'
});

test.describe(
    'Smoke - Calendar',
    () => {

        test(
            '[@smoke] deve validar bloqueio de data passada',
            async ({ page }) => {

                const landingPage =
                    new LandingPage(page);

                const bookingPage =
                    new BookingPage(page);

                await landingPage.goto();

                await landingPage.selectUnit(
                    0
                );

                await bookingPage.selectService(
                    0
                );

                await bookingPage.selectBarber(
                    'Dilsinho'
                );

                await bookingPage.fillClient();

                await bookingPage.tryPastDate();

                await bookingPage.validateCannotConfirmPastDate();

                await bookingPage.selectFutureDate();

                await bookingPage.selectHour();

                await bookingPage.validateCanConfirm();
            }
        );
    }
);