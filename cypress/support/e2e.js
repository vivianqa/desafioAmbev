
afterEach(function () {
  const nomeTeste = this.currentTest.title
    .replace(/[^a-zA-Z0-9-_]/g, '-')

  cy.screenshot(nomeTeste, {
    capture: 'runner',
    overwrite: true,
  })
})
