import { expect, type Locator, type Page } from '@playwright/test';

export class firstDemoCheckout {
  page: Page;
  getMenuLink: Locator;
  productLink: Locator;
  addToCart:Locator;
  sucessMessageText:Locator;
  headingText:Locator;
  price:Locator;
  menuItem:Locator;
  ItemLocators:Locator;

  constructor(page: Page) {
    this.page = page;
    this.getMenuLink = page.locator('//a[@id="ui-id-2"]');
    this.addToCart=page.locator('#product-addtocart-button')
    this.productLink=page.locator('//a[normalize-space()="Push It Messenger Bag"]')
    this.sucessMessageText=page.locator("//a[normalize-space()='shopping cart']")
    this.headingText=page.locator("//span[@class='base']")
    this.price=page.locator("//span[@class='price']");
    this.ItemLocators=page.locator("li>a>span")
  }
  async navigateToCategoryPage(){
    await this.getMenuLink.click()
    expect(await this.headingText.textContent()).toBe("Cardsave Payments")
    await expect(this.page).toHaveTitle(/Cardsave Payments/)
    await expect(this.page).toHaveURL(/.*cardsave-payments/)
  }

  async navigateToProductPage(){
    await this.getMenuLink.click()
    await this.productLink.click()
    expect(await this.headingText.textContent()).toBe("Push It Messenger Bag")
    await expect(this.page).toHaveTitle(/Push It Messenger Bag/)
    await expect(this.page).toHaveURL(/.*push-it-messenger-bag/)
  }
  async addProductInCart(){
    this.navigateToProductPage()
    await this.addToCart.click()
  }
  async verifySuccessMsg(){
    this.navigateToProductPage()
    this.addProductInCart()
    await this.page.waitForTimeout(2000)
    expect(this.sucessMessageText).toBeVisible
  }
  async verifyPrice(){
    await this.getMenuLink.click()
    await this.productLink.click()
    await this.page.waitForTimeout(2000)
    expect(await this.price.textContent()).toBe('$49.00')
  }
  async getmenuItems() {
    const menuItems=await this.page.locator('#ui-id-1');
  
    

  }
}