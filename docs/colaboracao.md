# Guia de contribuição

Obrigado por contribuir com o Delivery App! Este guia descreve como você pode ajudar no desenvolvimento do projeto e as diretrizes para padronização de branches e pull requests.

Os primeiros passos para rodar o projeto são apresentados no readme do repositório, clique aqui para ser direcionado.

## Padronização de código

Nós estamos utilizando Eslint, Prettier, editorconfig e um StyleGuide padrão com integrações automáticas e formtação de código. Instale as extensões abaixo no seu editor de código.

1. [ESLint](https://github.com/Microsoft/vscode-eslint)
1. [Prettier](https://github.com/prettier/prettier-vscode)
1. [Editor config](https://github.com/editorconfig/editorconfig-vscode)

> Para que o Prettier formate o código ao salvar, adicione `"editor.formatOnSave": true` no User Settings, se você utiliza o VSCode.

> Você também pode utilizar o script `lint:fix` para rodar o eslint em todos os arquivos e realizar as correções.

## Criação da branch

Agora que você já inicializou o repositório. Crie uma nova branch para trabalhar na contribuição.

Certifique-se de estar na branch `develop`

```
git checkout develop
```

Crie uma nova branch a partir da branch `develop`

```
git checkout -b nome-da-sua-branch
```

Certifique-se de seguir a padronização de nomenclatura.

### Padronização do Nome das Branches

Para manter o fluxo consistente de desenvolvimento e facilitar a colaboração, adotamos um padrão para nomear as branches. O padrão consiste em utilizar o prefixo `feature/`, `fix/`, `docs/` e `hotfix/`, seguido por uma pequena descrição que identifique a finalidade da branch. Sempre que a tarefa for oriunda de um card disponível no Jira, deve-se manter o nosso prefixo determinado para cada tipo de atividade, e utilizar a padronização do Jira para o nome da branch.

#### Feature - Para novos recursos e finalidades

Branches que introduzem novos recursos ou finalidades ao projeto devem seguir o padrão `feature/nome-do-recurso`. Por exemplo:

```
feature/login-authentication
feature/payment-gateway-integration
```

#### Fix - Para correções de bugs

Branches que corrigem bugs ou problemas existentes devem seguir o padrão `fix/nome-do-bug`. Por exemplo:

```
fix/header-navigation-issue
fix/data-processing-error
```

#### Docs - Para documentação

Branches relacionadas à documentação do projeto devem seguir o padrão `docs/nome-da-documentacao`. Por exemplo:

```
docs/api-endpoints-documentation
docs/user-guide-update
```

#### Hotfix - Para correção de bugs em produção

Se um bug crítico é descoberto em produção e requer uma correção imediata, uma branch "hotfix" é criada a partir da branch "main"

```
hotfix/update-user
hotfix/data-processing-error
```

## Desenvolvimento

Realize as alterações e adições necessárias no código, seguindo as práticas de codificação definidas pelo projeto.

Teste suas alterações para garantir que não haja regressões e que tudo funcione corretamente.

### Testing Code

Teste suas alterações para garantir que não haja regressões e que tudo funcione corretamente, utilizando os comandos de teste disponíveis no `package.json`.

## Conventional Commits

Para manter um histórico de commits claro e consistente, adotamos um padrão para as mensagens de commit. Cada mensagem de commit deve seguir o seguinte formato:

```
<tipo>(escopo opcional): descrição breve
```

`feat` – a new feature is introduced with the changes
`fix` – a bug fix has occurred
`chore` – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
`refactor` – refactored code that neither fixes a bug nor adds a feature
`docs` – updates to documentation such as a the README or other markdown files
`style` – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
`test` – including new or correcting previous tests
`perf` – performance improvements
`ci` – continuous integration related
`build` – changes that affect the build system or external dependencies
`revert` – reverts a previous commit

Exemplos:

```
git commit -m "fix: Remove incorrect background"
```

Importante: Não faça commits diretamente na branch main. Todas as alterações devem ser feitas em uma branch separada de acordo com a padronização e, em seguida, solicitadas através de um Pull Request para a branch main.

## Pull Request

Abra o Pull Request(PR) no repositório com título descrito que resuma sua alteração. Caso seja necessário, pode adicionar alguma informação relevantes para a revisão.

Durante a revisão, um workflow automatizado será executado para verificar a qualidade do código, testes, formatação, entre outros critérios. Caso algum erro seja identificado, faça as correções necessárias e faça push novamente para a sua branch.

Após a revisão e aprovação do PR, sua branch será mesclada à branch `main`

### Atualização da branch

Antes de abrir um Pull Request (PR), certifique-se de atualizar sua branch com a branch principal do repositório para evitar conflitos. Você pode fazer isso usando os seguintes comandos:

```
git pull origin main
```

Resolva quaisquer conflitos que possam ocorrer durante o merge, caso haja.

## Git Flow

1. **Main:** A branch "main" é a principal ramificação do código-fonte que reflete o software em produção.

2. **Develop:** A branch "develop" é usada como uma ramificação de integração. Ela reflete o estado do código-fonte que esta sendo desenvolvido para a próxima versão do software.

3. **Feature:** As branchs "feature" são criadas a partir da branch "develop" e são usadas para desenvolver novas funcionalidades ou recursos.

4. **Fix:** As branchs "fix" são criadas a partir da branch develop para realizar a correção de algum bug que não necessita de correção imediata.

5. **Hotfix:** Se um bug crítico é descoberto em produção e requer uma correção imediata, uma branch "hotfix" é criada a partir da branch "main"
