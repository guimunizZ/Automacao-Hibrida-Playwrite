import { test } from '@playwright/test';

test('realizar login manual e salvar sessão', async ({ page }) => {

    await page.goto('https://preview-barbeariamuniz.vercel.app/', {
        waitUntil: 'domcontentloaded'
    });

    await page.pause();

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});