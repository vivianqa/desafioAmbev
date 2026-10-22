describe('API - Cadastro de produtos | ServeRest', () => { const baseUrl = 'https://serverest.dev';

it('CT-06 - deve rejeitar cadastro de produto com nome já utilizado', () => { cy.fixture('produtos-api').then((dados) => { const timestamp = Date.now();

  const produto = {
    ...dados.produtoDuplicado,
    nome: `Produto QA Duplicidade ${timestamp}`
  };

  const usuario = {
    nome: 'QA Produtos',
    email: `qa.produtos.${timestamp}@example.com`,
    password: 'TesteAmbev123!',
    administrador: 'true'
  };

  // 1. Cadastrar usuário administrador
  cy.request({
    method: 'POST',
    url: `${baseUrl}/usuarios`,
    body: usuario
  }).then((resUsuario) => {
    expect(resUsuario.status).to.eq(201);

    // 2. Fazer login para obter o token
    return cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      body: {
        email: usuario.email,
        password: usuario.password
      }
    });
  }).then((resLogin) => {
    expect(resLogin.status).to.eq(200);
    expect(resLogin.body.authorization).to.be.a('string').and.not.be.empty;

    const token = resLogin.body.authorization;

    // 3. Cadastrar o produto pela primeira vez
    return cy.request({
      method: 'POST',
      url: `${baseUrl}/produtos`,
      headers: {
        Authorization: token
      },
      body: produto
    }).then((resProduto) => {
      expect(resProduto.status).to.eq(201);

      // 4. Tentar cadastrar novamente o mesmo produto
      return cy.request({
        method: 'POST',
        url: `${baseUrl}/produtos`,
        headers: {
          Authorization: token
        },
        body: produto,
        failOnStatusCode: false
      });
    });
  }).then((resDuplicado) => {
    // 5. Validar a rejeição do cadastro duplicado
    expect(resDuplicado.status).to.eq(400);
    expect(resDuplicado.body.message)
      .to.eq('Já existe produto com esse nome');
  });
});


}); });