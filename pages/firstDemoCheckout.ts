import { expect, Selectors, type Locator, type Page } from "@playwright/test";
import { log } from "console";

export class firstDemoCheckout {
  page: Page;
  getMenuLink: Locator;
  productLink: Locator;
  addToCart: Locator;
  sucessMessageText: Locator;
  headingText: Locator;
  price: Locator;
  menuItem: Locator;
  ItemLocators: Locator;
  signInLink: Locator;
  createAccountLink: Locator;
  shoppingCartLink: Locator;
  proceedToCheckOut: Locator;
  qtyUpdateTextBox: Locator;
  updateCartButton: Locator;
  errorMsg: Locator;
  email:Locator;
  fname:Locator;
  lname:Locator;
  company:Locator;
  streetAddress:Locator;
  country:Locator;
  state:Locator;
  city:Locator;
  zip:Locator;
  phone:Locator;
  nextBtn:Locator;

  constructor(page: Page) {
    this.page = page;
    this.getMenuLink = page.locator('//a[@id="ui-id-2"]');
    this.addToCart = page.locator("#product-addtocart-button");
    this.productLink = page.locator(
      '//a[normalize-space()="Push It Messenger Bag"]'
    );
    this.sucessMessageText = page.locator(
      "//a[normalize-space()='shopping cart']"
    );
    this.headingText = page.locator("//span[@class='base']");
    this.price = page.locator("//span[@class='price']");
    this.ItemLocators = page.locator("li>a>span");
    this.signInLink = page.getByText("Sign In");
    this.createAccountLink = page.getByText("Create an Account");
    this.shoppingCartLink = page.getByRole("link", { name: "Shopping Cart" });
    this.proceedToCheckOut = page.getByRole("button", {
      name: "Proceed to Checkout",
    });
    this.qtyUpdateTextBox = page.getByRole('spinbutton',{name:'Qty'});
    this.updateCartButton = page.locator(
      "//span[normalize-space()='Update Shopping Cart']"
    );
    this.errorMsg = page.locator("//div[@data-bind='html: $parent.prepareMessageForHtml(message.text)']");

  }
  async navigateToCategoryPage() {
    await this.getMenuLink.click();
    expect(await this.headingText.textContent()).toBe("Cardsave Payments");
    await expect(this.page).toHaveTitle(/Cardsave Payments/);
    await expect(this.page).toHaveURL(/.*cardsave-payments/);
  }

  async navigateToProductPage() {
    await this.getMenuLink.click();
    await this.productLink.click();
    expect(await this.headingText.textContent()).toBe("Push It Messenger Bag");
    await expect(this.page).toHaveTitle(/Push It Messenger Bag/);
    await expect(this.page).toHaveURL(/.*push-it-messenger-bag/);
  }
  async addProductInCart() {
    this.navigateToProductPage();
    await this.addToCart.click();
  }
  async verifySuccessMsg() {
    this.navigateToProductPage();
    this.addProductInCart();
    await this.page.waitForTimeout(2000);
    expect(this.sucessMessageText).toBeVisible;
  }
  async verifyPrice() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.page.waitForTimeout(2000);
    expect(await this.price.textContent()).toBe("$49.00");
  }
  // async getmenuItems() {
  //   const menuItems=await this.page.locator('#ui-id-1');
  // }
  async verifySignInLink() {
    await this.signInLink.click();
    await this.page.waitForTimeout(2000);
    expect(this.headingText.textContent()).toBe("Customer Login");
  }
  async verifyCreateAccountLink() {
    await this.createAccountLink.click();
    await this.page.waitForTimeout(2000);
    expect(this.headingText.textContent()).toBe("Create New Customer Account");
  }
  async navigateToCart() {
    this.verifySuccessMsg();
    await this.page.waitForTimeout(2000);
    await this.shoppingCartLink.click();
    await expect(this.page).toHaveTitle(/Shopping Cart/);
  }
  // async updateCart() {
   
  // }
  async navigateToCheckout() {
    this.navigateToCart();
    await this.page.waitForTimeout(2000);
    await this.proceedToCheckOut.click();
    const message=await this.page.locator('//div[@data-bind="html: $parent.prepareMessageForHtml(message.text)"]')
    if (message) {
      await this.page.waitForTimeout(4000);
      await this.qtyUpdateTextBox.fill('10');
      await this.updateCartButton.click();
      await this.page.waitForTimeout(4000);
      await this.proceedToCheckOut.click();
      await this.page.waitForTimeout(2000);
      await expect(this.page).toHaveTitle(/Checkout/)
    }else{
      console.log("No error...");
      await this.proceedToCheckOut.click();
    }
    
  }
  async placeOrder(){
    this.navigateToCheckout()
    
  }
  
}
