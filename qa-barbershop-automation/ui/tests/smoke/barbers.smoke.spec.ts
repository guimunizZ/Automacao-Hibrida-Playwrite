import { test } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';

import { BookingPage } from '../../pages/booking/BookingPage';

test.describe('Smoke - Barbers', () => {

    test('[@smoke] barbeiros devem carregar', async ({ page }) => {

        const landingPage = new LandingPage(page);

        const bookingPage = new BookingPage(page);

        await landingPage.open();

        await landingPage.selectUnit();

        await bookingPage.selectService();

        await bookingPage.validateBarbersLoaded();
    });
});