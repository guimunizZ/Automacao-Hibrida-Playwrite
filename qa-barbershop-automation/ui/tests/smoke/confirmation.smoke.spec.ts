import { test } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';

import { BookingPage } from '../../pages/booking/BookingPage';

import { ConfirmationModal } from '../../pages/booking/ConfirmationModal';

test.describe('Smoke - Confirmation', () => {

    test('[@smoke] modal de confirmação deve abrir', async ({ page }) => {

        const landingPage = new LandingPage(page);

        const bookingPage = new BookingPage(page);

        const confirmationModal = new ConfirmationModal(page);

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

        await bookingPage.confirmBooking();

        await confirmationModal.validateSuccess();
    });
});