
describe('API - Cadastro de usuário | ServeRest', () => {

  it('CT-05 - deve cadastrar um usuário administrador com dados válidos', () => {

    cy.fixture('cadastrousuario-api').then((dados) => {
      const usuario = dados.usuarioAdministrador;

      // Gerar e-mail dinâmico para evitar duplicidade
      const emailDinamico =
        `qa.admin.${Date.now()}@example.com`;

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: {
          nome: usuario.nome,
          email: emailDinamico,
          password: usuario.password,
          administrador: usuario.administrador
        }
      }).then((response) => {

        // Validar status HTTP
        expect(response.status).to.eq(201);

        // Validar mensagem de sucesso
        expect(response.body.message)
          .to.eq('Cadastro realizado com sucesso');

        // Validar identificador do usuário criado
        expect(response.body._id).to.exist;

        cy.log(`E-mail cadastrado: ${emailDinamico}`);
        cy.log(`ID do usuário: ${response.body._id}`);

      });
    });

  });

});
