import { test,expect,chromium,Browser,Page } from "@playwright/test";
import { m2d1_Assertions } from "../pages/Assertions/m2d1_Assertions.ts";
import {globalSetup} from "../config/globalSetup.ts"

test.describe("m2d1 test cases", () => {  
  let browser: Browser;
  let page: Page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });
  
  test.beforeEach(async () => {
    const webUrl=process.env.WEB_URL?.split(",") as unknown as string;
    page = await browser.newPage();
    await page.goto(webUrl[0]);
  });
  test.afterAll(async () => {
    await browser.close();
  });

  test("Verify Category page Heading", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCategoryPage();
  });
  test("Verify Product page Heading", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToProductPage();
  });
  test("Verify Add To Cart Button", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.addProductInCart();
  });
  test("Verify Add To Cart Success Message", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifySuccessMsg();
  });
  test("Check Price is visible or not", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifyPrice();
  });
  test("Check Shopping cart Link", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCart();
  });

  test("Check SignIn link", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifySignInLink();
  });
  test("Check Create Account link", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifyCreateAccountLink();
  });
  test("Verify Cart Page Title",async()=>{
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCart();
  })
  test("Check Update Cart based on condition", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCheckout();
  });
  test("navigate To Checkout page", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCheckout();
  });
  test("Check place order", async () => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.placeOrder();
    await page.waitForTimeout(2000);
  });
});
