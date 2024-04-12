# Changelog

Todas as mudanças significativas do projeto são documentadas nesse arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), e esse projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Acesse o [Template](./.github/templates/CHANGELOG_TEMPLATE.md) para atualizar este arquivo corretamente.

## Branch feature/update new method to create planning meal | 12/03/2024

> Foi adicionado um campo de `measures` para o model de Foods.

### Upgrade steps

- Necessário rodar os comandos abaixo.

```bash
# atualiza as measures no DB
ts-node ./prisma/updates/foods/addMeasures.ts

# Atualiza a unidade de medida dos attributos
ts-node ./prisma/updates/foods/fixUnit.ts
```

## Branch feature/GODIET-98-observation-add-default-template-of-observation-when-the-user-create-account | 12/04/2024

> Foi adicionado um campo de `observationTemplate` para o model de user.

### Upgrade steps

- Necessário rodar os comandos abaixo.

```bash
# atualiza as measures no DB
ts-node ./prisma/updates/user/updateWithObservationTemplates.ts
```
