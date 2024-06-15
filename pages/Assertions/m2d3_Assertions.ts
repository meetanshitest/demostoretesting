import { faker } from "@faker-js/faker";
import { m2d3_PageObjects } from "../PageObjects/m2d3_PageObjects.ts";
import { Page, expect } from "@playwright/test";

export class m2d3_Assertions extends m2d3_PageObjects {
  [x: string]: any;
  constructor(page: Page) {
    super(page);
  }

  public async navigateToCategoryPage() {
    await this.getMenuLink.click();
    expect(await this.headingText.textContent()).toBe("Guest to Customer");
    await expect(this.page).toHaveTitle(/Guest to Customer/);
    await expect(this.page).toHaveURL(/.*guest-to-customer/);
  }

  public async navigateToProductPage() {
    await this.getMenuLink.click();
    await this.productLink.click();
    expect(await this.headingText.textContent()).toBe("Messanger Bag");
    await expect(this.page).toHaveTitle("Messanger Bag");
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
      "You added Messanger Bag to your shopping cart."
    );
  }
  public async verifyPrice() {
    await this.getMenuLink.click();
    await this.productLink.click();
    expect(await this.price.textContent()).toBe("$49.00");
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
    await this.navigateToCart();
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
    await this.page.waitForTimeout(3000);
    await expect(this.page).toHaveTitle("Checkout");

    await this.email.fill(`${faker.internet.email()}`);
    await this.fname.fill(`${faker.person.firstName()}`);
    await this.lname.fill(`${faker.person.lastName()}`);
    await this.company.fill(`${faker.company.buzzPhrase()}`);
    await this.streetAddress.fill(`${faker.location.streetAddress()}`);
    await this.country.selectOption("India");
    await this.state.selectOption("Gujarat");
    await this.city.fill(`${faker.location.city}`);
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
    await this.page.waitForTimeout(5000)
    await expect(this.page).toHaveTitle("Success Page");
  }
  public async placeOrderByMiniCart() {
    await this.getMenuLink.click();
    await this.productItemInfo.hover();
    await this.categoryAddtoCartBtn.click();
    await this.miniCartItem.click();
    await this.page.locator("#minicart-content-wrapper").waitFor({state:'visible',timeout:1000})
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
    //await this.page.waitForTimeout(3000);
    await expect(this.page).toHaveTitle("Success Page",{ timeout: 10000 });
  }
  public async brokenImages() {
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
  public async productCount() {
    await this.getMenuLink.click();
    await this.page
      .locator(".products.list.items.product-items")
      .first()
      .waitFor();

    const liElementsCount = await this.page.$$eval(
      ".products.list.items.product-items > li",
      (lis) => lis.length
    );
    expect(liElementsCount).toBeGreaterThan(0);
    console.log(liElementsCount);
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
