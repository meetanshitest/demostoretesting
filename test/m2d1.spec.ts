import { test as base, expect, Page } from "@playwright/test";
import { m2d1_Assertions } from "pages/Assertions/m2d1_Assertions";

const DEFAULT_WEB_URL = "http://default-url.com";
const WEB_URL = process.env.WEB_URL?.split(",")[0] || DEFAULT_WEB_URL;

if (!WEB_URL) {
  throw new Error("Please provide the web URL");
}

const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await page.goto(WEB_URL);
    const title = await page.title();
    expect(title).not.toContain("error");
    await use(page);
  },
});

test.describe("m2d1 test cases", () => {
  let m2d1: m2d1_Assertions;

  test.beforeEach(async ({ page }) => {
    m2d1 = new m2d1_Assertions(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  // Group related tests
  test.describe("Category Tests", () => {
    test("Category count", async () => {
      await m2d1.categoryCount();
    });

    test("Verify Category page Heading", async () => {
      await m2d1.navigateToCategoryPage();
    });
  });

  test.describe("Product Tests", () => {
    test("Verify Product page Heading", async () => {
      await m2d1.navigateToProductPage();
    });

    test("Verify Add To Cart Button", async () => {
      await m2d1.addProductInCart();
    });

    test("Verify Add To Cart Success Message", async () => {
      await m2d1.verifySuccessMsg();
    });

    test("Check Price is visible or not", async () => {
      await m2d1.verifyPrice();
    });

    test("Verify product visibility", async () => {
      await m2d1.productCount();
    });

    test("Check products should be visible for all categories", async () => {
      await m2d1.isProductVisibleForAllMenus();
    });
  });

  test.describe("Cart Tests", () => {
    test("Check Shopping cart Link", async () => {
      await m2d1.navigateToCart();
    });

    test("Verify Cart Page Title", async () => {
      await m2d1.navigateToCart();
    });

    test("Update cart", async () => {
      await m2d1.updateCart();
    });

    test("Remove cart", async () => {
      await m2d1.removeCart();
    });

    test("Check Qty Condition validation", async () => {
      await m2d1.qtyConditionValidation();
    });
  });

  test.describe("Checkout Tests", () => {
    test("Navigate To Checkout page", async () => {
      await m2d1.navigateToCheckout();
    });

    test.only("Check place order", async () => {
      await m2d1.placeOrder();
    });

    test("Check place Order By MiniCart", async () => {
      await m2d1.placeOrderByMiniCart();
    });
  });

  test.describe("Account Tests", () => {
    test("Check SignIn link", async () => {
      await m2d1.verifySignInLink();
    });

    test("Check Create Account link", async () => {
      await m2d1.verifyCreateAccountLink();
    });

    test("Create Account", async () => {
      await m2d1.createAccount();
    });

    test("Count New Arrivals in profile page", async () => {
      await m2d1.countNewArrivals();
    });

    test("Count guest orders in profile page", async () => {
      await m2d1.countGuestOrdersInProfilePage();
    });

    test("Check Profile title", async () => {
      await m2d1.checkProfileTitle();
    });
  });

  test.describe("Miscellaneous Tests", () => {
    test("Check broken images", async () => {
      await m2d1.brokenImages();
    });

    test("Check card save payment method visibility", async () => {
      await m2d1.checkPaymenMethodVisibility();
    });
  });
});
