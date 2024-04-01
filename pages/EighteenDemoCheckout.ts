import { expect, Selectors, type Locator, type Page } from "@playwright/test";
import { log } from "console";
import { faker } from "@faker-js/faker";

export class eighteenDemoCheckout {
  page: Page;
  getMenuLink: Locator;
  productLink: Locator;
  addToCart: Locator;
  sucessMessageText: Locator;
  headingText: Locator;
  price: Locator;
  menuItem: Locator;
  ItemLocators: Locator;
  signInLink: Locator;
  createAccountLink: Locator;
  shoppingCartLink: Locator;
  proceedToCheckOut: Locator;
  qtyUpdateTextBox: Locator;
  updateCartButton: Locator;
  errorMsg: Locator;
  email: Locator;
  fname: Locator;
  lname: Locator;
  company: Locator;
  streetAddress: Locator;
  country: Locator;
  state: Locator;
  city: Locator;
  zip: Locator;
  phone: Locator;
  nextBtn: Locator;
  paymentMethod: Locator;
  placeOrderBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getMenuLink = page.locator('//a[@id="ui-id-3"]//span[contains(text(),"Minimum Order Amount For Customer Group")]');
    this.addToCart = page.locator("#product-addtocart-button");
    this.productLink = page.locator('//a[normalize-space()="Apple iPhone X"]');
    this.sucessMessageText = page.locator(
      "//a[normalize-space()='shopping cart']"
    );
    this.headingText = page.locator("//span[@class='base']");
    this.price = page.locator("//span[@class='price']");
    this.ItemLocators = page.locator("li>a>span");
    this.signInLink = page.getByText("Sign In");
    this.createAccountLink = page.getByText("Create an Account");
    this.shoppingCartLink = page.getByRole("link", { name: "Shopping Cart" });
    this.proceedToCheckOut = page.getByRole("button", {
      name: "Proceed to Checkout",
    });
    this.qtyUpdateTextBox = page.getByRole("spinbutton", { name: "Qty" });
    this.updateCartButton = page.locator(
      "//span[normalize-space()='Update Shopping Cart']"
    );
    this.errorMsg = page.locator(
      "//div[@data-bind='html: $parent.prepareMessageForHtml(message.text)']"
    );
    this.email = page.locator("#customer-email");
    this.fname = page.locator('input[name="firstname"]');
    this.lname = page.locator('input[name="lastname"]');
    this.company = page.locator('input[name="company"]');
    this.streetAddress = page.locator('input[name="street[0]"]');
    this.country = page.getByLabel("Country");
    this.state = page.locator('select[name="region_id"]');
    this.city = page.getByLabel("City");
    this.zip = page.locator('input[name="postcode"]');
    this.phone = page.getByLabel("Phone Number");
    this.nextBtn = page.getByRole("button", { name: "Next" });
    this.paymentMethod = page.locator("#checkmo");
    this.placeOrderBtn = page.getByRole('button',{name:'Place Order'})
   
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
