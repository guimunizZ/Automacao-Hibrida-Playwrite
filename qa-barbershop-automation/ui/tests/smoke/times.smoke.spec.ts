import { test } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';

import { BookingPage } from '../../pages/booking/BookingPage';

test.describe('Smoke - Times', () => {

    test('[@smoke] horários devem carregar', async ({ page }) => {

        test.setTimeout(120000);

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

        await bookingPage.selectDate();

        await bookingPage.selectTime();

        await bookingPage.validateAvailableTimes();
    });
});