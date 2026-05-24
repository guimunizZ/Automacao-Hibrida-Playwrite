# Project Files Guide

## Raiz
- `pom.xml`: define stack, versoes e execucao Maven.
- `README.md`: guia rapido do projeto e do site atual.
- `.gitignore`: ignora artefatos locais e de build.

## CI/CD
- `ci/pipeline.yml`: blueprint da pipeline.
- `.github/workflows/ci.yml`: workflow pronto para GitHub Actions.

## Documentacao
- `docs/architecture.md`: explica a arquitetura e as responsabilidades das camadas.
- `docs/how-to-create-tests.md`: ensina como adicionar novos testes.
- `docs/environments.md`: explica preview, production e override de URL.
- `docs/test-cycle.md`: mostra como novos cenarios viram testes automaticos.
- `docs/project-files.md`: este guia de arquivos.

## Ambientes
- `src/test/resources/environments/preview.properties`: URL base do preview.
- `src/test/resources/environments/production.properties`: URL base de production.

## Features
- `src/test/resources/features/health.feature`: smoke inicial para validar disponibilidade.
- `src/test/resources/features/appointment.feature`: modelo inicial para agendamentos, pronto para evoluir quando o contrato for confirmado.

## Config
- `src/test/java/config/EnvironmentConfig.java`: carrega o ambiente por `-Denv` e expõe `getBaseUrl()`.

## Core
- `src/test/java/core/ScenarioContext.java`: compartilha dados do cenario, ultima resposta e headers padrao.

## Interactions
- `src/test/java/interactions/ApiClient.java`: unica porta para chamadas HTTP.

## Hooks
- `src/test/java/hooks/TestHooks.java`: executa setup e teardown de cada cenario.

## Utils
- `src/test/java/utils/TestDataFactory.java`: gera dados dinamicos.
- `src/test/java/utils/JsonUtils.java`: serializa e desserializa JSON.

## Pages
- `src/test/java/pages/HealthPage.java`: endpoint de disponibilidade.
- `src/test/java/pages/AppointmentPage.java`: endpoint de agendamentos.
- `src/test/java/pages/BarbershopPage.java`: endpoint de unidades/barbearias.
- `src/test/java/pages/EventPage.java`: endpoint de eventos.
- `src/test/java/pages/GalleryPage.java`: endpoint de vitrine/galeria.

## Steps
- `src/test/java/steps/CommonSteps.java`: passos compartilhados e smoke do ambiente.
- `src/test/java/steps/AppointmentSteps.java`: passos de agendamento.

## Runners
- `src/test/java/runners/PreviewRunner.java`: suite para `preview`.
- `src/test/java/runners/ProductionRunner.java`: suite para `production`.
