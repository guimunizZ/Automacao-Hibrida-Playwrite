import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class LandingPage extends BasePage {

    readonly unitCard: Locator;

    readonly reserveButton: Locator;

    readonly serviceSection: Locator;

    constructor(page: Page) {

        super(page);

        // card específico da Unidade I
        this.unitCard = page.locator('text=Unidade I').first();

        // botão Reservar DENTRO do card
        this.reserveButton = this.unitCard.locator('..').getByRole('button', {
            name: /reservar/i
        });

        // seção da página seguinte
        this.serviceSection = page.locator('text=Barba');
    }

    async open() {

        await this.page.goto('/', {
            waitUntil: 'commit',
            timeout: 90000
        });

        await this.page.waitForLoadState('domcontentloaded');
    }

    async validateHomeLoaded() {

        await expect(this.page).toHaveTitle(/Barbearia/i);
    }

    async selectUnit() {

        // garante card visível
        await expect(this.unitCard).toBeVisible({
            timeout: 15000
        });

        // scroll até o card
        await this.unitCard.scrollIntoViewIfNeeded();

        // pequeno delay para hidratação/react
        await this.page.waitForTimeout(1500);

        // clique real
        await this.page.locator('button:has-text("Reservar")').first().click({
            force: true
        });

        // espera URL mudar
        await expect(this.page).toHaveURL(/barbershops/, {
            timeout: 15000
        });

        // confirma que carregou serviços
        await expect(this.serviceSection.first()).toBeVisible({
            timeout: 15000
        });
    }
}