# AGENT MASTER - QA AUTOMATION (CODEX / TRAE)

## Missao
Construir e evoluir o projeto de automacao QA da Barbearia Muniz com engenharia controlavel, previsivel e escalavel.

O projeto principal desta workspace fica em `qa-barbershop-automation/`.

## Objetivo
Criar e manter um projeto de automacao do zero com:

- Rest Assured
- BDD com Cucumber + Gherkin
- TDD como disciplina de evolucao
- Arquitetura limpa e desacoplada
- Page Objects adaptados para API
- Hooks `@Before` e `@After`
- Separacao de ambientes `preview` e `production`
- CI/CD
- Documentacao para mentoria e onboarding

## Contexto atual do produto
Com base na preview `https://preview-barbeariamuniz.vercel.app`, o site atual da Barbearia Muniz expõe pelo menos estas areas funcionais:

- busca de barbearias/unidades
- vitrine de trabalhos/cortes
- eventos/promocoes
- unidades da barbearia
- canais institucionais como WhatsApp e Instagram
- jornada de agendamento como fluxo principal do negocio

Ao automatizar novos endpoints, use essa leitura como contexto inicial e valide o contrato real da API antes de remover tags como `@ignore` ou `@contract-pending`.

## Ordem obrigatoria para criar ou reconstruir o projeto
Se o projeto precisar ser recriado do zero, siga exatamente esta ordem e valide cada etapa antes da proxima:

1. Criar a pasta `qa-barbershop-automation/`.
2. Criar `pom.xml` com Java 17, Maven, Rest Assured, JUnit 5, Cucumber, Surefire e Jackson.
3. Criar a estrutura:
   `src/test/java/{core,config,interactions,hooks,utils,pages,steps,runners}`
   `src/test/resources/{features,environments}`
   `ci/`
   `docs/`
4. Criar os arquivos de ambiente:
   `src/test/resources/environments/preview.properties`
   `src/test/resources/environments/production.properties`
5. Criar `EnvironmentConfig` e centralizar toda leitura de `-Denv`.
6. Criar a camada `interactions` com `ApiClient`.
7. Criar `TestHooks` com `@Before` e `@After`.
8. Criar `utils` com `TestDataFactory` e `JsonUtils`.
9. Criar `pages` representando endpoints.
10. Criar `steps` implementando Given / When / Then.
11. Criar `features` em Gherkin.
12. Criar `runners` por ambiente.
13. Criar `README.md` e a documentacao em `docs/`.
14. Criar `ci/pipeline.yml` e `.github/workflows/ci.yml`.
15. Rodar Maven para baixar dependencias e validar o esqueleto.

## Regras de ouro
- Nunca usar Rest Assured fora de `src/test/java/interactions`.
- Nunca validar resposta dentro de `pages`.
- Nunca hardcodar URL fora de `EnvironmentConfig` ou de override controlado por `-Dbase.url`.
- Sempre tratar os `.feature` como fonte unica de verdade dos casos BDD.
- Sempre separar responsabilidade por camada.
- Sempre documentar mudancas estruturais em `README.md` e `docs/`.

## Arquitetura obrigatoria

### `config`
- `EnvironmentConfig` le `-Denv`.
- `preview` e `production` devem ser carregados dinamicamente.
- `preview` e o default.

### `core`
- Guardar contexto compartilhado de cenario.
- Centralizar dados transitivos como ultima resposta e headers padrao.

### `interactions`
- Toda chamada HTTP passa por `ApiClient`.
- Implementar `GET`, `POST`, `PUT` e `DELETE`.
- Aplicar `baseUri` automaticamente.

### `hooks`
- `@Before` deve:
  - resetar estado do cenario
  - configurar `baseURI`
  - definir headers padrao
  - logar nome do cenario e ambiente
- `@After` deve:
  - logar status e corpo da resposta
  - detalhar falhas
  - limpar contexto

### `pages`
- Representam endpoints.
- Nao fazem asserts.
- Nao contem logica de negocio de teste.

### `steps`
- Implementam validacoes.
- Consomem `pages`.
- Nao chamam Rest Assured diretamente.

### `features`
- Todo novo caso de teste nasce aqui.
- Cada `Scenario` ou `Scenario Outline` vira automaticamente um teste do Cucumber no momento da execucao.
- Nao duplicar casos em outro arquivo fonte.

### `runners`
- `PreviewRunner` executa quando `-Denv=preview`.
- `ProductionRunner` executa quando `-Denv=production`.
- As tags principais do projeto sao:
  - `@smoke`
  - `@regression`
  - `@critical`

## Ciclo TDD + BDD obrigatorio
Para cada novo caso:

1. Criar ou ajustar o cenario no `.feature`.
2. Rodar o teste e observar a falha inicial.
3. Implementar ou ajustar step definitions.
4. Implementar ou ajustar a page correspondente.
5. Ajustar `TestDataFactory` ou utilitarios se necessario.
6. Validar preview.
7. Validar production quando o endpoint estiver apto.
8. Refatorar mantendo as regras de camada.
9. Atualizar documentacao relevante.

## Politica para contratos ainda nao confirmados
Se o endpoint real ainda nao estiver confirmado:

- criar a `page`
- criar o `feature`
- marcar o cenario com `@contract-pending`
- se ele nao puder rodar ainda, usar `@ignore`
- documentar o que falta em `docs/test-cycle.md`

## Como tratar novos casos
- Casos funcionais vivem em `.feature`.
- Suporte tecnico vive em `steps`, `pages`, `interactions`, `utils` e `hooks`.
- Se surgir um novo grupo funcional, criar um novo arquivo `.feature`.
- Evitar colocar casos em planilhas ou arquivos paralelos como fonte principal.

## Comandos de referencia
- `mvn test`
- `mvn test -Denv=preview -Dcucumber.filter.tags=@smoke`
- `mvn test -Denv=preview`
- `mvn test -Denv=production`
- `mvn test -Denv=production -Dbase.url=https://sua-url-real`

## Entregaveis minimos que sempre devem existir
- `README.md`
- `docs/architecture.md`
- `docs/how-to-create-tests.md`
- `docs/environments.md`
- `docs/test-cycle.md`
- `docs/project-files.md`
- `ci/pipeline.yml`
- `.github/workflows/ci.yml`

## Comportamento esperado do agente
- Ler este `AGENT.md` antes de mudar arquitetura.
- Preservar a separacao de camadas.
- Evoluir primeiro a estrutura, depois os casos.
- Nao misturar UI e API no mesmo teste.
- Tratar o projeto como base de mentoria, com codigo e documentacao claros.
