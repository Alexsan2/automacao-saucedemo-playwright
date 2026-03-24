const { By } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.userInput = By.id('user-name');
        this.passInput = By.id('password');
        this.loginBtn = By.id('login-button');
        // Este é o seletor da mensagem de erro vermelha
        this.msgErro = By.css('[data-test="error"]'); 
    }

    async abrir() {
        await this.driver.get('https://www.saucedemo.com/');
    }

    async realizarLogin(usuario, senha) {
        await this.driver.findElement(this.userInput).sendKeys(usuario);
        await this.driver.findElement(this.passInput).sendKeys(senha);
        await this.driver.findElement(this.loginBtn).click();
    }

    async obterMensagemErro() {
        // Captura o texto do erro que aparece na tela
        let elemento = await this.driver.findElement(this.msgErro);
        return await elemento.getText();
    }
}

module.exports = LoginPage;