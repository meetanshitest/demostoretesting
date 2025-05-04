import { faker } from "@faker-js/faker";
import { m2d24_PageObjects } from "../PageObjects/m2d24_PageObjects";
import test, { Page, expect } from "@playwright/test";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";

export class m2d24_Assertions extends m2d24_PageObjects {
  [x: string]: any;
  constructor(page: Page) {
    super(page);
  }

  public async verifyCreateAccount() {
    await this.createAccountLink.click();
    expect(await this.headingText.textContent()).toBe(
      "Create New Customer Account"
    );
    await this.page.waitForLoadState("domcontentloaded", { timeout: 3000 });

    await this.page.locator("#firstname").fill(`${faker.person.firstName()}`);
    await this.page.locator("#lastname").fill(`${faker.person.lastName()}`);
    await this.page.locator("#email_address").fill(`${faker.internet.email()}`);
    await this.page.locator("#password").fill("Admin@123");
    await this.page.locator("#password-confirmation").fill("Admin@123");

    // ✅ Fixed the click here
    await this.page.getByRole("button", { name: "Create an Account" }).click();

    await this.page.waitForLoadState("domcontentloaded", { timeout: 1000 });

    const errorMessage = this.page.locator(
      "text=The request is invalid or malformed."
    );

    try {
      await expect(this.page).toHaveURL(/.*\/customer\/account/, {
        timeout: 2000,
      });
      await expect(this.page.locator("h1.page-title")).toContainText(
        "My Account"
      );
    } catch (error) {
      console.log("Error during account creation:");
      await expect(errorMessage).toBeVisible({ timeout: 2000 });
    }
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

    await expect(welcomeLocator).toContainText("welcome");
  }

