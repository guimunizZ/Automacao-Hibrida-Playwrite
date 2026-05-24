async fillOnlyName(name: string) {

    await expect(this.nameInput).toBeVisible();

    await this.nameInput.fill(name);

    await this.page.waitForTimeout(1000);
}

async fillOnlyPhone(phone: string) {

    await expect(this.phoneInput).toBeVisible();

    await this.phoneInput.fill(phone);

    await this.page.waitForTimeout(1000);
}

async selectFutureDate() {

    const today = new Date().getDate();

    const futureDays = this.page.locator(
        'button:not([disabled])'
    );

    const count = await futureDays.count();

    for (let i = 0; i < count; i++) {

        const button = futureDays.nth(i);

        const text = await button.textContent();

        if (!text) continue;

        const cleanText = text.trim();

        if (!/^\d+$/.test(cleanText)) {
            continue;
        }

        const day = Number(cleanText);

        // pega somente datas futuras
        if (day <= today) {
            continue;
        }

        console.log(`Selecionando data futura: ${day}`);

        await button.scrollIntoViewIfNeeded();

        await button.click();

        await this.page.waitForTimeout(3000);

        return;
    }

    throw new Error(
        'Nenhuma data futura encontrada'
    );
}

async selectAvailableTime() {

    const timeButton = this.page
        .locator('button')
        .filter({
            hasText: /^\d{2}:\d{2}$/
        })
        .first();

    await expect(timeButton).toBeVisible({
        timeout: 20000
    });

    const selectedTime =
        await timeButton.textContent();

    console.log(
        `Horário selecionado: ${selectedTime}`
    );

    await timeButton.click();

    await this.page.waitForTimeout(2000);
}

