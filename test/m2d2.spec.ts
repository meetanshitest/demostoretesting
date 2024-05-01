import { test,expect,chromium, Browser, Page } from "@playwright/test";
import { m2d2_Assertions } from "../pages/Assertions/m2d2_Assertions.ts";
import { globalSetup } from "../config/globalSetup.ts";

test.describe("Second Demo store test cases", () => {
  let browser: Browser;
  let page: Page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });
  test.beforeEach(async () => {
    const webUrl=process.env.WEB_URL?.split(",") as unknown as string;
    page = await browser.newPage();
    await page.goto(webUrl[1]);
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test("Verify Category page Heading", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.navigateToCategoryPage();
  });
  test("Verify Product page Heading", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.navigateToProductPage();
  });
  test("Verify Add To Cart Button", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.addProductInCart();
  });
  test("Verify Add To Cart Success Message", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.verifySuccessMsg();
  });
  test("Check Price is visible or not", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.verifyPrice();
  });
  test("Check Shopping cart Link", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.navigateToCart();
  });

  test("Check SignIn link", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.verifySignInLink();
  });
  test("Check Create Account link", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.verifyCreateAccountLink();
  });
  test("navigate To Checkout page", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.navigateToCheckout();
  });
  test("Check Update Cart based on condition", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.navigateToCheckout();
  });
  test("Check place order", async () => {
    const m2d2 = new m2d2_Assertions(page);
    await m2d2.placeOrder();
    await page.waitForTimeout(2000);
  });
});
