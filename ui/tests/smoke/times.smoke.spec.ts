import {
        test,
        expect
} from '@playwright/test';

import {
        LandingPage
} from '../../pages/booking/LandingPage';

import {
        BookingPage
} from '../../pages/booking/BookingPage';

test.describe(
    'Smoke - Times',

    () => {

            test(
                '[@smoke] horários devem aparecer somente após selecionar barbeiro e data',

                async ({ page }) => {

                        const landingPage =
                            new LandingPage(
                                page
                            );

                        const bookingPage =
                            new BookingPage(
                                page
                            );

                        /*
                         CENÁRIO
                         Dilsinho agora está na unidade 2
                        */

                        const selectedUnit =
                            1;

                        const selectedBarber =
                            'Dilsinho';

                        await landingPage.goto();

                        /*
                         unidade
                        */

                        await landingPage.selectUnit(
                            selectedUnit
                        );

                        /*
                         serviço
                        */

                        await bookingPage.selectService(
                            0
                        );

                        /*
                         REGRA 1
                         sem barbeiro → sem horários
                        */

                        const hoursBeforeBarber =
                            page
                                .locator(
                                    'button'
                                )
                                .filter({
                                        hasText:
                                            /^\d{2}:\d{2}$/
                                });

                        await expect(
                            hoursBeforeBarber
                        )
                            .toHaveCount(
                                0
                            );

                        console.log(
                            '\n✓ Sem barbeiro → horários ocultos'
                        );

                        /*
                         seleciona barbeiro
                        */

                        await bookingPage.selectBarber(
                            selectedBarber
                        );

                        /*
                         REGRA 2
                         barbeiro sem data → sem horários
                        */

                        const hoursBeforeDate =
                            page
                                .locator(
                                    'button'
                                )
                                .filter({
                                        hasText:
                                            /^\d{2}:\d{2}$/
                                });

                        await expect(
                            hoursBeforeDate
                        )
                            .toHaveCount(
                                0
                            );

                        console.log(
                            '\n✓ Barbeiro sem data → horários ocultos'
                        );

                        /*
                         seleciona data válida
                        */

                        await bookingPage.selectFutureDate();

                        /*
                         REGRA 3
                         barbeiro + data → horários aparecem
                        */

                        const availableHours =
                            page
                                .locator(
                                    'button'
                                )
                                .filter({
                                        hasText:
                                            /^\d{2}:\d{2}$/
                                });

                        await expect(
                            availableHours
                                .first()
                        )
                            .toBeVisible();

                        const totalHours =
                            await availableHours
                                .count();

                        console.log(`
✓ Horários liberados

Barbeiro:
${selectedBarber}

Quantidade:
${totalHours}
`);

                }

            );

    }

);