# Test Cycle

## Onde ficam os casos de teste?
Todos os casos BDD ficam em arquivos `.feature` dentro de `src/test/resources/features/`.

## O que acontece quando adiciono um novo caso?
Quando voce adiciona um novo `Scenario` ou `Scenario Outline` em um `.feature`, o Cucumber transforma esse cenario em um teste automatico executavel durante a suite.

Em outras palavras:
- o caso nasce no `.feature`
- os `steps` conectam o Gherkin ao codigo
- as `pages` chamam os endpoints
- o runner executa automaticamente o novo cenario

Nao e necessario manter um segundo arquivo tecnico para que o caso vire teste. O `.feature` ja e a origem oficial.

## Ciclo TDD + BDD adotado
1. Escrever o cenario no `.feature`.
2. Executar a suite e confirmar a falha inicial.
3. Implementar `steps`.
4. Implementar ou ajustar `pages`.
5. Ajustar massa de dados e utilitarios, se necessario.
6. Validar em `preview`.
7. Validar em `production`.
8. Refatorar.

## Quando usar outro arquivo?
Use outros arquivos apenas para suporte:

- `steps`: comportamento executavel
- `pages`: endpoints
- `utils`: dados e JSON
- `docs`: explicacao para o time

Os casos em si continuam no `.feature`.

## Politica para testes pendentes
Se um caso depende de contrato ainda nao confirmado:

- crie o `.feature`
- marque com `@contract-pending`
- se ainda nao puder rodar, marque tambem com `@ignore`
- remova as tags bloqueadoras quando o endpoint estiver pronto
