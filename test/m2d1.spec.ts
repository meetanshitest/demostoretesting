import {test as base,Page} from "@playwright/test";
import { m2d1_Assertions } from "../pages/Assertions/m2d1_Assertions.ts";
import { globalSetup } from "../config/globalSetup.ts";

const test = base.extend<{ page: Page }>({
  page: async ({ page}, use) => {
    const webUrl=process.env.WEB_URL?.split(",")[0];
    if(!webUrl){
      throw new Error("Please provide the web url")
    }
    await page.goto(webUrl);
    await use(page);
  },
})

test.describe("m2d1 test cases", () => {
  test("Verify Category page Heading", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCategoryPage();
  });
  test("Verify Product page Heading", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToProductPage();
  });
  test("Verify Add To Cart Button", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.addProductInCart();
  });
  test("Verify Add To Cart Success Message", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifySuccessMsg();
  });
  test("Check Price is visible or not", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifyPrice();
  });
  test("Check Shopping cart Link", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCart();
  });
  
  test("Check SignIn link", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifySignInLink();
  });
  test("Check Create Account link", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.verifyCreateAccountLink();
  });
  test("Verify Cart Page Title", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCart();
  })
  test("Check Update Cart based on condition", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCheckout();
  });
  test("navigate To Checkout page", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.navigateToCheckout();
  });
  test("Check place order", async ({page}) => {
    const m2d1 = new m2d1_Assertions(page);
    await m2d1.placeOrder();
    await page.waitForTimeout(2000);
  });
});