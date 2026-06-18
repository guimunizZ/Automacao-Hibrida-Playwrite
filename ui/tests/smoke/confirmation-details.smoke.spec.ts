import { test, expect } from '@playwright/test';

import { LandingPage } from '../../pages/booking/LandingPage';
import { BookingPage } from '../../pages/booking/BookingPage';
import { ConfirmationModal } from '../../pages/booking/ConfirmationModal';

test.describe(
    'Smoke - Confirmation',
    () => {

        test(
            '[@smoke] deve validar detalhes da reserva criada',
            async ({ page }) => {

                const landingPage =
                    new LandingPage(page);

                const bookingPage =
                    new BookingPage(page);

                const confirmationModal =
                    new ConfirmationModal(page);

                const expectedUnit =
                    'Unidade I';

                const expectedService =
                    'Barba • 30 min';

                const expectedBarber =
                    'Dilsinho';

                await landingPage.goto();

                await landingPage.selectUnit(0);

                await bookingPage.selectService(0);

                await bookingPage.selectBarber(
                    expectedBarber
                );

                await bookingPage.fillClient();

                await bookingPage.selectFutureDate();

                await bookingPage.selectHour();

                await bookingPage.confirmButton.click();

                await confirmationModal.validateSuccess();

                // Serviço
                await expect(
                    page.getByText(
                        expectedService,
                        {
                            exact: true
                        }
                    )
                ).toBeVisible();

                // Barbeiro
                await expect(
                    page.locator(
                        'p.font-semibold.text-white'
                    ).filter({
                        hasText: expectedBarber
                    })
                ).toBeVisible();

                // Unidade
                await expect(
                    page.getByRole(
                        'paragraph'
                    ).filter({
                        hasText: expectedUnit
                    })
                ).toBeVisible();

                // Campo Data e Horário deve existir
                await expect(
                    page.getByText(
                        'Data e horário',
                        {
                            exact: true
                        }
                    )
                ).toBeVisible();

                // Deve exibir um horário válido
                await expect(
                    page.getByText(
                        /\d{2}\/\d{2}\/\d{4}\sàs\s\d{2}:\d{2}\saté\s\d{2}:\d{2}/
                    )
                ).toBeVisible();
            }
        );
    }
);