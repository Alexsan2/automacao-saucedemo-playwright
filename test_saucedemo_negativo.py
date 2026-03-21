from playwright.sync_api import Page, expect

def test_login_usuario_bloqueado(page: Page):
    # 1. Acessa o site
    page.goto("https://www.saucedemo.com/")
    
    # 2. Preenche com o usuário bloqueado
    page.locator("[data-test='username']").fill("locked_out_user")
    page.locator("[data-test='password']").fill("secret_sauce")
    
    # 3. Clica no botão de login
    page.locator("[data-test='login-button']").click()
    
    # 4. Validação: Verifica se a mensagem de erro correta aparece
    elemento_erro = page.locator("[data-test='error']")
    expect(elemento_erro).to_be_visible()
    expect(elemento_erro).to_contain_text("Epic sadface: Sorry, this user has been locked out.")
    
    # 5. Tira um print do erro para o relatório
    page.screenshot(path="evidencia_erro_login.png")