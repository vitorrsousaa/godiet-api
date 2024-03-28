# goDiet - API

<h2 id="started">📌 Sobre</h2>

Descrição breve sobre a api.

Essa é uma API Serverless construída com Typescript utilizando NodeJS como principal tecnologia e postgresSQL como banco de dados.

Nós utilizamos Eslint, Prettier, editorconfig e um StyleGuide integrations com formatação automática. Por favor, baixe essas extensões no seu editor de código.

1. [ESLint](https://github.com/Microsoft/vscode-eslint)
1. [Prettier](https://github.com/prettier/prettier-vscode)
1. [Editor config](https://github.com/editorconfig/editorconfig-vscode)

> Para ter certeza que o Prettier formata ao salvar. Adicione `"editor.formatOnSave": true` nas configurações pessoais do seu VSCode.

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: <br />
→ [Git](https://git-scm.com);<br />
→ [Node.js](https://nodejs.org/en/);<br />
→ [Docker](https://www.docker.com/); <br />

## 🎲 Rodando a aplicação

```bash
# Clone este repositório
$ git clone

# Vá para a pasta da aplicação Mobile
$ cd godiet-api

# Instale as dependências
yarn install
```

### Criando container docker

Após a instalaçao das dependências, é necessário criar um container docker. Você pode rodar o container em qualquer porta e configurar no arquivo de variáveis de ambiente.

Caso queira utilizar o script para criação de container, basta rodar o comando abaixo:

```bash
# Iniciando container docker
$ docker-compose up -d database
```

Por padrão, o container vai ser criado na porta `5435:5432`, mas você pode ficar livre para alterar a porta do container. Lembrando de alterar também o `DATABASE_URL` do arquivo `.env`.

### Configurando variáveis de ambiente e prisma

Depois disso, adicione na pasta raíz um arquivo `.env`, de acordo com o `env.example` deste repositório.

Você pode obter mais exemplos de configuração da variável de ambiente para o prisma no link abaixo.

**[Prisma Docs](https://www.prisma.io/docs/guides/development-environment/environment-variables)**

### Aplicando as migrations

Após inicializar o container docker e configurar as variáveis de ambiente, é necessário rodar as migrations para atualizar a imagem postgres criada, e popular o banco de dados com as informações necessárias.

Para isso, utilize os comandos criados no `package.json`.

```bash
# Crie todas as migrations
$ yarn migrations:dev

# Popule o banco de dados
$ yarn seed:dev
```

Logo após, sua aplicação já esta pronta para ser inicializada.

```bash
# Inicie a aplicação
$ yarn dev
```

## ⚙️ Executando os testes

Explicar como executar os testes automatizados para este sistema.

### 🔩 Analise os testes de ponta a ponta

Explique que eles verificam esses testes e porquê.

```bash
# run tests with coverage
$ yarn test

# run tests and open vitest ui
$ yarn run test:ui
```

### Testes de integração

Por padrão, o container do ambiente de testes vai ser criado na porta definida no `env`. Através da propriedade `DATABASE_TEST_URL`.

```bash
# run tests integration
$ yarn test:int

# run tests and open vitest ui
$ yarn test:int --ui
```

#### Configuração inicial

Ao utilizar o script acima, deve-se criar um container docker na porta que foi definida na variável `DATABASE_TEST_URL`, atualizar o banco com as migrations e rodar os testes de integração

#### Estrutura

Os testes de integração devem ser criados na pasta `tests`, localizada dentro `/src`.

O teste de integração deve ser criado com o intuito de verificar o retorno do handler, e se ta conforme esperado caso o usuário passe todos os parametros corretamente.

As verificações de tipo e se as respostas que devemos encaminhar caso o `body` não esteja com todas as propriedades corretas deve ser testado dentro dos testes unitários do controller

#### Entidades

O teste vai ser rodado na `ci`, e ao final, o container é deletado, removendo todas as migrations e atualizações feitas nos testes. Porém, também podemos rodar os individualmente ou fora da `pipeline`.

E por isso, deve-se adicionar no `setup` dos testes para deletar as entidades a cada suit de teste. O `vitest` já esta configurado para implementar este setup, basta acessar o arquivo `reset-db.ts` e adicionar a função `deleteMany`para a entidade que foi adicionada na aplicação. Como no exemplo abaixo:

```js
export default async () => {
  await prisma.$transaction([prisma.user.deleteMany()]);
};
```

## Deployment

Podemos realizar o deploy em dois stages.

```bash
# Deploy stage dev
$ yarn deploy:dev

# Deploy stage prod
$ yarn deploy:prod
```

Antes de realizar o deploy, deve-se configurar as variáveis de ambiente utilizando o arquivo `.env`. Siga como exemplo o `.env.example`, e crie um arquivo para cada stage do deploy. Assim como o exemplo abaixo:

```bash
# Environment stage dev
(.env.dev)
AUTH_SECRET='SECRET_DEV'
```

```bash
# Environment stage prod
(.env.prod)
AUTH_SECRET='SECRET_PROD'
```

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

Dar permissão para o script
`chmod +x scripts/run-integration.sh`
