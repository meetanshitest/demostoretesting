import { test, expect } from '@playwright/test';

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
  expect(imgLocators).toHaveLength(6)
  await page.close()


})
test('check logo',async({page})=>{
  await page.goto('https://meetanshi.com')
  const imgLocator= page.locator('img[src=\'https://eadn-wc04-1926448.nxedge.io/cdn/media/logo/stores/1/logo.png\']')
  await expect(imgLocator).toBeVisible()
  await page.close()
})
