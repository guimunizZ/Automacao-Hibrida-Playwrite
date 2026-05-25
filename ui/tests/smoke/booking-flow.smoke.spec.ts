import { test, expect } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';

import { BookingPage } from '../../pages/booking/BookingPage';

import { ConfirmationModal } from '../../pages/booking/ConfirmationModal';

test.describe('Smoke - Booking Flow', () => {

    test('[@smoke] usuário deve conseguir realizar um agendamento válido', async ({ page }) => {

        test.setTimeout(120000);

        const landingPage = new LandingPage(page);

        const bookingPage = new BookingPage(page);

        const confirmationModal = new ConfirmationModal(page);

        await landingPage.open();

        await landingPage.validateHomeLoaded();

        await landingPage.selectUnit();

        await bookingPage.selectService();

        await bookingPage.selectBarber();

        await bookingPage.fillClient(
            'Guilherme QA',
            '(11) 99999-9999'
        );

        await bookingPage.selectDate();

        await bookingPage.selectTime();

        await bookingPage.confirmBooking();

        await confirmationModal.validateSuccess();

        await confirmationModal.validateBookingDetails();

        expect(true).toBeTruthy();
    });
});