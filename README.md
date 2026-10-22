Desafio Ambev — Testes Automatizados com Cypress
1. Sobre o projeto
Este projeto tem como objetivo desenvolver 3 cenários de testes E2E automatizados para o frontend e 3 cenários de testes automatizados para a API da aplicação utilizando as referências abaixo:

Frontend: https://front.serverest.dev/

Swagger API: https://serverest.dev/

A proposta é validar os principais fluxos de autenticação e cadastro de usuários, incluindo comportamentos positivos, negativos e alternativos.

2. Tecnologias utilizadas
Cypress Framework
JavaScript
Node.js
npm
Visual Studio Code
BDD (Behavior-Driven Development)
Gherkin para especificação dos cenários

3. Estratégia de testes
Os cenários serão especificados utilizando a abordagem BDD, com a estrutura:

Dado (Given): contexto inicial do teste.
Quando (When): ação realizada pelo usuário ou cliente da API.
Então (Then): resultado esperado.
Os testes serão divididos em duas camadas:

Frontend E2E: validação dos fluxos pela interface da aplicação.
API: validação das requisições HTTP, dos códigos de resposta, das mensagens e das regras de negócio.

4. Cenários de teste — Frontend E2E
CT-01 — Cadastro de usuário com dados válidos
Classificação: Positivo

Dado que o usuário acessa a página de cadastro e possui dados válidos para criar uma conta.

Quando preenche o nome, o e-mail e a senha e solicita o cadastro.

Então o sistema deve concluir o cadastro com sucesso e apresentar uma mensagem de confirmação.

CT-02 — Login com credenciais válidas
Classificação: Positivo

Dado que o usuário possui uma conta cadastrada e está na página de login.

Quando informa um e-mail e uma senha válidos e solicita a autenticação.

Então o sistema deve permitir o acesso e apresentar a página correspondente ao perfil autenticado.

CT-03 — Login com senha incorreta
Classificação: Negativo

Dado que o usuário possui uma conta cadastrada e está na página de login.

Quando informa seu e-mail cadastrado e uma senha incorreta.

Então o sistema deve negar o acesso e apresentar uma mensagem de erro.

CT-04 — Cadastro com e-mail já existente
Classificação: Alternativo

Dado que já existe um usuário cadastrado com determinado endereço de e-mail.

Quando uma nova tentativa de cadastro é realizada utilizando o mesmo e-mail.

Então o sistema deve informar que o endereço já está em uso e impedir a criação do cadastro duplicado.

5. Cenários de teste — API
CT-05 — Cadastro de usuário administrador com dados válidos
Classificação: Positivo

Dado que existe informações com dados válidos e um endereço de e-mail ainda não cadastrado.

Quando é enviada uma requisição POST para /usuarios, com o campo administrador definido como "true".

Então a API deve retornar o status HTTP 201, informar o sucesso do cadastro e disponibilizar o identificador do usuário administrador criado.

CT-06 — Cadastro de produtos inválido
Classificação: Negativo

Dado que existe um usuário administrador autenticado na aplicação e um produto previamente cadastrado com determinado nome.

Quando é enviada uma requisição POST para /produtos utilizando um nome de produto que já está cadastrado.

Então a API deve rejeitar a operação, retornar o status HTTP 400 e apresentar uma mensagem informando que não é permitido cadastrar um produto com nome já utilizado.

CT-07 — Cadastro de carrinho
Classificação: Positivo

Dado que existe um usuário autenticado e produtos válidos cadastrados na aplicação.

Quando é enviada uma requisição POST para /carrinhos com os produtos e suas respectivas quantidades.

Então a API deve registrar o carrinho, retornar o status HTTP 201 e disponibilizar a confirmação do cadastro e o identificador do carrinho criado.

6. Estrutura de pastas
desafioAmbev/
├── cypress/
│   ├── e2e/
│   │   ├── frontend/
│   │   │   ├── cadastro.cy.js
│   │   │   └── login.cy.js
│   │   └── api/
		│   ├── cadastro-usuario-api.json
		│   ├── produtos-api.json
		│   └── carrinho-api.json
│   ├── fixtures/
│   │   └── usuarios.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── README.md

7. Execução dos testes

Os testes automatizados do projeto utilizam o Cypress e estão divididos em duas categorias: testes End-to-End (E2E) de frontend e testes de API.

7.1. Abrir a interface do Cypress

Para abrir a interface gráfica do Cypress e selecionar os cenários de teste:

npx cypress open

7.2. Executar todos os testes

Para executar todos os cenários em modo headless, sem abrir a interface gráfica do navegador:

npx cypress run

7.3. Executar cenários individualmente

O projeto também possui o script abrir-cypress.ps1, que permite executar os cenários de forma seletiva pelo PowerShell, facilitando a validação e a depuração dos testes.

Na raiz do projeto, execute um dos comandos abaixo:

.\abrir-cypress.ps1 login
.\abrir-cypress.ps1 cadastro
.\abrir-cypress.ps1 usuario-api
.\abrir-cypress.ps1 produtos
.\abrir-cypress.ps1 carrinho

Para executar todos os cenários disponíveis pelo script:

.\abrir-cypress.ps1 todos

7.4. Fluxo dos testes de frontend

Os testes E2E validam as principais funcionalidades de cadastro e autenticação de usuários pela interface da aplicação.

O fluxo contempla:

Cadastro de usuário (CT-01): valida a criação de uma conta com dados válidos.
Login com credenciais válidas (CT-02): verifica se um usuário cadastrado consegue se autenticar.
Login com credenciais inválidas (CT-03): verifica se o sistema impede a autenticação quando a senha informada está incorreta.
Cadastro com e-mail existente (CT-04): verifica se o sistema impede a criação de contas com endereços de e-mail já utilizados.

Os cenários são responsáveis por validar tanto os fluxos de sucesso quanto os comportamentos esperados em situações de erro.

7.5. Fluxo dos testes de API

Os testes de API validam as operações de cadastro de usuários, produtos e carrinhos por meio de requisições HTTP, sem depender da interação com a interface gráfica.

Cadastro de usuário administrador (CT-05): cria um usuário com perfil de administrador e valida a resposta da API.
Cadastro duplicado de produto (CT-06): cria um usuário administrador, realiza a autenticação para obter o token de autorização, cadastra um produto e verifica se uma nova tentativa de cadastro com o mesmo nome é rejeitada.
Cadastro de carrinho (CT-07): valida a criação de um carrinho com produtos cadastrados e quantidades informadas.

Quando necessário, os testes criam os usuários e os dados utilizados durante a execução, incluindo a autenticação e o uso de token para operações protegidas.

Essa abordagem permite validar as regras de negócio, os códigos de resposta HTTP e as mensagens retornadas pela API, contribuindo para a identificação de falhas de forma mais rápida e isolada.

7.6. Organização e independência dos cenários

Os cenários são organizados por funcionalidade e podem ser executados individualmente ou em conjunto. Sempre que possível, cada teste prepara os próprios dados e pré-requisitos, reduzindo a dependência da execução prévia de outros cenários.

Essa organização facilita a manutenção da suíte de testes, a investigação de falhas e a repetição das validações durante o desenvolvimento.

8. Critérios de validação
Os testes deverão verificar:

Comportamentos esperados para cada cenário.
Códigos HTTP e conteúdo das respostas da API.
Mensagens de sucesso e erro.
Impedimento de autenticações inválidas.
Respeito às regras de cadastro de usuários.
Independência e repetibilidade dos testes.
