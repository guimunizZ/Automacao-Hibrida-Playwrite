import {
    expect,
    Locator,
    Page
} from '@playwright/test';

import {
    BasePage
} from '../base/BasePage';

export class ConfirmationModal extends BasePage {

    readonly successTitle: Locator;

    readonly successMessage: Locator;

    readonly bookingDetails: Locator;

    constructor(page: Page) {

        super(page);

        this.successTitle =
            page.locator(
                'text=/Reserva/i'
            );

        this.successMessage =
            page.locator(
                'text=/agendado|sucesso|confirmada/i'
            );

        this.bookingDetails =
            page.locator(
                'text=Barba'
            );
    }

    async validateSuccess() {

        await expect(
            this.successTitle.first()
        ).toBeVisible({
            timeout: 20000
        });

        await expect(
            this.successMessage.first()
        ).toBeVisible({
            timeout: 20000
        });
    }

    async validateBookingDetails() {

        await expect(
            this.bookingDetails.first()
        ).toBeVisible();
    }

    async validateClientName(
        name: string
    ) {

        await expect(
            this.page.getByText(
                name
            )
        ).toBeVisible();
    }

    async validateBarber(
        barber: string
    ) {

        await expect(
            this.page.getByText(
                barber
            )
        ).toBeVisible();
    }

    async validateService(
        service: string
    ) {

        await expect(
            this.page.getByText(
                service
            )
        ).toBeVisible();
    }
}