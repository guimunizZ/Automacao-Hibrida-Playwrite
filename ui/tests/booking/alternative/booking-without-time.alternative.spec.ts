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
            'não deve permitir confirmar sem horário',

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

                await bookingPage.selectFutureDate();

                /*
                 NÃO seleciona horário
                */

                await expect(
                    bookingPage.confirmButton
                )
                    .toBeDisabled();

            }

        );

    }

);