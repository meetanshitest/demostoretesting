import { type Page, type Locator } from "@playwright/test";

export class m2d3_PageObjects {
  protected page: Page;
  readonly getMenuLink: Locator;
  readonly productLink: Locator;
  readonly addToCart: Locator;
  readonly sucessMessageText: Locator;
  readonly headingText: Locator;
  readonly price: Locator;
  readonly menuItem: Locator;
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
  readonly subtotal: Locator;
  readonly removeCartBtn: Locator;
  readonly cartEmptyMessage: Locator;
  readonly productItemInfo: Locator;
  readonly categoryAddtoCartBtn:Locator;
  readonly miniCartItem: Locator;
  readonly miniCheckout: Locator;
  readonly userEmail: Locator;
  readonly password:Locator;
  readonly greetingMsg:Locator;
  readonly signInBtn:Locator;

  constructor(page: Page) {
    this.page = page;
    this.getMenuLink = page.getByRole("menuitem",{name:"Guest To Customer"})
    this.addToCart = page.getByRole("button",{name:"Add to Cart"})
    this.productLink = page.getByRole("link",{name:"Messanger Bag"}).first();
    this.sucessMessageText = page.locator(
      "//div[@class='message-success success message']"
    );
    this.greetingMsg=page.locator('span.logged-in').first();
    this.signInBtn=page.locator('#send2');
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
    this.email = page.locator("#customer-email");
    this.userEmail=page.locator('#email');
    this.password=page.locator('#pass')
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
    this.subtotal = page.locator("span .price");
    this.removeCartBtn = page.locator("//a[@class='action action-delete']");
    this.cartEmptyMessage = page.locator(".cart-empty", {
      hasText: "You have no items in your shopping cart.",
    });
    this.productItemInfo= page.locator("#product-item-info_1");
    this.categoryAddtoCartBtn = page
    .locator("#product-item-info_1")
    .getByRole("button", { name: "Add to Cart" });
    this.miniCartItem = page.getByRole("link", { name: " My Cart 1 1 items" });
    this.miniCheckout=page.locator("#top-cart-btn-checkout");
  }
  
}
