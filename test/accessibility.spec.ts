import { test, expect } from "@playwright/test";
const AxeBuilder = require("@axe-core/playwright");

test.beforeEach(async ({ page }) => {
  await page.goto("http://demo.opencart.com/");
});
test.afterEach(async ({ page }) => {
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
