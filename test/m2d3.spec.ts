import { test as base, expect, Page } from "@playwright/test";
import { m2d3_Assertions } from "../pages/Assertions/m2d3_Assertions.ts";
import { globalSetup } from "../config/globalSetup.ts";

const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    const webUrl = process.env.WEB_URL?.split(",")[2];
    if (!webUrl) {
      throw new Error("Please provide the web url");
    }
    await page.goto(webUrl);
    const title = page.title();
    expect(title).not.toContain("error");
    await use(page);
  },
  
});

test.describe("m2d3 test cases", () => {
 
   let m2d3: m2d3_Assertions;

  test.beforeEach(async ({ page }) => {
   
    m2d3 = new m2d3_Assertions(page);
    
  });
  test.afterEach(async ({ page }) => {
     await page.close();
  });
  test("Verify Category page Heading", async () => {
    await m2d3.navigateToCategoryPage();
  });
  test("Verify Product page Heading", async () => {
    await m2d3.navigateToProductPage();
  });
  test("Verify Add To Cart Button", async () => {
    await m2d3.verifySuccessMsg();
  });
  test("Check Price is visible or not", async () => {
    await m2d3.verifyPrice();
  });
  test("Check Shopping cart Link", async () => {
    await m2d3.navigateToCart();
  });

  test("Check SignIn link", async () => {
    await m2d3.verifySignInLink();
  });
  test("Check Create Account link", async () => {
    await m2d3.verifyCreateAccountLink();
  });
  test("Verify Cart Page Title", async () => {
    await m2d3.navigateToCart();
  });
  test("navigate To Checkout page", async () => {
    await m2d3.navigateToCheckout();
  });
  test("Check place order", async () => {
    await m2d3.placeOrder();
  });
  test.only("Check place Order By MiniCart", async () => {
    await m2d3.placeOrderByMiniCart();
  });
  test("check broken images", async () => {
    await m2d3.brokenImages();
  });
  test("Verify product visibility", async () => {
    await m2d3.productCount();
  });
  test("update cart", async () => {
    await m2d3.updateCart();
  });
  test("removeCart", async () => {
    await m2d3.removeCart();
  });
  test("check products should visible for all categories", async () => {
    await m2d3.isProductVisibleForAllMenus();
  });
});
