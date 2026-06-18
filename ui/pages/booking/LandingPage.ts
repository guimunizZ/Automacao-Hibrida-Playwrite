import {
    expect,
    Locator,
    Page
} from '@playwright/test';

export class LandingPage {

    readonly page: Page;

    readonly reserveButtons: Locator;

    constructor(page: Page) {

        this.page = page;

        this.reserveButtons =
            page.getByRole(
                'button',
                {
                    name: 'Reservar'
                }
            );
    }

    async goto() {

        await this.page.goto('/');

        await this.page.waitForLoadState(
            'domcontentloaded'
        );
    }

    async open() {

        await this.goto();
    }

    async validateHomeLoaded() {

        await expect(
            this.reserveButtons.first()
        ).toBeVisible();
    }

    async selectUnit(
        unitIndex: number = 0
    ) {

        const button =
            this.reserveButtons.nth(
                unitIndex
            );

        await expect(
            button
        ).toBeVisible();

        await button.click();

        await this.page.waitForURL(
            /barbershops\/\d+/,
            {
                timeout: 30000
            }
        );
    }

    async selectFirstUnit() {

        await this.selectUnit(0);
    }
}