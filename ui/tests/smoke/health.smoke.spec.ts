import { test } from '@playwright/test';
import { LandingPage } from '../../pages/booking/LandingPage';

test.describe('Smoke - Home', () => {

    test('[@smoke] site deve carregar corretamente', async ({ page }) => {

        const landingPage = new LandingPage(page);

        await landingPage.open();

        await landingPage.validateHomeLoaded();
    });
});