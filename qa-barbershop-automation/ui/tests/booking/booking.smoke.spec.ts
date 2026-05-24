import { test, expect } from '@playwright/test';
import { LandingPage } from '../../pages/booking/LandingPage';

test('[@smoke] site deve abrir corretamente', async ({ page }) => {

    const landingPage = new LandingPage(page);

    await landingPage.open();

    await landingPage.validateHomeLoaded();

    await expect(page).toHaveTitle(/Barbearia/i);
});