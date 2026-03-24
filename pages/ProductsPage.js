const { By, until } = require('selenium-webdriver');

class ProductsPage {
    constructor(driver) {
        this.driver = driver;
        this.btnAdicionar = By.id('add-to-cart-sauce-labs-backpack');
        this.badgeCarrinho = By.className('shopping_cart_badge');
    }

    async adicionarAoCarrinho() {
        let botao = await this.driver.wait(until.elementLocated(this.btnAdicionar), 5000);
        await botao.click();
    }

    // AQUI ESTAVA O ERRO: O nome tem que ser exatamente este abaixo
    async obterQuantidadeNoCarrinho() {
        let badge = await this.driver.findElement(this.badgeCarrinho);
        return await badge.getText();
    }
}

module.exports = ProductsPage;