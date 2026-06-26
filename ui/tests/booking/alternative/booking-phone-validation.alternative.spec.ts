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
            'não deve permitir agendamento sem telefone',

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
                 Dilsinho agora pertence
                 à Unidade 2
                */

                await landingPage.selectUnit(
                    1
                );

                await bookingPage.selectService(
                    0
                );

                await bookingPage.selectBarber(
                    'Dilsinho'
                );

                await bookingPage.fillOnlyName(
                    'Guilherme QA'
                );

                await bookingPage.selectFutureDate();

                await bookingPage.selectHour();

                await expect(
                    bookingPage.confirmButton
                )
                    .toBeDisabled();

            }

        );

    }

);