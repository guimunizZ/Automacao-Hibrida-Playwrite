import { test, expect } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';

test.describe('Smoke - Units', () => {

    test('[@smoke] deve acessar unidade ao clicar reservar', async ({ page }) => {

        const landingPage =
            new LandingPage(page);

        await landingPage.goto();

        await landingPage.selectUnit(1);

        await expect(page)
            .toHaveURL(/barbershops\/\d+/);
    });
});