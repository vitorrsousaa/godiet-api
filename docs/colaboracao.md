### Conventional commits

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

## Git Flow

1. **Main:** A branch "main" é a principal ramificação do código-fonte que reflete o software em produção.

2. **Develop:** A branch "develop" é usada como uma ramificação de integração. Ela reflete o estado do código-fonte que esta sendo desenvolvido para a próxima versão do software.

3. **Feature:** As branchs "feature" são criadas a partir da branch "develop" e são usadas para desenvolver novas funcionalidades ou recursos.

4. **Fix:** As branchs "fix" são criadas a partir da branch develop para realizar a correção de algum bug que não necessita de correção imediata.

5. **Hotfix:** Se um bug crítico é descoberto em produção e requer uma correção imediata, uma branch "hotfix" é criada a partir da branch "main"

Alterações na Branch Develop:

Criação de Pull Request (PR): Quando um desenvolvedor deseja contribuir com uma nova funcionalidade ou correção de bug, ele cria um novo branch de feature a partir da develop. Após a conclusão, um pull request é criado para mesclar a branch de feature de volta na develop. Isso aciona revisões de código e testes automatizados.

Testes de Integração Contínua: Configurar um pipeline de CI/CD que seja executado sempre que um pull request for aberto para a develop. Isso pode incluir testes de unidade, testes de integração, e análises de código.

Revisão de Código: Certificar-se de que todas as alterações na develop passem por revisões de código. A revisão deve garantir que o código é de alta qualidade e segue as melhores práticas.
