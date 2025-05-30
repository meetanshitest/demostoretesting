import { type Page, type Locator } from "@playwright/test";

export class m2d4_PageObjects {
  protected page: Page;
  readonly getMenuLink: Locator;
  readonly productLink: Locator;
  readonly addToCart: Locator;
  readonly sucessMessageText: Locator;
  readonly headingText: Locator;
  readonly price: Locator;
  readonly ItemLocators: Locator;
  readonly signInLink: Locator;
  readonly createAccountLink: Locator;
  readonly shoppingCartLink: Locator;
  readonly proceedToCheckOut: Locator;
  readonly qtyUpdateTextBox: Locator;
  readonly updateCartButton: Locator;
  readonly errorMsg: Locator;
  readonly email: Locator;
  readonly fname: Locator;
  readonly lname: Locator;
  readonly company: Locator;
  readonly streetAddress: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zip: Locator;
  readonly phone: Locator;
  readonly nextBtn: Locator;
  readonly paymentMethod: Locator;
  readonly placeOrderBtn: Locator;
  readonly sucessOrderMessage: Locator;
  readonly productItemInfo: Locator;
  readonly categoryAddtoCartBtn: Locator;
  readonly miniCartItem: Locator;
  readonly miniCheckout: Locator;
  readonly subtotal: Locator;
  readonly removeCartBtn: Locator;
  readonly cartEmptyMessage: Locator;
  readonly warnMessage: Locator;
  readonly toolbarNumber: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly welcomeMessage: Locator;
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.welcomeMessage = page.locator("span.logged-in");
    this.loginButton = page.getByRole("button", { name: "Sign In" });
    this.toolbarNumber = page.locator("#toolbar-amount .toolbar-number");
    this.getMenuLink = page.getByRole("menuitem", { name: "Payment Methods" });
    this.addToCart = page.locator("//span[normalize-space()='Add to Cart']");
    this.productLink = page.locator('//a[normalize-space()="Apple iPhone X"]');
    this.sucessMessageText = page.locator(
      "//div[@class='message-success success message']"
    );
    this.headingText = page.locator("//span[@class='base']");
    this.price = page.locator("//span[@class='price']");
    this.ItemLocators = page.locator("li>a>span");
    this.signInLink = page.getByRole("link", { name: "Sign In" });
    this.createAccountLink = page.getByRole("link", {
      name: "Create an Account",
    });
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
    this.warnMessage = page.locator(".message info empty");
    this.email = page.getByRole("textbox", { name: "Email Address*" });
    this.fname = page.getByLabel("First Name");
    this.lname = page.getByLabel("Last Name");
    this.company = page.getByLabel("Company");
    this.streetAddress = page.getByLabel("Street Address: Line 1");
    this.country = page.getByLabel("Country");
    this.state = page.locator('select[name="region_id"]');
    this.city = page.getByLabel("City");
    this.zip = page.locator('input[name="postcode"]');
    this.phone = page.getByLabel("Phone Number");
    this.nextBtn = page.getByRole("button", { name: "Next" });
    this.paymentMethod = page.locator("#checkmo");
    this.placeOrderBtn = page.getByRole("button", { name: "Place Order" });
    this.sucessOrderMessage = page
      .locator('[data-ui-id="page-title-wrapper"]')
      .filter({ hasText: "Thank you for your purchase!" });
    this.productItemInfo = page.locator('img[alt="Apple iPhone X"]');
    this.categoryAddtoCartBtn = page
      .locator("#product-item-info_1")
      .getByRole("button", { name: "Add to Cart" });
    this.miniCartItem = page.getByRole("link", { name: " My Cart 1 1 items" });
    this.miniCheckout = page.getByRole("button", {
      name: "Proceed to Checkout",
    });
    this.subtotal = page.locator("span .price");
    this.removeCartBtn = page.locator("//a[@class='action action-delete']");
    this.cartEmptyMessage = page.locator(".cart-empty", {
      hasText: "You have no items in your shopping cart.",
    });
  }
}
