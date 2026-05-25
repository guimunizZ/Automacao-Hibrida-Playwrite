import { test, expect } from '@playwright/test';

import { LandingPage } from '../../../pages/booking/LandingPage';
import { BookingPage } from '../../../pages/booking/BookingPage';

test.describe('Booking Alternative', () => {

    test('não deve permitir confirmar sem horário', async ({ page }) => {

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

        await expect(
            bookingPage.confirmButton
        ).toBeDisabled();
    });
});