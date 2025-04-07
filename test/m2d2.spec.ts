import { Page, test as base, expect } from "@playwright/test";
import { m2d2_Assertions } from "../pages/Assertions/m2d2_Assertions.ts";

const DEFAULT_WEB_URL = "http://default-url.com";
const WEB_URL = process.env.WEB_URL?.split(",")[1] || DEFAULT_WEB_URL;

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

test.describe("m2d2 test cases", () => {
  let m2d2: m2d2_Assertions;

  test.beforeEach(async ({ page }) => {
    m2d2 = new m2d2_Assertions(page);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  // Group related tests
  test.describe("Category Tests", () => {
    test("Verify Category page Heading", async () => {
      await m2d2.navigateToCategoryPage();
    });
  });

  test.describe("Product Tests", () => {
    test("Verify Product page Heading", async () => {
      await m2d2.navigateToProductPage();
    });

    test("Verify Success Message", async () => {
      await m2d2.verifySuccessMsg();
    });

    test("Check Price is visible or not", async () => {
      await m2d2.verifyPrice();
    });

    test("Verify product visibility", async () => {
      await m2d2.productCount();
    });

    test("Check products should be visible for all categories", async () => {
      await m2d2.isProductVisibleForAllMenus();
    });
  });

  test.describe("Cart Tests", () => {
    test("Check Shopping cart Link", async () => {
      await m2d2.navigateToCart();
    });

    test("Verify Cart Page Title", async () => {
      await m2d2.navigateToCart();
    });

    test("Update cart", async () => {
      await m2d2.updateCart();
    });

    test("Remove cart", async () => {
      await m2d2.removeCart();
    });
  });

  test.describe("Checkout Tests", () => {
    test("Navigate To Checkout page", async () => {
      await m2d2.navigateToCheckout();
    });

    test("Check place order", async () => {
      await m2d2.placeOrder();
    });

    test("Check place Order By MiniCart", async () => {
      await m2d2.placeOrderByMiniCart();
    });
  });

  test.describe("Account Tests", () => {
    test("Check login greeting message", async () => {
      await m2d2.verifyGreetingMsg();
    });

    test("Check Create Account link", async () => {
      await m2d2.verifyCreateAccountLink();
    });

    test("Verify SignOut Link", async () => {
      await m2d2.verifySignOutLink();
    });
  });

  test.describe("Miscellaneous Tests", () => {
    test("Check broken images", async () => {
      await m2d2.brokenImages();
    });
  });
});
