import { faker } from "@faker-js/faker";
import { m2d3_PageObjects } from "../PageObjects/m2d3_PageObjects";
import test, { Locator, Page, expect } from "@playwright/test";

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
    expect(await this.headingText.textContent()).toBe("Apple iPhone X");
    await expect(this.page).toHaveTitle("Apple iPhone X");
  }
  public async addProductInCart() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addToCart.click();
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
  public async verifyLogin() {
    await this.signInLink.click();
    await this.userEmail.fill("bhushan007@yopmail.com");
    await this.password.fill("Admin@123");
    await this.signInBtn.click();
    await this.greetingMsg.waitFor({ state: "visible" });

    //await expect(this.greetingMsg).toHaveText("Welcome, bhushan bhushan!");
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
  
    await test.step('Navigate to product page', async () => {
      await this.getMenuLink.click();
      await this.productLink.click();
    });
  
    await test.step('Add product to cart', async () => {
      await this.addAndViewCart();
      await this.page.waitForResponse(
        (response) =>
          response.url().includes("/totals-information") &&
          response.status() === 200
      );
    });
  
    await test.step('Proceed to checkout', async () => {
      await this.proceedToCheckOut.click();
    });
  
    await test.step('Fill shipping information', async () => {
      await this.email.fill(faker.internet.email());
      await this.fname.fill(faker.person.firstName());
      await this.lname.fill(faker.person.lastName());
      await this.company.fill(faker.company.buzzPhrase());
      await this.streetAddress.fill(faker.location.streetAddress());
      await this.country.selectOption("India");
      await this.state.selectOption("Gujarat");
      await this.city.fill(faker.location.city());
      await this.zip.fill(faker.location.zipCode());
      await this.phone.fill(faker.phone.number());
    });
  
    await test.step('Select shipping method and continue', async () => {
      await this.nextBtn.click();
    });
  
    await test.step('Select payment method and place order', async () => {
      await this.paymentMethod.check();
      await this.placeOrderBtn.click();
      await this.page.waitForResponse(
        (response) =>
          response.url().includes("/payment-information") &&
          response.status() === 200
      );
    });
  
    await test.step('Verify order success page', async () => {
      await expect(this.page).toHaveTitle('Success Page');
    });
  }
  public async placeOrderByMiniCart() {
    await this.getMenuLink.click();
    await this.productItemInfo.hover();
    await this.categoryAddtoCartBtn.click();
    await this.miniCartItem.click();
    await this.page
      .locator("#minicart-content-wrapper")
      .waitFor({ state: "visible", timeout: 1000 });
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
    try {
      const menu = this.page.locator('#ui-id-1[role="menu"]');
      await menu.waitFor({ state: 'visible', timeout: 10000 });
      
      const menuItems = await menu.locator('li.ui-menu-item').all();
      
      console.log(`Found ${menuItems.length} menu items`);
      
      for (const [index, item] of menuItems.entries()) {
          const link = item.locator('a.ui-menu-item-wrapper');
          const title = await item.locator('span').textContent();
          
          console.log(`Item ${index + 1}: ${title}`);
          
          await link.click();
          await this.page.waitForNavigation({ timeout: 5000 });
          await this.page.goBack();
          await menu.waitFor({ state: 'visible' });
      }
      
      console.log('Completed processing all menu items');
  } catch (error) {
      console.error('Error processing menu items:', error);
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
