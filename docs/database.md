# Atualização do banco de dados

Para atualização do banco de dados, deve-se atualizar o schema utilizando o `schema.prisma` dentro da pasta `prisma`. Este arquivo é responsável por armazenar o schema de todas as entidades da aplicação.

Após a atualização da entidade ou adição de uma entidade nova, deve-se utilizar o comando abaixo em ambiente de desenvolvimento.

```bash
# Update migrations on development database
yarn migrations:dev
```

Este comando vai ser responsável por atualizar as `migrations` e atualizar o banco

::::warning
Ao rodar atualizar as `migrations`, é super importante avaliar se o `prisma` não retornou a mensagem `Do you want to continue? All data will be lost.`.
Nesse caso, deve-se cancelar a atualização e verificar o schema para atualizar sem causar impactos ao dados existentes no database.
::::

