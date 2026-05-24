import { test, expect } from '@playwright/test';

import { LandingPage } from '../../../pages/booking/LandingPage';

test.describe('Booking Alternative', () => {

    test('não deve exibir barbeiros sem selecionar serviço', async ({ page }) => {

        const landingPage = new LandingPage(page);

        await landingPage.open();

        await landingPage.selectUnit();

        const barber = page
            .locator('button')
            .filter({
                hasText: 'Dilsinho'
            });

        await expect(barber).not.toBeVisible();
    });
});