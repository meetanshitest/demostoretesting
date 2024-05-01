import { faker } from "@faker-js/faker";
import { m2d1_PageObjects } from "../PageObjects/m2d1_PageObjects.ts";
import { Page, expect } from "@playwright/test";

export class m2d1_Assertions extends m2d1_PageObjects {
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
      //await this.page.waitForTimeout(2000);
      await expect(this.page).toHaveTitle("Checkout");
    } else {
      console.log("No error...");
      await this.proceedToCheckOut.click();
    }
  }  
  public async placeOrder() {
    await this.navigateToCart();
    await this.proceedToCheckOut.click()
    await this.page.waitForTimeout(1000);
    await this.email.fill("bhushan@yopmail.com");
    await this.fname.fill("bhushan");
    await this.lname.fill("yopmail");
    await this.company.fill("yopmail");
    await this.streetAddress.fill(
      `${faker.location.streetAddress({ useFullAddress: true })}`
    );
    await this.country.selectOption("IN");
    await this.state.selectOption("544");
    await this.city.fill("Bhavnagar");
    await this.zip.fill("364003");
    await this.phone.fill("123456789");
    await this.nextBtn.click();
    await this.paymentMethod.check();
    await this.placeOrderBtn.click();
    await expect(this.page).toHaveTitle("Success Page");
  }
}
