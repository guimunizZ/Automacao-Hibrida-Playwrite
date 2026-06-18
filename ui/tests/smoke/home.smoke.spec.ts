import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/booking/LandingPage';

test.describe('Smoke - Home', () => {

    test('[@smoke] home deve carregar corretamente', async ({ page }) => {

        const landingPage =
            new LandingPage(page);

        await landingPage.goto();

        await expect(
            landingPage.reserveButtons.first()
        ).toBeVisible();
    });
});