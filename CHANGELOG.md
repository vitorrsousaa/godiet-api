## Branch feature/update new method to create planning meal

É importante lembrar de rodar o script

```bash
# atualiza as measures no DB
ts-node ./prisma/updates/foods/addMeasures.ts

# Atualiza a unidade de medida dos attributos
ts-node ./prisma/updates/foods/fixUnit.ts
```
