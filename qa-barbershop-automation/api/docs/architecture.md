# Architecture

## Visao geral
Esta automacao foi desenhada para isolar responsabilidades e permitir crescimento sem acoplamento entre ambiente, requisicao HTTP, modelagem de endpoint e regra de teste.

## Camadas

### `config`
Responsavel por carregar o ambiente ativo e expor a `base.url`.

Arquivo principal:
- `src/test/java/config/EnvironmentConfig.java`

### `core`
Responsavel pelo estado compartilhado do cenario, como ultima resposta, endpoint executado e headers padrao.

Arquivo principal:
- `src/test/java/core/ScenarioContext.java`

### `interactions`
Responsavel por todas as chamadas HTTP.

Arquivo principal:
- `src/test/java/interactions/ApiClient.java`

Regra:
- Rest Assured nao deve aparecer em `steps` nem em `pages`.

### `hooks`
Responsavel pelo setup e teardown do cenario.

Arquivo principal:
- `src/test/java/hooks/TestHooks.java`

Boas praticas aplicadas:
- reset de contexto no `@Before`
- configuracao de `baseURI`
- definicao de headers padrao
- log do cenario
- log de resposta no `@After`

### `pages`
Representam endpoints e agrupam as operacoes disponiveis por recurso.

Arquivos iniciais:
- `AppointmentPage`
- `BarbershopPage`
- `EventPage`
- `GalleryPage`
- `HealthPage`

Regra:
- pages nao validam nada
- pages apenas chamam `ApiClient`

### `steps`
Traduzem o Gherkin em comportamento executavel e fazem as validacoes.

Arquivos iniciais:
- `CommonSteps`
- `AppointmentSteps`

### `features`
Sao a fonte unica de verdade dos casos BDD.

Arquivos iniciais:
- `health.feature`
- `appointment.feature`

### `runners`
Controlam qual suite executa por ambiente.

Arquivos:
- `PreviewRunner`
- `ProductionRunner`

## Decisoes arquiteturais
- `preview` e o ambiente default para proteger a evolucao da suite.
- contratos ainda nao confirmados recebem `@contract-pending` e, se necessario, `@ignore`.
- a troca entre preview e production acontece por `-Denv` e pode ser refinada com `-Dbase.url`.
- cada novo teste nasce em `.feature`, nao em classe Java.

## Escopo funcional inicial
Com base na preview atual, o projeto foi preparado para cobrir:

- disponibilidade do ambiente
- agendamentos
- unidades
- eventos
- galeria de trabalhos

Quando os endpoints oficiais estiverem confirmados, as `pages` podem ser atualizadas sem quebrar o desenho geral.
