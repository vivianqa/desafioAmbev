🍺 Desafio Ambev — Testes Automatizados com Cypress

!Cypress !JavaScript !Node.js !BDD

Projeto de automação de testes desenvolvido para o Desafio Ambev, utilizando Cypress e JavaScript para validar os principais fluxos de cadastro, autenticação e operações de API da aplicação ServeRest.

O projeto contempla 7 cenários de testes automatizados, divididos entre frontend E2E e API, abrangendo comportamentos positivos, negativos e alternativos.

📑 Sumário
Objetivo do projeto
Tecnologias utilizadas
Cenários de teste
Estrutura do projeto
Pré-requisitos
Instalação e execução
Testes de frontend
Testes de API
Critérios de validação
Links úteis

🎯 Objetivo do projeto

Desenvolver testes automatizados utilizando Cypress para validar funcionalidades da aplicação ServeRest.

Os principais objetivos são:

Validar o cadastro e a autenticação de usuários.
Verificar o tratamento de credenciais inválidas.
Validar as regras de negócio da API.
Conferir códigos HTTP, mensagens e dados retornados.
Garantir a independência e a repetibilidade dos testes.
Aplicações utilizadas
Aplicação	Descrição
ServeRest Frontend	Interface web para testes E2E
ServeRest API	API REST e documentação Swagger
🛠️ Tecnologias utilizadas
Cypress: automação de testes E2E e API.
JavaScript: linguagem utilizada no desenvolvimento dos testes.
Node.js: ambiente de execução.
npm: gerenciamento de dependências.
BDD: abordagem de desenvolvimento orientado a comportamento.
Gherkin: especificação dos cenários de teste.
Visual Studio Code: ambiente de desenvolvimento.
🧪 Estratégia de testes

Os cenários seguem a abordagem BDD, baseada na estrutura:

Dado (Given): contexto inicial do teste.
Quando (When): ação realizada.
Então (Then): resultado esperado.

O projeto está dividido em duas camadas:

Frontend E2E: valida os fluxos de cadastro e login pela interface gráfica.

API: valida requisições HTTP, códigos de resposta, mensagens, autenticação e regras de negócio.

📋 Cenários de teste
🖥️ Frontend E2E
ID	Cenário	Tipo	Resultado esperado
CT-01	Cadastro com dados válidos	Positivo	Cadastro concluído com sucesso
CT-02	Login com credenciais válidas	Positivo	Acesso autorizado
CT-03	Login com senha incorreta	Negativo	Acesso negado e mensagem de erro
CT-04	Cadastro com e-mail existente	Alternativo	Cadastro duplicado impedido
🔌 API
ID	Cenário	Tipo	Resultado esperado
CT-05	Cadastro de usuário administrador	Positivo	HTTP 201 e identificador do usuário
CT-06	Cadastro de produto duplicado	Negativo	HTTP 400 e mensagem de erro
CT-07	Cadastro de carrinho	Positivo	HTTP 201 e identificador do carrinho
📁 Estrutura do projeto
desafioAmbev/
├── cypress/
│   ├── e2e/
│   │   ├── frontend/
│   │   │   ├── cadastro.cy.js
│   │   │   └── login.cy.js
│   │   └── api/
│   │       ├── cadastro-usuario-api.cy.js
│   │       ├── produtos-api.cy.js
│   │       └── carrinho-api.cy.js
│   ├── fixtures/
│   │   └── usuarios.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── abrir-cypress.ps1
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md

Organização:

cypress/e2e/frontend/: testes de cadastro e login.
cypress/e2e/api/: testes dos endpoints da API.
cypress/fixtures/: dados utilizados nos testes.
cypress/support/: comandos personalizados e configurações.
cypress.config.js: configuração do Cypress.
abrir-cypress.ps1: execução seletiva pelo PowerShell.
package.json: dependências e scripts do projeto.
⚙️ Pré-requisitos

Antes de começar, instale:

Node.js
npm
Git
Visual Studio Code

