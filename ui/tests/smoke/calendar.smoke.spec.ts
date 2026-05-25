import { test } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';

import { BookingPage } from '../../pages/booking/BookingPage';

test.describe('Smoke - Calendar', () => {

    test('[@smoke] calendário deve carregar datas futuras', async ({ page }) => {

        const landingPage = new LandingPage(page);

        const bookingPage = new BookingPage(page);

        await landingPage.open();

        await landingPage.selectUnit();

        await bookingPage.selectService();

        await bookingPage.selectBarber();

        await bookingPage.fillClient(
            'Guilherme QA',
            '(11) 99999-9999'
        );

        await bookingPage.validateFutureDates();
    });
});