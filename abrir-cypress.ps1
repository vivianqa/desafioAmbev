
param(
    [Parameter(Position = 0)]
    [ValidateSet("todos", "login", "cadastro", "produtos", "carrinho", "usuario-api")]
    [string]$Cenario = "todos"
)

$ErrorActionPreference = "Stop"

# Diretórios sem caracteres especiais no caminho
New-Item -ItemType Directory -Force -Path "C:\cypress-appdata" | Out-Null
New-Item -ItemType Directory -Force -Path "C:\cypress-temp" | Out-Null

# Redirecionar os diretórios temporários
$env:APPDATA = "C:\cypress-appdata"
$env:TEMP = "C:\cypress-temp"
$env:TMP = "C:\cypress-temp"

Set-Location "C:\desafioAmbev"

Write-Host ""
Write-Host "Executando cenário: $Cenario" -ForegroundColor Cyan
Write-Host ""

$env:CYPRESS_CACHE_FOLDER = "C:\cypress-cache"

switch ($Cenario) {
    "todos" {
        npx cypress run
    }
    "login" {
        npx cypress run --spec "cypress/e2e/frontend/login.cy.js"
    }
    "cadastro" {
        npx cypress run --spec "cypress/e2e/frontend/cadastro.cy.js"
    }
    "produtos" {
        npx cypress run --spec "cypress/e2e/api/produtos-api.cy.js"
    }
    "carrinho" {
        npx cypress run --spec "cypress/e2e/api/carrinho-api.cy.js"
    }
    "usuario-api" {
        npx cypress run --spec "cypress/e2e/api/cadastrousuario-api.cy.js"
    }
}

exit $LASTEXITCODE
