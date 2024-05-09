import { faker } from "@faker-js/faker";
import { m2d2_PageObjects } from "../PageObjects/m2d2_PageObjects.ts";
import { Page, expect } from "@playwright/test";

export class m2d2_Assertions extends m2d2_PageObjects {
  constructor(page: Page) {
    super(page);
  }
  public async loginPage() {
    await this.page
      .locator(`${process.env.EMAIL_LOCATOR}`)
      .fill(`${process.env.EMAIL}`);
    await this.page
      .locator(`${process.env.PASSWORD_LOCATOR}`)
      .fill(`${process.env.PASSWORD}`);
    await this.page.locator(`${process.env.SUBMIT}`).click();
    
  }
  public async navigateToCategoryPage() {
    await this.page.waitForTimeout(1000);
    await this.getMenuLink.click();
    expect(await this.headingText.textContent()).toBe("Email Attachments");
    await expect(this.page).toHaveTitle("Email Attachments");
    await expect(this.page).toHaveURL(/.*email-attachments/);
  }

  public async navigateToProductPage() {
    await this.getMenuLink.click();
    await this.productLink.click();
    expect(await this.headingText.textContent()).toBe("Apple iPhone X");
    expect(this.page).toHaveTitle("Men's Aviators");
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
  public async placeOrderByMiniCart() {
    await this.getMenuLink.click();
    await this.productItemInfo.hover();
    await this.categoryAddtoCartBtn.click();
    await this.miniCartItem.click();
    await this.page.waitForTimeout(1000);
    await this.miniCheckout.click();
    await expect(this.page).toHaveTitle("Checkout");
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
    await expect(this.page).toHaveTitle("Success Page");
  }
  public async brokenImages() {
    await this.page.waitForTimeout(5000);
    let images = await this.page.$$("img");
    const brokenImgs: string[] = [];
    for (const image of images) {
      const imageUrl = await image.getAttribute("src");

      // Check if the image URL exists and is not empty
      if (!imageUrl) {
        console.warn("Image with no src attribute found:", image);
        continue; // Skip images without src
      }

      // Use fetch to perform a HEAD request and check the response status code
      const response = await this.page.evaluate(async (url) => {
        const response = await fetch(url, { method: "HEAD" });
        return response.status;
      }, imageUrl);

      if (response !== 200) {
        brokenImgs.push(imageUrl);
        console.error(`Broken image found: ${imageUrl}`);
      }
    }

    if (brokenImgs.length === 0) {
      console.log("All images loaded successfully!");
    } else {
      console.warn(`Found ${brokenImgs.length} broken images:`);
      console.warn(brokenImgs.join("\n"));
    }
  }
}
