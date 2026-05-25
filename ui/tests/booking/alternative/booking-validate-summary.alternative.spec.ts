import { test, expect } from '@playwright/test';

import { LandingPage } from '../../../pages/booking/LandingPage';
import { BookingPage } from '../../../pages/booking/BookingPage';

test.describe('Booking Alternative', () => {

    test('deve validar resumo do agendamento', async ({ page }) => {

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

        await bookingPage.selectFutureDate();

        await bookingPage.selectAvailableTime();

        await expect(
            page.locator('text=Barba')
        ).toBeVisible();

        await expect(
            page.locator('text=Dilsinho')
        ).toBeVisible();
    });
});