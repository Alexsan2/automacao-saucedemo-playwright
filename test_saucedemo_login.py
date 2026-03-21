from playwright.sync_api import Page, expect

def test_login_sucesso(page: Page):
    # 1. Acessa o site oficial de teste
    page.goto("https://www.saucedemo.com/")
    
    # 2. Preenche o campo de usuário
    page.locator("[data-test='username']").fill("standard_user")
    
    # 3. Preenche o campo de senha
    page.locator("[data-test='password']").fill("secret_sauce")
    
    # 4. Clica no botão de login
    page.locator("[data-test='login-button']").click()
    
    # 5. Validação: Verifica se o login funcionou e mudou de página
    expect(page).to_have_url("https://www.saucedemo.com/inventory.html")
   # ... (mantenha o código anterior e adicione abaixo)
    
    # 6. Clica no botão "Add to cart" da mochila
    page.locator("[data-test='add-to-cart-sauce-labs-backpack']").click()
    
    # 7. Validação: Verifica se o carrinho agora tem 1 item
    expect(page.locator("[data-test='shopping-cart-badge']")).to_have_text("1")
    
    print("Teste de adição ao carrinho passou!") 
  # ... (mantenha o código anterior)

    # 8. Tira um print da tela como evidência
    page.screenshot(path="evidencia_carrinho.png")
    
    print("Sucesso! Evidência salva como evidencia_carrinho.png") 