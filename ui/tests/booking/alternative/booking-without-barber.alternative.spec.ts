import { test, expect } from '@playwright/test';

import { LandingPage } from '../../../pages/booking/LandingPage';
import { BookingPage } from '../../../pages/booking/BookingPage';

test.describe('Booking Alternative', () => {

    test('não deve carregar agenda sem barbeiro', async ({ page }) => {

        const landingPage = new LandingPage(page);

        const bookingPage = new BookingPage(page);

        await landingPage.open();

        await landingPage.selectUnit();

        await bookingPage.selectService();

        const calendar = page.locator('text=Escolha uma data');

        await expect(calendar).not.toBeVisible();
    });
});