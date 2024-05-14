import { test as base, expect, Page } from "@playwright/test";
import { m2d1_Assertions } from "../pages/Assertions/m2d1_Assertions.ts";
import { globalSetup } from "../config/globalSetup.ts";

const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    const webUrl = process.env.WEB_URL?.split(",")[0];

    if (!webUrl) {
      throw new Error("Please provide the web url");
    }
    await page.goto(webUrl);
    const title = page.title();
    expect(title).not.toContain("error");
    await use(page);
  },
});

test.describe("m2d1 test cases", () => {
  let m2d1: m2d1_Assertions;

  test.beforeEach(async ({ page }) => {
    m2d1 = new m2d1_Assertions(page);
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });
  test("category count",async()=>{
    await m2d1.categoryCount()
  })
  test("Verify Category page Heading", async () => {
    await m2d1.navigateToCategoryPage();
  });
  test("Verify Product page Heading", async () => {
    await m2d1.navigateToProductPage();
  });
  test("Verify Add To Cart Button", async () => {
    await m2d1.addProductInCart();
  });
  test("Verify Add To Cart Success Message", async () => {
    await m2d1.verifySuccessMsg();
  });
  test("Check Price is visible or not", async () => {
    await m2d1.verifyPrice();
  });
  test("Check Shopping cart Link", async () => {
    await m2d1.navigateToCart();
  });

  test("Check SignIn link", async () => {
    await m2d1.verifySignInLink();
  });
  test("Check Create Account link", async () => {
    await m2d1.verifyCreateAccountLink();
  });
  test("Verify Cart Page Title", async () => {
    await m2d1.navigateToCart();
  });
  test("navigate To Checkout page", async () => {
    await m2d1.navigateToCheckout();
  });
  test("Check place order", async () => {
    await m2d1.placeOrder();
  });
  test("Check place Order By MiniCart", async () => {
    await m2d1.placeOrderByMiniCart();
  });
  test("check broken images", async () => {
    await m2d1.brokenImages();
  });
  test("Verify product visibility",async()=>{
    await m2d1.productCount();
  })
  test("update cart",async()=>{
    await m2d1.updateCart();
  })
  test("removeCart",async()=>{
    await m2d1.removeCart();
  })
  test("check products are visible or not for all categories",async()=>{
    await m2d1.isProductVisibleForAllMenus();
  })
  
 
});
