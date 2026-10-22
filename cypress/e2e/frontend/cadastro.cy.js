
describe('Frontend E2E - Cadastro | ServeRest', () => {

  // CT-01 — Cadastro de usuário com dados válidos
  it('CT-01 - deve cadastrar um usuário com dados válidos', () => {
    cy.fixture('usuarios').then((usuarios) => {

      // E-mail dinâmico a cada execução
      const emailDinamico =
        `qa.cadastro.${Date.now()}@example.com`;

      cy.visit('/');

      cy.contains('a, button', 'Cadastre-se')
        .should('be.visible')
        .click();

      cy.url().should('include', '/cadastrarusuarios');

      cy.get('input[name="nome"]')
        .should('be.visible')
        .type('Usuario Desafio QA ');

      cy.get('input[name="email"]')
        .should('be.visible')
        .type(emailDinamico);

      cy.get('input[name="password"]')
        .should('be.visible')
        .type(usuarios.usuarioValido.senha, {
          log: false
        });

      // Não selecionar o checkbox de administrador
      cy.get('button[type="submit"]').click();

      cy.contains('Cadastro realizado com sucesso')
        .should('be.visible');
    });
  });

  //CT-04 — Cadastro com e-mail já existente
  it('CT-04 - deve impedir cadastro com e-mail já em uso', () => {
    cy.fixture('usuarios').then((usuarios) => {

      cy.visit('/');

      cy.contains('a, button', 'Cadastre-se')
        .should('be.visible')
        .click();

      cy.url().should('include', '/cadastrarusuarios');

      cy.get('input[name="nome"]')
        .should('be.visible')
        .type('Usuario com e-mail já em uso');

      // E-mail fixo vindo do fixture
      cy.get('input[name="email"]')
        .should('be.visible')
        .type(usuarios.usuarioValido.email);

      cy.get('input[name="password"]')
        .should('be.visible')
        .type(usuarios.usuarioValido.senha, {
          log: false
        });

      // Não selecionar o checkbox de administrador
      cy.get('button[type="submit"]').click();

      // Validar a mensagem de e-mail já utilizado
      cy.contains('Este email já está sendo usado')
        .should('be.visible');
    });
  });

});
