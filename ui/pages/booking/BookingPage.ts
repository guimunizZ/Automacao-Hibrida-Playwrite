import { expect, Locator, Page } from '@playwright/test';

export class BookingPage {

    readonly page: Page;

    readonly serviceCard: Locator;

    readonly reserveButton: Locator;

    readonly barberCard: Locator;

    readonly nameInput: Locator;

    readonly phoneInput: Locator;

    readonly confirmButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.serviceCard = page
            .locator('text=Barba')
            .first();

        this.reserveButton = page
            .locator('button')
            .filter({
                hasText: 'Reservar'
            })
            .first();

        this.barberCard = page
            .locator('button')
            .filter({
                hasText: /Dilsinho|Carlos/i
            })
            .first();

        this.nameInput = page.locator('input').nth(0);

        this.phoneInput = page.locator('input').nth(1);

        this.confirmButton = page
            .locator('button')
            .filter({
                hasText: /Confirmar reserva|Confirmar/i
            })
            .first();
    }

    async selectService() {

        await expect(this.serviceCard).toBeVisible({
            timeout: 20000
        });

        await this.serviceCard.scrollIntoViewIfNeeded();

        await this.page.waitForTimeout(1000);

        await expect(this.reserveButton).toBeVisible({
            timeout: 15000
        });

        await this.reserveButton.click();

        await this.page.waitForTimeout(3000);
    }

    async validateServicesLoaded() {

        await expect(this.serviceCard).toBeVisible({
            timeout: 15000
        });
    }

    async selectBarber() {

        await expect(this.barberCard).toBeVisible({
            timeout: 20000
        });

        await this.barberCard.scrollIntoViewIfNeeded();

        await this.page.waitForTimeout(1000);

        await this.barberCard.click();

        await this.page.waitForTimeout(3000);
    }

    async validateBarbersLoaded() {

        await expect(this.barberCard).toBeVisible({
            timeout: 15000
        });
    }

    async fillClient(name: string, phone: string) {

        await expect(this.nameInput).toBeVisible({
            timeout: 15000
        });

        await this.nameInput.fill(name);

        await this.phoneInput.fill(phone);

        await this.page.waitForTimeout(2000);
    }

    async selectDate() {

        const calendarDays = this.page
            .locator('button:not([disabled])');

        const count = await calendarDays.count();

        for (let i = 0; i < count; i++) {

            const dayButton = calendarDays.nth(i);

            const text = await dayButton.textContent();

            if (!text) continue;

            const cleanText = text.trim();

            if (!/^\d+$/.test(cleanText)) {
                continue;
            }

            const day = Number(cleanText);

            if (day < 28) {
                continue;
            }

            console.log(`Tentando data: ${day}`);

            await dayButton.scrollIntoViewIfNeeded();

            await this.page.waitForTimeout(1000);

            await dayButton.click();

            await this.page.waitForTimeout(4000);

            const availableTimes = this.page
                .locator('button')
                .filter({
                    hasText: /^\d{2}:\d{2}$/
                });

            const hasTimes = await availableTimes.count();

            if (hasTimes > 0) {

                console.log(`Data válida encontrada: ${day}`);

                return;
            }
        }

        throw new Error(
            'Nenhuma data futura com horários disponíveis foi encontrada'
        );
    }

    async validateFutureDates() {

        const futureDates = this.page
            .locator('button:not([disabled])');

        await expect(futureDates.first()).toBeVisible({
            timeout: 15000
        });
    }

    async selectTime() {

        const availableTime = this.page
            .locator('button')
            .filter({
                hasText: /^\d{2}:\d{2}$/
            })
            .first();

        await expect(availableTime).toBeVisible({
            timeout: 20000
        });

        const selectedTime = await availableTime.textContent();

        console.log(`Horário selecionado: ${selectedTime}`);

        await availableTime.click();

        await this.page.waitForTimeout(3000);
    }

    async validateTimesLoaded() {

        const availableTime = this.page
            .locator('button')
            .filter({
                hasText: /^\d{2}:\d{2}$/
            })
            .first();

        await expect(availableTime).toBeVisible({
            timeout: 20000
        });
    }

    async validateAvailableTimes() {

        const availableTimes = this.page
            .locator('button')
            .filter({
                hasText: /^\d{2}:\d{2}$/
            });

        await expect(availableTimes.first()).toBeVisible({
            timeout: 20000
        });
    }

    async confirmBooking() {

        await expect(this.confirmButton).toBeVisible({
            timeout: 15000
        });

        await this.confirmButton.click();

        await this.page.waitForTimeout(3000);
    }
}