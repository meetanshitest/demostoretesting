import { faker } from "@faker-js/faker";
import { m2d1_PageObjects } from "../PageObjects/m2d1_PageObjects.ts";
import { Page, expect } from "@playwright/test";

export class m2d1_Assertions extends m2d1_PageObjects {
  [x: string]: any;
  constructor(page: Page) {
    super(page);
  }

  public async navigateToCategoryPage() {
    await this.getMenuLink.click();
    expect(await this.headingText.textContent()).toBe(
      "Minimum Order Amount For Customer Group"
    );
    await expect(this.page).toHaveTitle(
      /Minimum Order Amount For Customer Group/
    );
    await expect(this.page).toHaveURL(/.*min-order-amount/);
  }

  public async navigateToProductPage() {
    await this.getMenuLink.click();
    await this.productLink.click();
    expect(await this.headingText.textContent()).toBe("Apple iPhone X");
    expect(this.page).toHaveTitle(/Apple iPhone X/);
    expect(this.page).toHaveURL(/.*apple-iphone-x/);
  }
  public async addProductInCart() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addToCart.click();
  }
  public async verifySuccessMsg() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addToCart.click();
    expect(await this.sucessMessageText.textContent()).toContain(
      "You added Apple iPhone X to your shopping cart."
    );
  }
  public async verifyPrice() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.page.waitForTimeout(2000);
    expect(await this.price.textContent()).toBe("$999.00");
  }
  public async verifySignInLink() {
    await this.signInLink.click();
    expect(await this.headingText.textContent()).toBe("Customer Login");
  }
  public async verifyCreateAccountLink() {
    await this.createAccountLink.click();
    expect(await this.headingText.textContent()).toBe(
      "Create New Customer Account"
    );
  }
  public async navigateToCart() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addToCart.click();
    await this.shoppingCartLink.click();
    await expect(this.page).toHaveTitle(/Shopping Cart/);
  }
  public async navigateToCheckout() {
    this.navigateToCart();
    await this.proceedToCheckOut.click();
    const message = this.page.locator(
      '//div[@data-bind="html: $parent.prepareMessageForHtml(message.text)"]'
    );
    if (message) {
      //await this.page.waitForTimeout(4000);
      await this.qtyUpdateTextBox.fill("2");
      await this.updateCartButton.click();
      await this.proceedToCheckOut.click();
      await this.page.waitForTimeout(2000);
      expect(this.page).toHaveTitle("Checkout");
    } else {
      console.log("No error...");
      await this.proceedToCheckOut.click();
    }
  }
  public async placeOrder() {
    const successMessage = "Thank you for your purchase!";
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addToCart.click();
    await this.shoppingCartLink.click();
    await this.page.waitForTimeout(3000);
    await this.proceedToCheckOut.click();
    await this.email.fill(`${faker.internet.email()}`);
    await this.fname.fill(`${faker.person.firstName()}`);
    await this.lname.fill(`${faker.person.lastName()}`);
    await this.company.fill(`${faker.company.buzzPhrase()}`);
    await this.streetAddress.fill(`${faker.location.streetAddress()}`);
    await this.country.selectOption("India");
    await this.state.selectOption("Gujarat");
    await this.city.fill(`${faker.location.city()}`);
    await this.zip.fill(`${faker.location.zipCode()}`);
    await this.phone.fill(`${faker.phone.number()}`);
    await this.nextBtn.click();
    await this.paymentMethod.check();
    await this.placeOrderBtn.click();
    await expect(this.page).toHaveURL(/.*checkout/);
    expect(await this.sucessOrderMessage.textContent()).toBe(
      `${successMessage}`
    );
    await expect(this.page).toHaveTitle("Success Page");
  }
}
