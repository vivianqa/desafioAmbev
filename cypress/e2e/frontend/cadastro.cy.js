
describe('Frontend E2E - Cadastro | ServeRest', () => {

  // CT-01 — Cadastro de usuário com dados válidos
  it('CT-01 - deve cadastrar um usuário com dados válidos', () => {
    cy.fixture('usuarios').then((usuarios) => {
      const emailDinamico =
        `qa.cadastro.${Date.now()}@example.com`;

      cy.visit('/');

      cy.contains('a, button', 'Cadastre-se')
        .should('be.visible')
        .click();

      cy.url().should('include', '/cadastrarusuarios');

      cy.get('input[name="nome"]')
        .should('be.visible')
        .type('Usuario Desafio QA');

      cy.get('input[name="email"]')
        .should('be.visible')
        .type(emailDinamico);

      cy.get('input[name="password"]')
        .should('be.visible')
        .type(usuarios.usuarioValido.senha, {
          log: false
        });

      cy.get('button[type="submit"]').click();

      cy.contains('Cadastro realizado com sucesso')
        .should('be.visible');
    });
  });

  // CT-04 — Cadastro com e-mail já existente
  it('CT-04 - deve impedir cadastro com e-mail já em uso', () => {
    cy.fixture('usuarios').then((usuarios) => {
      const email = usuarios.usuarioValido.email;
      const senha = usuarios.usuarioValido.senha;

      // Garantir que o e-mail esteja cadastrado na API.
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: {
          nome: 'Usuario Base CT04',
          email,
          password: senha,
          administrador: 'false'
        },
        failOnStatusCode: false
      }).then((resUsuario) => {
        expect([201, 400]).to.include(resUsuario.status);

        // Tentar cadastrar o mesmo e-mail pela interface.
        cy.visit('/cadastrarusuarios');

        cy.get('input[name="nome"]')
          .should('be.visible')
          .type('Usuario com e-mail já em uso');

        cy.get('input[name="email"]')
          .should('be.visible')
          .type(email);

        cy.get('input[name="password"]')
          .should('be.visible')
          .type(senha, { log: false });

        cy.get('button[type="submit"]').click();

        // Validar a mensagem de erro exibida na interface.
        cy.contains('Este email já está sendo usado', {
          timeout: 10000
        }).should('be.visible');
      });
    });
  });

});
