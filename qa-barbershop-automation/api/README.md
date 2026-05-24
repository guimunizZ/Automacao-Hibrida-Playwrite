# Barbearia Muniz - QA Automation Blueprint

Projeto base de automacao QA da Barbearia Muniz usando Rest Assured, Cucumber, BDD e TDD. Esta base foi criada para crescer de forma controlada e para servir tambem como material de mentoria para futuros QA mentorados.

## Escopo atual mapeado
A preview atual em `https://preview-barbeariamuniz.vercel.app` mostra uma aplicacao com:

- busca de barbearias/unidades
- vitrine de cortes e trabalhos
- eventos e campanhas
- listagem de unidades
- canais institucionais
- foco de negocio em agendamento

Essa leitura guiou a estrutura inicial das `pages` e da documentacao. Os cenarios que dependem do contrato oficial da API foram preparados, mas mantidos com `@ignore` ate a confirmacao do endpoint real.

## Stack
- Java 17
- Maven
- Rest Assured
- Cucumber + Gherkin
- JUnit 5
- Jackson

## Estrutura principal
```text
qa-barbershop-automation/
|-- pom.xml
|-- README.md
|-- ci/
|-- docs/
|-- src/test/java/
|   |-- config/
|   |-- core/
|   |-- hooks/
|   |-- interactions/
|   |-- pages/
|   |-- runners/
|   |-- steps/
|   `-- utils/
`-- src/test/resources/
    |-- environments/
    `-- features/
```

## Como rodar
No diretorio `qa-barbershop-automation`:

```bash
mvn test
```

Smoke em preview:

```bash
mvn test -Denv=preview -Dcucumber.filter.tags=@smoke
```

Suite completa em preview:

```bash
mvn test -Denv=preview
```

Suite completa em production:

```bash
mvn test -Denv=production
```

Se a URL de production mudar no deploy:

```bash
mvn test -Denv=production -Dbase.url=https://sua-url-real
```

## Como trocar ambiente
Toda a troca de ambiente e centralizada em `src/test/java/config/EnvironmentConfig.java`.

- `preview` usa `src/test/resources/environments/preview.properties`
- `production` usa `src/test/resources/environments/production.properties`
- o ambiente default e `preview`
- `-Dbase.url` pode sobrescrever a URL sem quebrar a arquitetura

## Como criar novos testes
1. Criar o novo caso em um arquivo `.feature`.
2. Rodar para ver a falha inicial.
3. Implementar ou ajustar `steps`.
4. Implementar ou ajustar a `page` correspondente.
5. Validar o comportamento no ambiente certo.
6. Atualizar a documentacao, se o caso alterar o entendimento da arquitetura.

O arquivo `.feature` e a fonte oficial do caso. Cada novo `Scenario` ou `Scenario Outline` vira automaticamente um teste executavel do Cucumber.

## CI/CD
O projeto vem preparado com:

- `ci/pipeline.yml` como blueprint da pipeline
- `.github/workflows/ci.yml` como workflow pronto para GitHub Actions

Fluxo configurado:

- Pull Request: roda `preview` com `@smoke`
- `main`: roda preview completo e production completo

## Documentacao de apoio
- `docs/architecture.md`
- `docs/how-to-create-tests.md`
- `docs/environments.md`
- `docs/test-cycle.md`
- `docs/project-files.md`
