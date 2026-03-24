const { Builder } = require('selenium-webdriver');
const LoginPage = require('./pages/LoginPage');

(async function executarTesteDeErro() {
    // 1. Inicia o driver
    let driver = await new Builder().forBrowser('chrome').build();
    const login = new LoginPage(driver);

    try {
        console.log("-----------------------------------------");
        console.log("🚫 TESTANDO USUÁRIO BLOQUEADO");
        console.log("-----------------------------------------");

        // 2. Abre o site
        await login.abrir();
        
        // 3. Tenta o login com usuário bloqueado
        // Aqui usamos o 'locked_out_user'
        await login.realizarLogin('locked_out_user', 'secret_sauce');

        // 4. Pega a mensagem de erro que aparece no banner vermelho
        let mensagem = await login.obterMensagemErro();
        console.log("Mensagem detectada: " + mensagem);

        // 5. Validação (Assertion)
        if (mensagem.includes("Epic sadface: Sorry, this user has been locked out")) {
            console.log("\n🏆 RESULTADO: TESTE PASSOU!");
            console.log("O sistema barrou o usuário corretamente.");
        } else {
            console.log("\n❌ RESULTADO: TESTE FALHOU!");
            console.log("A mensagem de erro não era a esperada.");
        }

        await driver.sleep(3000);

    } catch (error) {
        console.error("\n🔴 ERRO NO TESTE:", error.message);
    } finally {
        // 6. Fecha o navegador
        await driver.quit();
    }
})();