# How To Create Tests

## Regra principal
Todo novo caso comeca em um arquivo `.feature`.

## Fluxo recomendado
1. Escolha o dominio funcional.
2. Crie ou atualize um `.feature` em `src/test/resources/features/`.
3. Escreva o cenario em Gherkin com tags adequadas.
4. Rode o teste para falhar primeiro.
5. Crie ou ajuste os `steps`.
6. Crie ou ajuste a `page` correspondente.
7. Se precisar de massa dinamica, use `TestDataFactory`.
8. Se precisar tratar JSON, use `JsonUtils`.
9. Rode novamente em `preview`.
10. Promova para `production` quando o endpoint estiver apto.

## Tags padrao
- `@smoke`: validacoes curtas e criticas
- `@regression`: cobertura funcional mais ampla
- `@critical`: fluxos que bloqueiam liberacao
- `@contract-pending`: contrato ainda em validacao
- `@ignore`: caso ainda nao executavel

## Exemplo de fluxo BDD + TDD
1. Criar o cenario em `appointment.feature`.
2. Executar `mvn test -Denv=preview`.
3. Observar falha.
4. Implementar `AppointmentSteps`.
5. Implementar ou ajustar `AppointmentPage`.
6. Refatorar mantendo a separacao de camadas.

## O que nao fazer
- nao escrever request HTTP diretamente em `steps`
- nao validar payload dentro de `pages`
- nao duplicar o mesmo caso em planilha e em `.feature` como fonte primaria
- nao hardcodar URL em step, page ou hook
