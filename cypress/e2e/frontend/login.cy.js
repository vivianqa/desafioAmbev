describe('Frontend E2E - Login | ServeRest', () => { beforeEach(() => { cy.visit('/login') })

//CT-02 — Login com credenciais válidas
it('CT-02 - deve permitir login com credenciais válidas', () => { cy.fixture('usuarios').then((usuarios) => { cy.get('input[name="email"]') .should('be.visible') .type(usuarios.usuarioValido.email)


  cy.get('input[name="password"]')
    .should('be.visible')
    .type(usuarios.usuarioValido.senha, { log: false })

  cy.get('button[type="submit"]').click()

  // Validar que o usuário saiu da página de login
  cy.url().should('not.include', '/login')
})
})

//CT-03 — Login com senha incorreta
it('CT-03 - deve negar login com Email e/ou senha inválidos', () => { cy.fixture('usuarios').then((usuarios) => { cy.get('input[name="email"]') .should('be.visible') .type(usuarios.usuarioValido.email)


  cy.get('input[name="password"]')
    .should('be.visible')
    .type('SenhaIncorreta123!', { log: false })

  cy.get('button[type="submit"]').click()

  // Validar que o sistema não permitiu o acesso
  cy.url().should('include', '/login')

  // Validar que uma mensagem de erro foi apresentada
  cy.contains(/senha|inválid|incorret|erro/i)
    .should('be.visible')
})
}) })

