import { test, expect,Locator } from '@playwright/test';
import { count } from 'console';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Iterate Images',async({page})=>{
     await page.goto('https://meetanshi.com/shopify-apps.html')
    const imgLocators=await page.$$('img.product-image-photo')
    for(const imgLocator of imgLocators ){
       const imgAltText=await imgLocator.getAttribute('alt') 
       console.log(imgAltText);
    }
    await expect(imgLocators).toHaveLength(6)
    await page.close()
    
    
})
