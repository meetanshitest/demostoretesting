import { type Page, type Locator } from "@playwright/test";

export class m2d2_PageObjects {
  protected page: Page;
  readonly getMenuLink: Locator;
  readonly productLink: Locator;
  readonly addToCart: Locator;
  readonly sucessMessageText: Locator;
  readonly headingText: Locator;
  readonly price: Locator;
  readonly menuItem!: Locator;
  readonly ItemLocators!: Locator;
  readonly signOutLink: Locator;
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
  readonly sucessOrder!: Locator;
  readonly sucessOrderMessage: Locator;
  readonly productItemInfo: Locator;
  readonly categoryAddtoCartBtn: Locator;
  readonly miniCartItem: Locator;
  readonly miniCheckout: Locator;
  readonly subtotal: Locator;
  readonly removeCartBtn: Locator;
  readonly cartEmptyMessage: Locator;
  readonly switchLink: Locator;
  readonly signinLink:Locator;
  readonly password: Locator;
  readonly loginEmail: Locator;
  readonly submitBtn: Locator;
  readonly greetingMsg: Locator;
  readonly signOutLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getMenuLink = page.getByRole("menuitem",{name:"Custom Order Grid"});
    this.addToCart = page.getByRole("button", { name: "Add to Cart" });
    this.productLink = page.getByText("Men's Aviators");
    this.sucessMessageText = page.locator(
      "//div[@class='message-success success message']"
    );
    this.headingText = page.locator("//span[@class='base']");
    this.price = page.locator("//span[@class='price']");
    this.switchLink = page.locator('button.action.switch')
    this.signOutLink = page.getByRole('link', { name: 'Sign Out' })
    this.createAccountLink = page.getByRole("link", {
      name: "Create an Account",
    });
    this.shoppingCartLink = page.getByRole("link", { name: "shopping Cart" });
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
    this.email = page.locator("//input[@id='customer-email']");
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
    this.placeOrderBtn = page.getByRole("button", { name: "Place Order" });
    this.sucessOrderMessage = page
      .locator('[data-ui-id="page-title-wrapper"]')
      .filter({ hasText: "Thank you for your purchase!" });
    this.productItemInfo = page.locator("#product-item-info_9");
    this.categoryAddtoCartBtn = page
      .locator("#product-item-info_9")
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
    this.signinLink=page.locator("//div[@class='panel header']//a[contains(text(),'Sign In')]")
    this.loginEmail=page.locator("#email")
    this.password=page.locator("#pass")
    this.submitBtn=page.getByRole("button",{name:"Sign In"})
    this.greetingMsg=page.locator("span.logged-in").first()
    this.signOutLocator=page.getByText('You are signed out');
  }
}
