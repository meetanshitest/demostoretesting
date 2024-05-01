import { test, expect } from "@playwright/test";
import { chromium, Browser, Page } from "playwright";
import { m2d3_Assertions } from "../pages/Assertions/m2d3_Assertions.ts";

test.describe("Third Demo store test cases", () => {
  let browser: Browser;
  let page: Page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.beforeEach(async () => {
    const webUrl = process.env.WEB_URL?.split(",") as unknown as string;
    page = await browser.newPage();
    await page.goto(webUrl[2]);
  });
  test.afterAll(async () => {
    await browser.close();
  });

  test("Verify Category page Heading", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.navigateToCategoryPage();
  });
  test("Verify Product page Heading", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.navigateToProductPage();
  });
  test("Verify Add To Cart Button", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.addProductInCart();
  });
  test("Verify Add To Cart Success Message", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.verifySuccessMsg();
  });
  test("Check Price is visible or not", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.verifyPrice();
  });
  test("Check Shopping cart Link", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.navigateToCart();
  });

  test("Check SignIn link", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.verifySignInLink();
  });
  test("Check Create Account link", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.verifyCreateAccountLink();
  });
  test("navigate To Checkout page", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.navigateToCheckout();
  });
  test("Check Update Cart based on condition", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.navigateToCheckout();
  });
  test("Check place order", async () => {
    const m2d3 = new m2d3_Assertions(page);
    await m2d3.placeOrder();
    await page.waitForTimeout(2000);
  });
});
