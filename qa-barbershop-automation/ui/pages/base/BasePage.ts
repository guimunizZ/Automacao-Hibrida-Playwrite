import { Locator, Page, expect } from '@playwright/test';

export class BasePage {

    protected page: Page;

    constructor(page: Page) {

        this.page = page;
    }

    async goto(path: string = '') {

        await this.page.goto(path, {
            waitUntil: 'domcontentloaded'
        });
    }

    async wait(ms: number) {

        await this.page.waitForTimeout(ms);
    }

    async waitForVisible(locator: Locator) {

        await expect(locator).toBeVisible();
    }
}