import { test } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';

import { BookingPage } from '../../pages/booking/BookingPage';

import { ConfirmationModal } from '../../pages/booking/ConfirmationModal';

test.describe('Smoke - Booking Flow', () => {

    test('[@smoke] fluxo completo de agendamento', async ({ page }) => {

        const landingPage =
            new LandingPage(page);

        const bookingPage =
            new BookingPage(page);

        const confirmationModal =
            new ConfirmationModal(page);

        await landingPage.goto();

        await landingPage.selectUnit(0);

        await bookingPage.selectService(0);

        await bookingPage.selectBarber(
            'Dilsinho'
        );

        await bookingPage.fillClient();

        await bookingPage.selectFutureDate();

        await bookingPage.selectHour();

        await bookingPage.validateCanConfirm();

        await bookingPage.confirmButton.click();

        await confirmationModal.validateSuccess();
    });
});