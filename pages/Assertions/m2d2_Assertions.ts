import { faker } from "@faker-js/faker";
import { m2d2_PageObjects } from "../PageObjects/m2d2_PageObjects.ts";
import { Locator, Page, expect } from "@playwright/test";
import { globalSetup } from "../../config/globalSetup.ts";

export class m2d2_Assertions extends m2d2_PageObjects {
  static productName: String;
  constructor(page: Page) {
    super(page);
    if (!m2d2_Assertions.productName) {
      m2d2_Assertions.productName = "Men's Aviators";
    }
  }
  public async verifyGreetingMsg() {
    await this.signinLink.click();
    await this.loginEmail.fill(`${process.env.EMAIL}`);
    await this.password.fill(`${process.env.PASSWORD}`);
    await this.submitBtn.click();
    await expect(this.greetingMsg).toContainText("Welcome, bhushan trivedi");
  }
  public async verifySignOutLink() {
    await this.signinLink.click();
    await this.loginEmail.fill(`${process.env.EMAIL}`);
    await this.password.fill(`${process.env.PASSWORD}`);
    await this.submitBtn.click();
    await expect(this.greetingMsg).toContainText("Welcome");
    await this.page
      .getByRole("banner")
      .locator("button")
      .filter({ hasText: "Change" })
      .click();
    await this.signOutLink.click();
    await expect(this.page.getByText("You are signed out")).toBeVisible();
  }
  public async navigateToCategoryPage() {
    await this.getMenuLink.click();
    await expect(this.page).toHaveTitle("Custom Order Grid");
  }
  public async navigateToProductPage() {
    await this.getMenuLink.click();
    await this.productLink.click();
    expect(await this.headingText.textContent()).toBe("Men's Aviators");
    await expect(this.page).toHaveTitle("Men's Aviators");
  }
  public async verifyPrice() {
    await this.getMenuLink.click();
    await this.productLink.click();
    expect(await this.price.textContent()).toBeTruthy();
  }

  public async addAndViewCart() {
    await this.addToCart.click();
    await this.shoppingCartLink.click();
  }
  public async verifySuccessMsg() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addToCart.click();
    expect(await this.sucessMessageText.textContent()).toContain(
      "You added Men's Aviators to your shopping cart."
    );
  }
  public async addProductInCart() {
    await this.addToCart.click();
    await this.shoppingCartLink.click();
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
    await this.addAndViewCart();
    await expect(this.page).toHaveTitle("Shopping Cart");
  }
  public async navigateToCheckout() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addAndViewCart();
    await this.proceedToCheckOut.click();
  }
  public async placeOrder() {
    const successMessage = "Thank you for your purchase!";
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addAndViewCart();
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/totals-information") &&
        response.status() === 200
    );
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
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/payment-information") &&
        response.status() === 200
    );
    await expect(this.page).toHaveTitle("Success Page");
  }
  public async placeOrderByMiniCart() {
    await this.getMenuLink.click();
    await this.productItemInfo.hover();
    await this.categoryAddtoCartBtn.click();
    await this.miniCartItem.click();
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
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/payment-information") &&
        response.status() === 200
    );
    await expect(this.page).toHaveTitle("Success Page");
  }
  public async brokenImages() {
    // Use page.locator() to find all img elements
    const imagesLocator = this.page.locator("img");

    // Retrieve all image elements
    const images: Locator[] = await imagesLocator.all();

    const brokenImgs: string[] = [];

    for (const image of images) {
      // Get the image source URL using page.evaluate()
      const imageUrl = await image.evaluate(
        (img) => (img as HTMLImageElement).src
      );

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
  public async productCount() {
    await this.getMenuLink.click();
    const productList = this.page.locator(".products.list.items.product-items");
    await expect(productList.first()).toBeVisible();

    const productCount = await productList.locator("li").count();

    // Assert and log the count
    expect(productCount).toBeGreaterThan(0);
    console.log("Product count:", productCount);
  }
  public async removeCart() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addAndViewCart();
    await this.removeCartBtn.click();
  }
  public async updateCart() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addAndViewCart();
    await this.qtyUpdateTextBox.fill("2");
    await this.updateCartButton.click();
    await this.removeCartBtn.click();
    expect(await this.cartEmptyMessage.textContent()).toContain(
      "You have no items in your shopping cart."
    );
  }
  public async isProductVisibleForAllMenus() {
    await this.page.locator("#ui-id-1 li").first().waitFor();
    const categories = this.page.locator("#ui-id-1 li");
    const count = await categories.count();
    console.log(count);

    for (let i = 0; i < count; i++) {
      await categories.nth(i).click();
      await this.page.locator("li.item.product.product-item").first().waitFor();
      const products = this.page.locator(
        "ol.products.list.items.product-items"
      );
      await expect(products).toBeVisible();
    }
  }
}
function toBeVisible() {
  throw new Error("Function not implemented.");
}
