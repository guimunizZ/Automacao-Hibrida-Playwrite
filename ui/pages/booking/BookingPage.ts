import {
    expect,
    Locator,
    Page
} from '@playwright/test';

export class BookingPage {

    readonly page: Page;

    readonly confirmButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.confirmButton =
            page.getByRole(
                'button',
                {
                    name: /confirmar reserva/i
                }
            );
    }

    async selectService(
        index: number = 0
    ) {

        await this.page.waitForURL(
            /barbershops\/\d+/,
            {
                timeout: 30000
            }
        );

        const serviceButtons =
            this.page.getByRole(
                'button',
                {
                    name: 'Reservar'
                }
            );

        await expect(
            serviceButtons.nth(index)
        ).toBeVisible();

        await serviceButtons
            .nth(index)
            .click();

        await expect(
            this.page.getByText(
                'Escolha seu barbeiro'
            )
        ).toBeVisible();
    }

    async selectBarber(
        barberName: string
    ) {

        const barberButton =
            this.page.getByRole(
                'button',
                {
                    name: new RegExp(
                        barberName,
                        'i'
                    )
                }
            );

        await expect(
            barberButton
        ).toBeVisible();

        await barberButton.click();
    }

    async fillClient() {

        await this.page
            .getByRole('textbox')
            .first()
            .fill(
                'GUILHERME QA'
            );

        await this.page
            .getByRole('textbox')
            .nth(1)
            .fill(
                '(11)99999-9999'
            );
    }

    async fillOnlyName(
        name: string
    ) {

        await this.page
            .getByRole('textbox')
            .first()
            .fill(name);
    }

    async fillOnlyPhone(
        phone: string
    ) {

        await this.page
            .getByRole('textbox')
            .nth(1)
            .fill(phone);
    }

    async fillClientCustom(
        name: string,
        phone: string
    ) {

        await this.page
            .getByRole('textbox')
            .first()
            .fill(name);

        await this.page
            .getByRole('textbox')
            .nth(1)
            .fill(phone);
    }

    async tryPastDate() {

        const sundayButton =
            this.page.locator(
                'button[data-day]'
            ).filter({
                has: this.page.locator(
                    '[aria-label*="domingo"]'
                )
            });

        if (
            await sundayButton.count()
        ) {

            await sundayButton
                .first()
                .click();
        }
    }

    async validateCannotConfirmPastDate() {

        await expect(
            this.confirmButton
        ).toBeDisabled();
    }

    async selectFutureDate() {

        const futureDate =
            this.page.getByRole(
                'button',
                {
                    name:
                        /segunda-feira|terça-feira|quarta-feira|quinta-feira|sexta-feira/i
                }
            ).last();

        await expect(
            futureDate
        ).toBeVisible();

        await futureDate.click();

        await this.page.waitForTimeout(
            2000
        );
    }

    async selectHour() {

        const hourButton =
            this.page.locator(
                'button'
            ).filter({
                hasText: /^\d{2}:\d{2}$/
            }).first();

        await expect(
            hourButton
        ).toBeVisible();

        await hourButton.click();
    }

    async selectAvailableTime() {

        await this.selectHour();
    }

    async validateCanConfirm() {

        await expect(
            this.confirmButton
        ).toBeEnabled();
    }

    async validateServicesLoaded() {

        await expect(
            this.page.getByRole(
                'button',
                {
                    name: 'Reservar'
                }
            ).first()
        ).toBeVisible();
    }

    async validateAvailableTimes() {

        await expect(
            this.page.locator(
                'button'
            ).filter({
                hasText: /^\d{2}:\d{2}$/
            }).first()
        ).toBeVisible();
    }
}