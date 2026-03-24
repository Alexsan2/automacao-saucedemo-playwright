const { Builder } = require('selenium-webdriver');
const LoginPage = require('./pages/LoginPage');
const ProductsPage = require('./pages/ProductsPage');

(async function executarFluxoCompleto() {
    // 1. Configura o navegador (Chrome)
    let driver = await new Builder().forBrowser('chrome').build();
    
    // 2. Cria os objetos das páginas (Padrão POM)
    const login = new LoginPage(driver);
    const produtos = new ProductsPage(driver);

    try {
        console.log("-----------------------------------------");
        console.log("🚀 INICIANDO TESTE PROFISSIONAL (POM)");
        console.log("-----------------------------------------");

        // PASSO 1: Acessar o site e fazer Login
        await login.abrir();
        await login.realizarLogin('standard_user', 'secret_sauce');
        console.log("✅ Login efetuado com sucesso.");

        // PASSO 2: Adicionar produto ao carrinho
        // Note: O nome da função deve ser igual ao que está no ProductsPage.js
        await produtos.adicionarAoCarrinho();
        console.log("✅ Produto adicionado ao carrinho.");

        // PASSO 3: Validação (Assertion)
        // Verificamos se o badge do carrinho realmente mudou para '1'
        let quantidade = await produtos.obterQuantidadeNoCarrinho();

        console.log("\n=========================================");
        if (quantidade === "1") {
            console.log("🏆 RESULTADO: TESTE PASSOU!");
            console.log("O carrinho marcou '" + quantidade + "' como esperado.");
        } else {
            console.log("❌ RESULTADO: TESTE FALHOU!");
            console.log("Esperava 1, mas o sistema marcou: " + quantidade);
        }
        console.log("=========================================\n");

        // Pausa de 3 segundos para você ver o resultado visualmente
        await driver.sleep(3000);

    } catch (error) {
        console.error("\n🔴 ERRO DURANTE A EXECUÇÃO:");
        console.error(error.message);
    } finally {
        // 4. Fecha o navegador e encerra o processo
        await driver.quit();
        console.log("Navegador fechado. Teste finalizado.");
    }
})();