# Environments

## Arquivos
- `src/test/resources/environments/preview.properties`
- `src/test/resources/environments/production.properties`

## Regras
- `preview` e o ambiente default
- a troca e feita por `-Denv`
- a URL base e lida por `EnvironmentConfig`
- `-Dbase.url` pode sobrescrever a URL do arquivo para deploys ou testes pontuais

## Comandos
Preview:

```bash
mvn test -Denv=preview
```

Production:

```bash
mvn test -Denv=production
```

Production com URL sobrescrita:

```bash
mvn test -Denv=production -Dbase.url=https://sua-url-real
```

## Preparacao para deploy
Enquanto a URL final de production nao estiver fechada:

- mantenha `production.properties` atualizado com o melhor placeholder conhecido
- prefira sobrescrever via `-Dbase.url` no pipeline de deploy
- so remova `@ignore` de cenarios dependentes de contrato quando a API real estiver validada
