import { test, expect } from '@playwright/test';

import { LandingPage } from '../../../pages/booking/LandingPage';
import { BookingPage } from '../../../pages/booking/BookingPage';
import { ConfirmationModal } from '../../../pages/booking/ConfirmationModal';

test.describe('Booking Alternative', () => {

    test('deve validar dados do agendamento criado', async ({ page }) => {

        const landingPage = new LandingPage(page);

        const bookingPage = new BookingPage(page);

        const confirmationModal =
            new ConfirmationModal(page);

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

        await bookingPage.confirmBooking();

        await confirmationModal.validateSuccess();

        await expect(
            page.locator('text=Barba')
        ).toBeVisible();

        await expect(
            page.locator('text=Dilsinho')
        ).toBeVisible();

        await expect(
            page.locator('text=Guilherme QA')
        ).toBeVisible();
    });
});