import {
    test,
    expect,
    Locator,
    Page
} from '@playwright/test';

import {
    LandingPage
} from '../../pages/booking/LandingPage';

async function highlight(
    page: Page,
    locator: Locator,
    title: string
) {

    await locator.scrollIntoViewIfNeeded();

    await locator.highlight();

    console.log('\n================================');
    console.log(title);
    console.log('================================\n');

    await page.waitForTimeout(
        1200
    );

}

function normalize(
    value: string
) {

    return value
        .replace(/\u00A0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

}

test.describe(
    'Smoke - Services',

    () => {

        test(
            '[@smoke] serviço selecionado deve aparecer corretamente no resumo',

            async ({ page }) => {

                const landingPage =
                    new LandingPage(
                        page
                    );

                await landingPage.goto();

                await landingPage.selectUnit(
                    0
                );

                /*
                 ALTERE SOMENTE ISTO
                */

                const selectedService = 'Acabamento / pezinho';

                /*
                 LOCALIZA CARD PELO TEXTO
                */

                const serviceTitle =
                    page
                        .getByText(
                            selectedService,
                            {
                                exact: true
                            }
                        )
                        .first();

                await expect(
                    serviceTitle
                ).toBeVisible();

                const serviceCard =
                    serviceTitle
                        .locator(
                            '..'
                        );

                await highlight(
                    page,
                    serviceCard,
                    'VALIDANDO SERVIÇO > SERVIÇO ESCOLHIDO'
                );

                const originText =
                    normalize(
                        (
                            await serviceCard
                                .textContent()
                        )
                        ?? ''
                    );

                const selectedPrice =
                    (
                        originText
                            .match(
                                /R\$\s?[\d.,]+/
                            )
                    )?.[0]
                    ??
                    '';

                console.log(`
Nome:
${selectedService}

Preço:
${selectedPrice}
`);

                /*
                 CLICA NO MESMO CARD
                */

                await serviceCard
                    .getByRole(
                        'button',
                        {
                            name:
                                'Reservar'
                        }
                    )
                    .click();

                /*
                 GARANTE MODAL
                */

                await expect(
                    page.getByText(
                        'Escolha seu barbeiro'
                    )
                ).toBeVisible();

                /*
                 RESUMO
                */

                const summaryService =
                    page
                        .getByText(
                            selectedService,
                            {
                                exact: true
                            }
                        )
                        .last();

                await expect(
                    summaryService
                ).toBeVisible();

                await highlight(
                    page,
                    summaryService,
                    'VALIDANDO SERVIÇO > SERVIÇO EM RESUMO'
                );

                const summaryContainer =
                    summaryService
                        .locator(
                            '..'
                        );

                const summaryText =
                    normalize(
                        (
                            await summaryContainer
                                .textContent()
                        )
                        ?? ''
                    );

                console.log(`
Nome:
${selectedService}

Preço:
${selectedPrice}
`);

                /*
                 VALIDAÇÕES
                */

                expect(
                    summaryText
                ).toContain(
                    selectedService
                );

                if (
                    selectedPrice
                ) {

                    expect(
                        normalize(
                            summaryText
                        )
                    )
                        .toContain(
                            normalize(
                                selectedPrice
                            )
                        );

                }

                console.log(
                    '\n✓ Serviço exibido no resumo corresponde ao serviço selecionado\n'
                );

            }

        );

    }

);