Verifique as instalações:

node -v
npm -v
git --version

🚀 Instalação e execução
1. Clonar o repositório
git clone <https://github.com/vivianqa/desafioAmbev>
cd desafioAmbev

2. Instalar as dependências
npm install

3. Abrir o Cypress
npx cypress open

4. Executar todos os testes
npx cypress run

5. Executar um arquivo específico

Exemplo para os testes de login:

npx cypress run --spec "cypress/e2e/frontend/login.cy.js"


Exemplo para os testes de produtos:

npx cypress run --spec "cypress/e2e/api/produtos-api.cy.js"

🖥️ Testes de frontend
CT-01 — Cadastro de usuário
Acessar a página de cadastro.
Preencher nome, e-mail e senha.
Solicitar o cadastro.
Validar a mensagem de sucesso.
CT-02 — Login válido
Acessar a página de login.
Informar credenciais válidas.
Solicitar a autenticação.
Validar o acesso à página correspondente.
CT-03 — Login com senha incorreta
Informar um e-mail cadastrado e uma senha incorreta.
Solicitar a autenticação.
Validar o bloqueio de acesso e a mensagem de erro.
CT-04 — E-mail já cadastrado
Utilizar um e-mail previamente cadastrado.
Tentar realizar um novo cadastro.
Validar o impedimento da duplicidade.

🔌 Testes de API
CT-05 — Cadastro de administrador

Endpoint: POST /usuarios

Enviar dados válidos com administrador definido como "true".
Validar o status HTTP 201.
Verificar a mensagem de sucesso.
Validar o identificador retornado.
CT-06 — Cadastro de produto duplicado

Endpoint: POST /produtos

Autenticar um usuário administrador.
Obter o token de autorização.
Cadastrar um produto.
Tentar cadastrar novamente o mesmo nome.
Validar o status HTTP 400 e a mensagem de erro.
CT-07 — Cadastro de carrinho

Endpoint: POST /carrinhos

Preparar produtos válidos e um usuário autenticado.
Informar os produtos e suas quantidades.
Enviar a requisição.
Validar o status HTTP 201.
Verificar a mensagem de sucesso e o identificador do carrinho.
▶️ Execução pelo PowerShell

O projeto disponibiliza o script abrir-cypress.ps1 para executar cenários seletivamente.

Comando	Descrição
.\abrir-cypress.ps1 login	Testes de login
.\abrir-cypress.ps1 cadastro	Testes de cadastro
.\abrir-cypress.ps1 usuario-api	Cadastro de usuário pela API
.\abrir-cypress.ps1 produtos	Testes de produtos
.\abrir-cypress.ps1 carrinho	Testes de carrinho
.\abrir-cypress.ps1 todos	Todos os cenários

Execute os comandos em um terminal PowerShell, na raiz do projeto.

✅ Critérios de validação
Cadastro de usuários com dados válidos.
Login com credenciais válidas.
Bloqueio de autenticação inválida.
Impedimento de e-mails duplicados.
Validação dos códigos HTTP.
Validação das mensagens de sucesso e erro.
Rejeição de produtos duplicados.
Criação de carrinhos com dados válidos.
Validação dos identificadores retornados.
Independência e repetibilidade dos testes.
📌 Boas práticas
Organização dos testes por funcionalidade.
Reutilização de comandos personalizados.
Preparação independente dos dados de teste.
Utilização de e-mails únicos quando necessário.
Validação explícita das respostas da API.
Separação entre testes de frontend e API.
Identificação dos cenários por códigos CT-01 a CT-07.
🔗 Links úteis
🌐 ServeRest Frontend
📘 ServeRest API / Swagger
🧪 Documentação do Cypress
🟨 Documentação JavaScript
🥒 Documentação Gherkin
🟢 Node.js
💻 Visual Studio Code

Desafio Ambev — Automação de Testes com Cypress

Projeto desenvolvido com foco em qualidade de software, validação de regras de negócio e automação de testes de frontend e API.
