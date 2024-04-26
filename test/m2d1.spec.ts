import { test, expect,chromium,Browser,Page } from "@playwright/test";
import { m2d1_Assertions } from "../pages/Assertions/m2d1_Assertions.ts";
import {globalSetup} from "../config/globalSetup.ts"

test.describe("First Demo store test cases", () => {  
  let browser: Browser;
  let page: Page;

  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,  
    });
    
  });

  test.beforeEach(async () => {
    const webUrl=process.env.WEB_URL?.split(",") as unknown as string;
    page = await browser.newPage();
    await page.goto(webUrl[0]);
  });

  test.afterAll(async () => {
    await page.waitForTimeout(1000);
    await browser.close();
  });
  test.only("Verify Category page Heading", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCategoryPage();
    
  });
  test.skip("Verify Product page Heading", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToProductPage();
  });
  test.skip("Verify Add To Cart Button", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.addProductInCart();
  });
  test.skip("Verify Add To Cart Success Message", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifySuccessMsg();
  });
  test.skip("Check Price is visible or not", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifyPrice();
  });
  test.skip("Check Shopping cart Link", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCart();
  });

  test.skip("Check SignIn link", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifySignInLink();
  });
  test.skip("Check Create Account link", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifyCreateAccountLink();
  });
  test.skip("navigate To Checkout page", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCheckout();
  });
  test.skip("Check Update Cart based on condition", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCheckout();
  });
  test.skip("Check place order", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.placeOrder();
    await page.waitForTimeout(2000);
  });
});
