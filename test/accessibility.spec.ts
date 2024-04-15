import { test, expect } from "@playwright/test";
<<<<<<< HEAD
const AxeBuilder = require("@axe-core/playwright");

test.beforeEach(async ({ page }) => {
  await page.goto("http://demo.opencart.com/");
});
test.afterEach(async ({ page }) => {
=======
import AxeBuilder from '@axe-core/playwright';

test('Check for WCAG A and AA violations on BBC website', async ({ page }) => {
  // Navigate to the BBC website
  await page.goto('https://bbc.co.uk');

  // Wait for the page to load with a reasonable timeout (adjust as needed)
  await page.waitForTimeout(5000); // Optional: Adjust wait time based on website complexity

  // Create a new AxeBuilder instance
  // @ts-ignore
  const axe = new AxeBuilder({ page });

  // Analyze the page for WCAG A and AA violations
  const results = await axe.withTags(['wcag2a', 'wcag2aa']).analyze();

  // Check if there are any violations
  if (results.violations.length > 0) {
    console.error('WCAG violations detected:');
    for (const violation of results.violations) {
      console.error(`- ${violation.id}: ${violation.description}`);
    }
    expect(results.violations).toEqual([]); // Fail the test if violations are found
  } else {
    console.log('No WCAG A or AA violations detected.');
  }

  // Close the page (optional, as Playwright often handles closing automatically)
>>>>>>> origin/devtest
  await page.close();
});

test("Detect Accessibility issues in entire page...", async ({ page }) => {
  const scanResutls = await new AxeBuilder({ page }).analyze();
  //Console log the violations
  let violation = scanResutls.violations;
  violation.forEach(function (entry) {
    console.log(
      "Print the Violations:",
      entry.impact + " " + entry.description
    );
  });
  let count = violation.length;
  console.log("List of Violations:", count);
  expect(count).toEqual(5);
});
