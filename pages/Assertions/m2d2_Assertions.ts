import { expect, Selectors, type Locator, type Page } from "@playwright/test";
import { log } from "console";
import { faker } from "@faker-js/faker";
import { m2d2_PageObjects } from "../PageObjects/m2d2_PageObjects";

export class m2d2_Assertions extends m2d2_PageObjects{
  constructor(page: Page) {
    super(page);
  }
  async navigateToCategoryPage() {
    await this.getMenuLink.click();
    expect(await this.headingText.textContent()).toBe("Minimum Order Amount For Customer Group");
    await expect(this.page).toHaveTitle(/Minimum Order Amount For Customer Group/);
    await expect(this.page).toHaveURL(/.*min-order-amount/);
  }

  async navigateToProductPage() {
    await this.getMenuLink.click();
    await this.productLink.click();
    expect(await this.headingText.textContent()).toBe("Apple iPhone X");
    await expect(this.page).toHaveTitle(/Apple iPhone X/);
    await expect(this.page).toHaveURL(/.*apple-iphone-x/);
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
    expect(await this.price.textContent()).toBe("$999.00");
  }
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
  async navigateToCheckout() {
    this.navigateToCart();
    await this.page.waitForTimeout(2000);
    await this.proceedToCheckOut.click();
    const message = await this.page.locator(
      '//div[@data-bind="html: $parent.prepareMessageForHtml(message.text)"]'
    );
    if (message) {
      await this.page.waitForTimeout(4000);
      await this.qtyUpdateTextBox.fill("2");
      await this.updateCartButton.click();
      await this.page.waitForTimeout(4000);
      await this.proceedToCheckOut.click();
      await this.page.waitForTimeout(2000);
      await expect(this.page).toHaveTitle(/Checkout/);
    } else {
      console.log("No error...");
      await this.proceedToCheckOut.click();
    }
  }
  async placeOrder() {
    this.navigateToCheckout();
    await this.page.waitForTimeout(1000);
    await this.email.fill("bhushan.trivedi@meetanshi.com");
    await this.fname.fill("bhushan");
    await this.lname.fill("trivedi");
    await this.company.fill("Meetanshi");
    await this.streetAddress.fill(
      `${faker.location.streetAddress({ useFullAddress: true })}`
    );
    await this.country.selectOption("IN");
    //await this.page.waitForTimeout(2000);
    await this.state.selectOption("544");
    //await this.page.waitForTimeout(2000);
    await this.city.fill("Bhavnagar");
    await this.zip.fill("364003");
    await this.phone.fill("123456789");
    await this.nextBtn.click();
    await this.paymentMethod.check();
    await this.placeOrderBtn.click();
    await expect(this.page).toHaveTitle('Success Page')
  }
  
}
