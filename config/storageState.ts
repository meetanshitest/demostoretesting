import { test as base, expect, Page } from "@playwright/test";
import path from "path";
import { promises as fs } from "fs";

const test = base.extend<{ page: Page }>({
  page: async ({ browser }, use) => {
    const webUrl = process.env.WEB_URL?.split(",")[1];

    if (!webUrl) {
      throw new Error("Please provide the web url");
    }

    // Resolve the path to auth.json
    const storageStatePath = path.resolve(__dirname, "auth.json");

    // Ensure the file exists
    try {
      const context = await browser.newContext({ storageState: "auth.json" });
      const page = await context.newPage();
      await page.goto(webUrl);
      const storageState = await page.context().storageState();
      await fs.writeFile("auth.json", JSON.stringify(storageState));

      const title = await page.title();
      expect(title).not.toContain("error");

      await use(page);
      await context.close();
    } catch (error) {
      throw new Error(
        `Error reading storage state from ${storageStatePath}: ${error.message}`
      );
    }
  },
});

export { test, expect };
