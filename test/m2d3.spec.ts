import { test, expect } from "@playwright/test";
import { chromium, Browser, Page } from "playwright";
import { m2d3_Assertions } from "../pages/Assertions/m2d3_Assertions.ts";


test.describe("Third Demo store test cases", () => {
  let browser: Browser;
  let page: Page;
   
  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless:false

    });
    const context=await browser.newContext({
      recordVideo:{
        dir:"./videos/"
      }
    })

  });

  test.beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://meetanshi.in/m2d3/");
  });

  test.afterAll(async () => {
    await browser.close();
  });
test("Verify Category page Heading",async()=>{
  const firstDemo=new thirdDemoCheckout(page);
  await firstDemo.navigateToCategoryPage()
})
test("Verify Product page Heading", async () => {
    const firstDemo=new thirdDemoCheckout(page);
    await firstDemo.navigateToProductPage();

});
test("Verify Add To Cart Button", async () => {
  const firstDemo=new thirdDemoCheckout(page);
  await firstDemo.addProductInCart();
    
});
test("Verify Add To Cart Success Message", async () => {
  const firstDemo=new thirdDemoCheckout(page);
  await firstDemo.verifySuccessMsg();
    
});
test('Check Price is visible or not',async()=>{
  const firstDemo=new thirdDemoCheckout(page);
  await firstDemo.verifyPrice();
})
test("Check Shopping cart Link",async()=>{
  const firstDemo=new thirdDemoCheckout(page);
  await firstDemo.navigateToCart();
})

test('Check SignIn link',async()=>{
  const firstDemo=new thirdDemoCheckout(page);
  await firstDemo.verifySignInLink();
})
test('Check Create Account link',async()=>{
  const firstDemo=new thirdDemoCheckout(page);
  await firstDemo.verifyCreateAccountLink();
})
test('navigate To Checkout page',async()=>{
  const firstDemo=new thirdDemoCheckout(page);
  await firstDemo.navigateToCheckout();
})
test("Check Update Cart based on condition",async()=>{
  const firstDemo=new thirdDemoCheckout(page);
  await firstDemo.navigateToCheckout()
})  
test('Check place order',async()=>{
  const firstDemo=new thirdDemoCheckout(page);
  await firstDemo.placeOrder();
  await page.waitForTimeout(2000)
})
  
});
