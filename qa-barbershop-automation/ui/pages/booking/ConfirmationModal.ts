import { expect, Locator, Page } from '@playwright/test';

import { BasePage } from '../base/BasePage';

export class ConfirmationModal extends BasePage {

    readonly successTitle: Locator;

    readonly successMessage: Locator;

    readonly bookingDetails: Locator;

    constructor(page: Page) {

        super(page);

        this.successTitle = page.locator('text=Reserva confirmada');

        this.successMessage = page.locator(
            'text=Seu horário foi agendado com sucesso'
        );

        this.bookingDetails = page.locator(
            'text=Barba'
        );
    }

    async validateSuccess() {

        await expect(this.successTitle).toBeVisible({
            timeout: 15000
        });

        await expect(this.successMessage).toBeVisible();
    }

    async validateBookingDetails() {

        await expect(this.bookingDetails.first()).toBeVisible();
    }
}