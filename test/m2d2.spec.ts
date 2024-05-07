import { test as base, expect, Page } from "@playwright/test";
import { m2d2_Assertions } from "../pages/Assertions/m2d2_Assertions.ts";
import { globalSetup } from "../config/globalSetup.ts";

let m2d2: m2d2_Assertions;

const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    const webUrl = process.env.WEB_URL?.split(",")[1];

    if (!webUrl) {
      throw new Error("Please provide the web url");
    }
    await page.goto(webUrl);
    const title = page.title();
    expect(title).not.toContain("error");
    await use(page);
   
  },
});

test.describe("m2d2 test cases", () => {
  
  test.beforeEach(async ({ page }) => {
    m2d2 = new m2d2_Assertions(page);
    await m2d2.loginPage()
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });
  test.only("Verify Category page Heading", async () => {
    await m2d2.navigateToCategoryPage();
    console.log("hello");
  });
  test("Verify Product page Heading", async () => {
    await m2d2.navigateToProductPage();
  });
  test("Verify Add To Cart Button", async () => {
    await m2d2.addProductInCart();
  });
  test("Verify Add To Cart Success Message", async () => {
    await m2d2.verifySuccessMsg();
  });
  test("Check Price is visible or not", async () => {
    await m2d2.verifyPrice();
  });
  test("Check Shopping cart Link", async () => {
    await m2d2.navigateToCart();
  });

  test("Check SignIn link", async () => {
    await m2d2.verifySignInLink();
  });
  test("Check Create Account link", async () => {
    await m2d2.verifyCreateAccountLink();
  });
  test("Verify Cart Page Title", async () => {
    await m2d2.navigateToCart();
  });
  test("Check Update Cart based on condition", async () => {
    await m2d2.navigateToCheckout();
  });
  test("navigate To Checkout page", async () => {
    await m2d2.navigateToCheckout();
  });
  test("Check place order", async () => {
    await m2d2.placeOrder();
  });
  test("Check place Order By MiniCart", async () => {
    await m2d2.placeOrderByMiniCart();
  });
  test("check broken images", async () => {
    await m2d2.brokenImages();
  });
});