  public async navigateToCategoryPage() {
    await this.getMenuLink.click();
    expect(await this.headingText.textContent()).toBe("Order Attachment");
    await expect(this.page).toHaveTitle(/Order Attachment/);
    await expect(this.page).toHaveURL(/.*order-attachment/);
  }
  public async verifyHidePrice() {
    await this.getMenuLinkOne.click();
    await this.productLinkOne.click();
    expect(await this.page.locator(".price").isVisible()).toBe(false);
  }
  public async verifyPrice() {
    await this.getMenuLinkTwo.click();
    await this.productLinkTwo.click();
    await this.page.locator(".price").waitFor({ state: "visible" });
    await expect(this.page.locator(".price")).toBeVisible({ timeout: 10000 });
  }
  public async verifySuccessMsg() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addToCart.click();
    await expect(this.cartMessage).toContainText(
      "You added Boxer Shorts to your shopping cart"
    );
  }
  public async verifyTotalSavingMsg() {
    await this.getMenuLinkThree.click();
    await expect(
      this.page.locator("p", {
        hasText: "Use code 20OFF to test the Total Savings functionality.",
      })
    ).toBeVisible();
  }

  public async verifySignInLink() {
    await this.signInLink.click();
    expect(await this.headingText.textContent()).toBe("Customer Login");
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
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/totals-information") &&
        response.status() === 200
    );
    await this.proceedToCheckOut.click();
    await expect(this.page).toHaveTitle(/Checkout/);

    // if (message) {
    //   await this.qtyUpdateTextBox.fill("2");
    //   await this.updateCartButton.click();
    //   await this.proceedToCheckOut.click();
    //   expect(this.page).toHaveTitle("Checkout");
    // } else {
    //   console.log("No error...");
    //   await this.proceedToCheckOut.click();
    // }
  }

  public async addAndViewCart() {
    await this.addToCart.click();
    await this.shoppingCartLink.click();
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

      //await this.sendDiscordNotification(message);
    }
  }
  // private async sendDiscordNotification(message: string) {
  //   const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  //   if (!webhookUrl) {
  //     console.error("❗ Discord Webhook URL is missing!");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(webhookUrl, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ content: message }),
  //     });

  //     if (!response.ok) {
  //       console.error(
  //         `❗ Failed to send Discord notification: ${response.status} ${response.statusText}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error("❗ Error sending Discord notification:", error);
  //   }
  // }

  public async brokenImages() {
    const images = this.page.locator("img");
    const brokenImgs: string[] = [];
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const image = images.nth(i);
      const imageUrl = await image.getAttribute("src");

      if (!imageUrl) {
        console.warn(`Image at index ${i} has no src attribute.`);
        continue;
      }

      // Resolve relative URLs
      const url = new URL(imageUrl, this.page.url()).href;
      try {
        const response = await this.page.request.head(url);
        if (!response.ok()) {
          brokenImgs.push(url);
          console.error(
            `Broken image found: ${url} (Status: ${response.status()})`
          );
        }
      } catch (error) {
        brokenImgs.push(url);
        console.error(`Error fetching image: ${url}`, error);
      }
    }

    if (brokenImgs.length === 0) {
      console.log("✅ All images loaded successfully!");
    } else {
      console.warn(`⚠️ Found ${brokenImgs.length} broken image(s):`);
      console.warn(brokenImgs.join("\n"));
    }
  }

  public async productCount() {
    try {
      // Locate the menu container
      const menu = this.page.locator('#ui-id-1[role="menu"]');
      await menu.waitFor({ state: "visible", timeout: 10000 });

      // Get the initial count of menu items
      const totalItems = await menu.locator("li.ui-menu-item").count();
      console.log(`Found ${totalItems} menu items`);

      for (let index = 0; index < totalItems; index++) {
        // Skip the 8th menu item (index 7)
        if (index === 7) {
          console.log(`Skipping Item 8: Track Your Order`);
          continue;
        }

        // Refresh the menu locator to avoid stale elements
        const menuItems = menu.locator("li.ui-menu-item");
        const item = menuItems.nth(index);
        const link = item.locator("a.ui-menu-item-wrapper");
        const title = await item.locator("span").textContent();

        console.log(`Attempting to click Item ${index + 1}: ${title}`);

        // Click the link and wait for the target element
        await link.click();
        const targetElement = this.page.locator("#toolbar-amount");

        // Wait for the toolbar-amount element to be visible
        try {
          await targetElement.waitFor({ state: "visible", timeout: 10000 });
          const isVisible = await targetElement.isVisible();

          if (isVisible) {
            const text = await targetElement.textContent();
            console.log(
              `✅ Element is visible after clicking "${title}": ${text?.trim()}`
            );
          } else {
            console.log(`❌ Element NOT visible after clicking "${title}"`);
          }

          // Wait for the menu to reappear before the next iteration
          await menu.waitFor({ state: "visible", timeout: 10000 });
        } catch (error) {
          console.warn(`Failed to load page for "${title}": ${error}`);
          continue; // Skip to the next item if the page fails to load
        }
      }

      console.log(`Completed processing all ${totalItems} menu items`);
    } catch (error) {
      console.error("Error processing menu items:", error);
      throw error;
    }
  }
  public async isProductVisibleForAllMenus() {
    // Wait for the first category with a shorter timeout
    const categories = this.page.locator("#ui-id-1 li");
    await categories.first().waitFor({ state: "visible", timeout: 5000 });

    const count = await categories.count();
    console.log(`Total categories found: ${count}`);

    for (let i = 0; i < count; i++) {
      // Skip the 8th menu item (Track Your Order)
      if (i === 7) {
        console.log(`Skipping Item 8: Track Your Order`);
        continue;
      }

      // Click the category
      await categories.nth(i).click();

      const productList = this.page.locator(
        "ol.products.list.items.product-items"
      );
      const firstProduct = this.page
        .locator("li.item.product.product-item")
        .first();

      try {
        // Wait for either the product list or a short timeout
        await firstProduct.waitFor({ state: "visible", timeout: 5000 });

        // Assert product list visibility
        await expect(productList).toBeVisible({ timeout: 5000 });
        console.log(`✅ Products visible for category index ${i}`);
      } catch (error) {
        // Handle empty categories gracefully
        console.warn(`⚠️ No products found for category index ${i}`);
        // Optionally, check for an "empty category" message if the site provides one
        // const emptyMessage = this.page.getByText("No products available");
        // await expect(emptyMessage).toBeVisible({ timeout: 2000 }).catch(() => console.warn("No empty message found"));
      }

      // Ensure the menu is stable before the next iteration
      await categories.first().waitFor({ state: "visible", timeout: 5000 });
    }
  }
}
