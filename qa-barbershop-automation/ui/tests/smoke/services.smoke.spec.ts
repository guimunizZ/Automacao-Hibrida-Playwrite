import { test } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';

import { BookingPage } from '../../pages/booking/BookingPage';

test.describe('Smoke - Services', () => {

    test('[@smoke] serviços devem ser exibidos', async ({ page }) => {

        const landingPage = new LandingPage(page);

        const bookingPage = new BookingPage(page);

        await landingPage.open();

        await landingPage.selectUnit();

        await bookingPage.validateServicesLoaded();
    });
});