import { test, expect } from "@playwright/test";
import { chromium, Browser, Page } from "playwright";
import { firstDemoCheckout } from "../pages/firstDemoCheckout";

test.describe("First Demo store test cases", () => {
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
    await page.goto("https://meetanshi.in/m2d1/");
  });

  test.afterAll(async () => {
    await browser.close();
  });
test.skip("Verify Category page Heading",async()=>{
  const firstDemo=new firstDemoCheckout(page);
  await firstDemo.navigateToCategoryPage()
})
test.skip("Verify Product page Heading", async () => {
    const firstDemo=new firstDemoCheckout(page);
    await firstDemo.navigateToProductPage();

});
test.skip("Verify Add To Cart Button", async () => {
  const firstDemo=new firstDemoCheckout(page);
  await firstDemo.addProductInCart();
    
});
test.skip("Verify Add To Cart Success Message", async () => {
  const firstDemo=new firstDemoCheckout(page);
  await firstDemo.verifySuccessMsg();
    
});
test.skip('Check Price is visible or not',async()=>{
  const firstDemo=new firstDemoCheckout(page);
  await firstDemo.verifyPrice();
})
test.skip("Check Shopping cart Link",async()=>{
  const firstDemo=new firstDemoCheckout(page);
  await firstDemo.navigateToCart();
})

test.skip('Check SignIn link',async()=>{
  const firstDemo=new firstDemoCheckout(page);
  await firstDemo.verifySignInLink();
})
test.skip('Check Create Account link',async()=>{
  const firstDemo=new firstDemoCheckout(page);
  await firstDemo.verifyCreateAccountLink();
})
test.skip('navigate To Checkout page',async()=>{
  const firstDemo=new firstDemoCheckout(page);
  await firstDemo.navigateToCheckout();
})
test.skip("Check Update Cart based on condition",async()=>{
  const firstDemo=new firstDemoCheckout(page);
  await firstDemo.navigateToCheckout()
})  
test('Check place order',async()=>{
  const firstDemo=new firstDemoCheckout(page);
  await firstDemo.placeOrder();
  await page.waitForTimeout(2000)
})
  
});
