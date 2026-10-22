
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Gera screenshot automaticamente quando um teste falha
  screenshotOnRunFailure: true,

  // Pasta onde os screenshots serão salvos
  screenshotsFolder: 'cypress/screenshots',

  // Configurações dos testes
  e2e: {
    // URL principal dos testes de frontend
    baseUrl: 'https://front.serverest.dev',

    // Arquivos de testes de frontend e API
    specPattern: 'cypress/e2e/**/*.cy.js',

    // Arquivo carregado antes dos testes
    supportFile: 'cypress/support/e2e.js',
  },

  // Configurações compartilhadas
  env: {
    apiUrl: 'https://serverest.dev',
  },
})
