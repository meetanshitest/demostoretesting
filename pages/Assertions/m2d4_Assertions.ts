import { faker } from "@faker-js/faker";
import { m2d4_PageObjects } from "../PageObjects/m2d4_PageObjects";
import { Page, expect } from "@playwright/test";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";

export class m2d4_Assertions extends m2d4_PageObjects {
  [x: string]: any;
  constructor(page: Page) {
    super(page);
  }

  public async navigateToCategoryPage() {
    await this.getMenuLink.click();
    expect(await this.headingText.textContent()).toBe("Payment Methods");
    await expect(this.page).toHaveTitle(/Payment Methods/);
    await expect(this.page).toHaveURL(/.*payment-methods/);
  }
  public async addAndViewCart() {
    await this.addToCart.click();
    await this.shoppingCartLink.click();
  }
  public async navigateToProductPage() {
    await this.getMenuLink.click();
    await this.productLink.click();
    expect(await this.headingText.textContent()).toBe("Apple iPhone X");
    await expect(this.page).toHaveTitle(/Apple iPhone X/); // <-- Added await
    await expect(this.page).toHaveURL(/.*iphone-x/);
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
    expect(await this.price.textContent()).toBe("A$999.00");
  }
  public async verifyLogin() {
    await this.signInLink.click();
    await expect(this.headingText).toHaveText("Customer Login");
    await this.emailInput.fill(process.env.EMAIL || "");
    await this.passwordInput.fill(process.env.PASSWORD || "");
    await this.loginButton.click();

    await this.page.waitForLoadState("domcontentloaded", { timeout: 3000 });

    // Force picking the first matching welcome message
    const welcomeLocator = this.page.locator("li.greet.welcome").first();

    const welcomeText = await welcomeLocator.textContent();
    if (!welcomeText) {
      throw new Error("Welcome message was not found after login.");
    }

    await expect(welcomeLocator).toContainText("Welcome");
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

  public async fillCheckoutForm() {
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
  }
  public async placeOrder() {
    let testPassed = false;

    try {
      await this.getMenuLink.click();
      await this.productLink.click();
      await this.addAndViewCart();
      await this.page.waitForResponse(
        (response) =>
          response.url().includes("/totals-information") &&
          response.status() === 200
      );
      await this.proceedToCheckOut.click();
      await this.fillCheckoutForm();
      await this.nextBtn.click();
      await this.paymentMethod.check();

      await Promise.all([
        this.page.waitForURL("**/checkout/onepage/success/"),
        this.placeOrderBtn.click(),
      ]);

      await expect(this.page).toHaveTitle("Success Page");

      testPassed = true;
    } catch (error: any) {
      console.error("Order placement failed:", error);
      throw error;
    } finally {
      let browserName = "unknown";
      try {
        if (this.page && this.page.context() && this.page.context().browser()) {
          browserName =
            this.page.context().browser()?.browserType().name() || "unknown";
        }
      } catch (e) {
        console.warn("Could not detect browser name.");
      }

      const now = new Date();
      const formattedTime = now.toLocaleString("en-US"); // No GMT / no timezone shown

      const message = `Test Case: **${
        this.constructor.name
      }**\nBrowser: **${browserName}**\nResult: ${
        testPassed ? "✅ Passed" : "❌ Failed"
      }\nTime: ${formattedTime}`;

      await this.sendDiscordNotification(message);
    }
  }
  private async sendDiscordNotification(message: string) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("❗ Discord Webhook URL is missing!");
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      });

      if (!response.ok) {
        console.error(
          `❗ Failed to send Discord notification: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("❗ Error sending Discord notification:", error);
    }
  }

  public async placeOrderByMiniCart() {
    await this.getMenuLink.click();
    await this.productItemInfo.hover();
    await this.categoryAddtoCartBtn.click();
    await this.miniCartItem.click();
    await this.miniCheckout.click();
    await expect(this.page).toHaveTitle("Checkout");
    await this.fillCheckoutForm();
    await this.nextBtn.click();
    await this.paymentMethod.check();

    // Correct way: wait for navigation when placing order
    await Promise.all([
      this.page.waitForURL("**/checkout/onepage/success/"),
      this.placeOrderBtn.click(),
    ]);
    await expect(this.page).toHaveTitle("Success Page");
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
    try {
      // Locate the menu container
      const menu = this.page.locator('#ui-id-1[role="menu"]');
      await menu.waitFor({ state: "visible", timeout: 10000 });

      const menuItems = await menu.locator("li.ui-menu-item").all();
      const totalItems = menuItems.length;

      console.log(`Found ${totalItems} menu items`);

      for (const [index, item] of menuItems.entries()) {
        const link = item.locator("a.ui-menu-item-wrapper");
        const title = await item.locator("span").textContent();

        console.log(`Attempting to click Item ${index + 1}: ${title}`);

        // Force click and wait for any potential changes
        await link.click({ force: true });
        console.log(`Clicked: ${title}`);

        // Check visibility of some related element — adjust selector as needed
        const targetElement = this.page.locator("#toolbar-amount");
        const isVisible = await targetElement.isVisible();

        if (isVisible) {
          const text = await targetElement.textContent();
          console.log(
            `✅ Element is visible after clicking "${title}": ${text?.trim()}`
          );
        } else {
          console.log(`❌ Element NOT visible after clicking "${title}"`);
        }
      }

      console.log(`Completed processing all ${totalItems} menu items`);
    } catch (error) {
      console.error("Error processing menu items:", error);
      throw error;
    }
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
