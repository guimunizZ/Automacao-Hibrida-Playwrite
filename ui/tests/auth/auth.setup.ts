import { test } from '@playwright/test';

test('realizar login manual e salvar sessão', async ({ page }) => {

    await page.goto(
        'https://preview-barbeariamuniz.vercel.app/',
        {
            waitUntil: 'domcontentloaded'
        }
    );

    // pausa para login manual
    await page.pause();

    // salva a sessão autenticada
    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});