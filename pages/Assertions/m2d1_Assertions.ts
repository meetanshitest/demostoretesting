import { faker } from "@faker-js/faker";
import { m2d1_PageObjects } from "../PageObjects/m2d1_PageObjects.ts";
import { Locator, Page, expect } from "@playwright/test";
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
    await this.fillCheckoutForm();
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
    await this.fillCheckoutForm();
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
    const liElementsCount = await this.page.evaluate(
      ".products.list.items.product-items > li",
      (lis: string | any[]) => lis.length
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
    // Wait for the list items to be visible
    await this.page.locator("#ui-id-1 li").first().waitFor({ state: 'attached', timeout: 5000 });
  
    // Use the locator to count the elements directly
    const liElementsLength = await this.page.locator("#ui-id-1 li").count();
  
    if (liElementsLength > 0) {
      console.log("List items length is greater than zero.", liElementsLength);
    } else {
      console.log("List items length is not greater than zero.");
    }
  
    // Optional: Use Playwright's expect if this is part of a test
    expect(liElementsLength).toBeGreaterThan(5);
  
    // Retrieve text content of the list items using the locator API
    const liTextContents = await this.page.locator("#ui-id-1 li").allTextContents();
  
    liTextContents.forEach((textContent) => console.log(textContent));
  }
  
  public async createAccount() {
    await this.createAccountLink.click();
    await this.firstName.fill(`${faker.person.firstName()}`);
    await this.lastName.fill(`${faker.person.lastName()}`);
    //await this.dob.fill(`${faker.date.birthdate()}`);
    await this.gender.selectOption("Male");
    await this.emailId.fill(`${faker.internet.email()}`);
    await this.pwd.fill("Admin@123$");
    await this.confirmPassword.fill("Admin@123$");
    await this.profileImage.setInputFiles("images/profile.jpg");
    await this.location.fill(`${faker.location.buildingNumber()}`);
    await this.bio.fill(`${faker.person.bio()}`);
    await this.createAccountBtn.click();
    expect(await this.page.waitForURL("**/customer/account/"));
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
  public async countNewArrivals() {
    await this.profileLink.click();
    await this.newArrivalBtn.click();
    const divProductCount = await this.page.evaluate(() => {
      return Array.from(document.querySelectorAll(".divProduct")).filter(
        (div) => div instanceof HTMLElement && div.offsetParent !== null
      ).length;
    });
    console.log(divProductCount);
    expect(divProductCount).toBeGreaterThan(0);
  }
  public async countGuestOrdersInProfilePage() {
    await this.profileLink.click();
    await this.orders.click();
    const divOrderCount = await this.page.evaluate(() => {
      return Array.from(document.querySelectorAll(".divOrders")).filter(
        (div) => div instanceof HTMLElement && div.offsetParent !== null
      ).length;
    });
    console.log(divOrderCount);
    expect(divOrderCount).toBeGreaterThan(0);
  }
  public async checkProfileTitle() {
    await this.profileLink.click();
    await expect(this.page).toHaveTitle(/User Profile/);
  }
  public async qtyConditionValidation() {
    await this.getMenuLink.click();
    await this.newProductLink.click();
    await this.addAndViewCart();
    await expect(this.page).toHaveTitle(/Shopping Cart/);
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/totals-information") &&
        response.status() === 200
    );
    await this.proceedToCheckOut.click();
    await expect(
      this.page.getByText("Make the minimum purchase of")
    ).toBeVisible();
  }
  public async checkPaymenMethodVisibility() {
    await this.getMenuLink.click();
    await this.productLink.click();
    await this.addAndViewCart();
    await expect(this.page).toHaveTitle(/Shopping Cart/);
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/totals-information") &&
        response.status() === 200
    );
    await this.proceedToCheckOut.click();
    await this.fillCheckoutForm();
    await this.nextBtn.click();
    await expect(this.page.getByText("Cardsave Hosted Payment")).toBeVisible();
    await expect(this.page.getByText("Cardsave Direct Payments")).toBeVisible();
    await expect(this.page.getByText("Payeezy Credit Card Payment")).toBeVisible();
  }
}
