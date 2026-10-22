
describe('CT-07 — Cadastro de carrinho', () => {
  it('Deve cadastrar carrinho com produtos válidos', () => {
    cy.fixture('usuarios.json').then((usuarios) => {
      const usuario = {
        nome: 'Usuario QA API',
        email: `qa.${Date.now()}@teste.com`,
        password: usuarios.usuarioApi.password,
        administrador: 'false'
      };

      cy.request('POST', 'https://serverest.dev/usuarios', usuario)
        .then((cadastroResponse) => {
          expect(cadastroResponse.status).to.eq(201);

          return cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
              email: usuario.email,
              password: usuario.password
            }
          });
        })
        .then((loginResponse) => {
          expect(loginResponse.status).to.eq(200);

          const token = loginResponse.body.authorization;

          cy.fixture('carrinho-api.json').then((dados) => {
            cy.request({
              method: 'POST',
              url: 'https://serverest.dev/carrinhos',
              headers: {
                Authorization: token
              },
              body: dados.carrinhoValido
            }).then((response) => {
              expect(response.status).to.eq(201);
              expect(response.body).to.have.property('_id');
              expect(response.body.message)
                .to.eq('Cadastro realizado com sucesso');
            });
          });
        });
    });
  });
});
