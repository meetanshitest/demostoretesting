import { test, expect } from "@playwright/test";
import { chromium, Browser, Page } from "playwright";
import { firstDemoCheckout } from "../pages/firstdemoCheckout";

test.describe("Place Order Functionality", () => {
  let browser: Browser;
  let page: Page;
   
  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://meetanshi.in/m2d1/");
  });

  test.afterAll(async () => {
    await browser.close();
  });
test("Verify Category page Heading",async()=>{
  const navigate=new firstDemoCheckout(page);
  await navigate.navigateToCategoryPage()
})
test("Verify Product page Heading", async () => {
    const navigate=new firstDemoCheckout(page);
    await navigate.navigateToProductPage();

});
test("Verify Add To Cart Button", async () => {
  const navigate=new firstDemoCheckout(page);
  await navigate.addProductInCart();
    
});
test("Verify Add To Cart Success Message", async () => {
  const navigate=new firstDemoCheckout(page);
  await navigate.verifySuccessMsg();
    
});
test('Check Price is visible or not',async()=>{
  const navigate=new firstDemoCheckout(page);
  await navigate.verifyPrice()
})
  
  
});
