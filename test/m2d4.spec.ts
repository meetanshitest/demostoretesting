import { test as base, expect, Page } from "@playwright/test";
import { m2d4_Assertions } from "../pages/Assertions/m2d4_Assertions";

const DEFAULT_WEB_URL = "http://default-url.com";
const WEB_URL = process.env.WEB_URL?.split(",")[3] || DEFAULT_WEB_URL;

if (!WEB_URL) {
  throw new Error("Please provide the web URL in environment variables");
}

const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await page.goto(WEB_URL);
    const title = await page.title();
    expect(title).not.toContain("error");
    await use(page);
  },
});

test.describe("m2d4 E-commerce Test Suite", () => {
  let m2d4: m2d4_Assertions;

  test.beforeEach(async ({ page }) => {
    m2d4 = new m2d4_Assertions(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test.describe("Category and Product Tests", () => {
    test("should display correct category page heading", async () => {
      await m2d4.navigateToCategoryPage();
    });

    test("should display correct product page heading", async () => {
      await m2d4.navigateToProductPage();
    });

    test("should show product price", async () => {
      await m2d4.verifyPrice();
    });

    test("should verify product visibility in all categories", async () => {
      await m2d4.isProductVisibleForAllMenus();
    });

    test("should verify product count is visible", async () => {
      await m2d4.productCount();
    });
  });

  test.describe("Shopping Cart Tests", () => {
    test("should add product to cart successfully", async () => {
      await m2d4.verifySuccessMsg();
    });

    test("should navigate to shopping cart", async () => {
      await m2d4.navigateToCart();
    });

    test("should update cart quantity", async () => {
      await m2d4.updateCart();
    });

    test("should remove item from cart", async () => {
      await m2d4.removeCart();
    });
  });

  test.describe("Checkout Tests", () => {
    
    test("should complete order placement", async () => {
      await m2d4.placeOrder();
    });

    test.only("should place order through mini cart", async () => {
      await m2d4.placeOrderByMiniCart();
    });
  });

  test.describe("Account Management Tests", () => {
    test("should verify sign-in link", async () => {
      await m2d4.verifySignInLink();
    });

    test("should verify create account link", async () => {
      await m2d4.verifyCreateAccountLink();
    });

    test("should verify login functionality", async () => {
      await m2d4.verifyLogin();
    });
  });

  test.describe("UI Tests", () => {
    test("should not have any broken images", async () => {
      await m2d4.brokenImages();
    });
    
  });
});
