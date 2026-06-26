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
            'não deve permitir agendamento sem nome',

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

                await bookingPage.fillOnlyPhone(
                    '(11) 99999-9999'
                );

                await bookingPage.selectFutureDate();

                await bookingPage.selectAvailableTime();

                await expect(
                    bookingPage.confirmButton
                )
                    .toBeDisabled();

            }

        );

    }

);