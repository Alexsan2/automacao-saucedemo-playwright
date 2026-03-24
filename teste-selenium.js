const { Builder, By, Key, until } = require('selenium-webdriver');

(async function testarCarrinho() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log("Iniciando fluxo completo de compra... 🛒");
    await driver.get('https://www.saucedemo.com/');

    // --- PASSO 1: LOGIN ---
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce', Key.RETURN);

    // --- PASSO 2: ESPERAR O BOTÃO DE ADICIONAR ---
    // Aqui usamos o segredo: esperar o elemento aparecer antes de clicar
    let botaoAdd = await driver.wait(
      until.elementLocated(By.id('add-to-cart-sauce-labs-backpack')), 
      10000
    );
    await botaoAdd.click();
    console.log("Produto adicionado ao carrinho!");

    // --- PASSO 3: VALIDAR O NÚMERO NO CARRINHO ---
    // O Selenium vai procurar a classe 'shopping_cart_badge'
    let badgeCarrinho = await driver.findElement(By.className('shopping_cart_badge'));
    let quantidade = await badgeCarrinho.getText();

    console.log("--------------------------------------");
    if (quantidade === "1") {
      console.log("TESTE PASSOU! ✅");
      console.log("O carrinho agora marca: " + quantidade);
    } else {
      console.log("TESTE FALHOU! ❌");
      console.log("Esperava 1, mas encontrei: " + quantidade);
    }
    console.log("--------------------------------------");

    await driver.sleep(3000);

  } catch (error) {
    console.error("Erro no fluxo:", error.message);
  } finally {
    await driver.quit();
  }
})();