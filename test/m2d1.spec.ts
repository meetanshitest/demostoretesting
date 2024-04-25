import { test, expect,chromium,Browser,Page } from "@playwright/test";
import { firstDemoCheckout } from "../pages/m2d1_Assertions.ts";
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
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.navigateToCategoryPage();
    
  });
  test.skip("Verify Product page Heading", async () => {
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.navigateToProductPage();
  });
  test.skip("Verify Add To Cart Button", async () => {
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.addProductInCart();
  });
  test.skip("Verify Add To Cart Success Message", async () => {
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.verifySuccessMsg();
  });
  test.skip("Check Price is visible or not", async () => {
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.verifyPrice();
  });
  test.skip("Check Shopping cart Link", async () => {
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.navigateToCart();
  });

  test.skip("Check SignIn link", async () => {
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.verifySignInLink();
  });
  test.skip("Check Create Account link", async () => {
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.verifyCreateAccountLink();
  });
  test.skip("navigate To Checkout page", async () => {
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.navigateToCheckout();
  });
  test.skip("Check Update Cart based on condition", async () => {
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.navigateToCheckout();
  });
  test.skip("Check place order", async () => {
    const firstDemo = new firstDemoCheckout(page);
    await firstDemo.placeOrder();
    await page.waitForTimeout(2000);
  });
});
