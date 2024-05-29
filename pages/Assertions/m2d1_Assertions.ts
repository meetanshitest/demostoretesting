import { faker } from "@faker-js/faker";
import { m2d1_PageObjects } from "../PageObjects/m2d1_PageObjects.ts";
import { Page, expect } from "@playwright/test";
import { url } from "inspector";

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
      "Minimum Order Amount For Customer Group"
    );
    await expect(this.page).toHaveURL(/.*min-order-amount/);
  }
  public async navigateToProductPage() {
    await this.getMenuLink.click();
    await this.productLink.click();
    expect(await this.headingText.textContent()).toBe("Apple iPhone X");
    await expect(this.page).toHaveTitle("Apple iPhone X");
    await expect(this.page).toHaveURL(/.*apple-iphone-x/);
  }
  public async addAndViewCart() {
    await this.addToCart.click();
    await this.shoppingCartLink.click();
  }
  public async addProductInCart() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addToCart.click();
  }
  public async verifySuccessMsg() {
    await this.addProductInCart();
    expect(await this.sucessMessageText.textContent()).toContain(
      "You added Apple iPhone X to your shopping cart."
    );
  }
  public async verifyPrice() {
    await this.getMenuLink.click();
    await this.productLink.click();
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
    await this.addProductInCart();
    await this.shoppingCartLink.click();
    await expect(this.page).toHaveTitle("Shopping Cart");
  }
  public async navigateToCheckout() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addToCart.click();
    await this.shoppingCartLink.click();
    await expect(this.page).toHaveTitle(/Shopping Cart/);
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
  public async productCount() {
    await this.getMenuLink.click();
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
  public async categoryCount() {
    await this.page.waitForSelector("#ui-id-1 li");

    // Get the length of the list items
    const liElementsLength = await this.page.$$eval(
      "#ui-id-1 li",
      (lis) => lis.length
    );

    if (liElementsLength > 0) {
      console.log(
        "List items length is greater than zero.",
        `${liElementsLength}`
      );
    } else {
      console.log("List items length is not greater than zero.");
    }
    expect(liElementsLength).toBeGreaterThan(5);
    const liTextContents = await this.page.$$eval("#ui-id-1 li", (lis) =>
      lis.map((li) => li.textContent?.trim()).filter(Boolean)
    );
    liTextContents.forEach((textContent) => console.log(textContent));
  }
  public async isProductVisibleForAllMenus() {
    await this.page.locator("#ui-id-1 li").first().waitFor();
    const liTextContents = await this.page.$$eval("#ui-id-1 li", (lis) =>
      lis.map((li) => li.textContent?.trim()).filter(Boolean)
    );
    for (const textContent of liTextContents) {
      console.log("Checking for:", textContent);
      const productDisplayElement = await this.page.$(
        `//*[contains(text(), '${textContent}')]`
      );
      if (productDisplayElement) {
        console.log("Product display found for:", textContent);
        // Click on the product display element
        await productDisplayElement.click();
        console.log("Clicked on product display for:", textContent);
      } else {
        console.log("Product display not found for:", textContent);
        const msg="We can't find products matching the selection."
        expect(await this.warnMessage.textContent()).toBe(msg)
      }
    }
  }
}
