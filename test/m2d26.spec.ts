import { test as base, expect, Page } from "@playwright/test";
import { m2d26_Assertions } from "../pages/Assertions/m2d26_Assertions";
import axios from "axios";

const DEFAULT_WEB_URL = "http://default-url.com";
const WEB_URL = process.env.WEB_URL?.split(",")[25] || DEFAULT_WEB_URL;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

if (!WEB_URL) {
  throw new Error("Please provide the web URL in environment variables");
}

const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await page.goto(WEB_URL);
    const title = await page.title();
    expect(title).not.toContain("error");
    await use(page);
  },
});
// async function sendDiscordNotification(message: string) {
//   if (!DISCORD_WEBHOOK_URL) {
//     console.error("❗ Discord Webhook URL is missing!");
//     return;
//   }
//   try {
//     const response = await fetch(DISCORD_WEBHOOK_URL.trim(), {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content: message }),
//     });
//     if (!response.ok) {
//       console.error(
//         `❗ Failed to send Discord notification: ${response.status} ${response.statusText}`
//       );
//     }
//   } catch (error) {
//     console.error("❗ Error sending Discord notification:", error);
//   }
// }

test.describe("m2d26 E-commerce Test Suite", () => {
  let m2d26: m2d26_Assertions;

  test.beforeEach(async ({ page }) => {
    m2d26 = new m2d26_Assertions(page);
  });

  test.afterEach(async ({ browserName }, testInfo) => {
    if (!DISCORD_WEBHOOK_URL) return;
  
    const status = testInfo.status;
    const emoji = status === "passed" ? "✅" : "❌";
    const color = status === "passed" ? 3066993 : 15158332;
    const title = `${emoji} ${testInfo.title}`;
    const duration = (testInfo.duration / 1000).toFixed(2);
  
    await axios.post(DISCORD_WEBHOOK_URL, {
      embeds: [
        {
          title,
          description: `**Result**: ${status?.toUpperCase()}\n**Browser**: ${browserName}\n**Duration**: ${duration}s`,
          color,
          timestamp: new Date().toISOString(),
        },
      ],
    });
  })
  test.describe("Category and Product Tests", () => {
    test("should display correct category page heading", async () => {
      await m2d26.navigateToCategoryPage();
    });
    test("should not show product price", async () => {
      await m2d26.verifyHidePrice();
    });

    test("should verify product visibility in all categories", async () => {
      await m2d26.isProductVisibleForAllMenus();
    });

    test("should verify product count is visible", async () => {
      await m2d26.productCount();
    });
  });

  test.describe("Shopping Cart Tests", () => {
    test("should add product to cart successfully", async () => {
      await m2d26.verifySuccessMsg();
    });

    test("should navigate to shopping cart", async () => {
      await m2d26.navigateToCart();
    });

    test("should update cart", async () => {
      await m2d26.updateCart();
    });

    test("should remove item from cart", async () => {
      await m2d26.removeCart();
    });
  });

  test.describe.only("Checkout Tests", () => {
    test("should navigate to checkout page", async () => {
      await m2d26.navigateToCheckout();
    });

    test.only("should complete order placement", async () => {
      await m2d26.placeOrder();
    });
  });

  test.describe("Account Management Tests", () => {
    test("verify sign-in link", async () => {
      await m2d26.verifySignInLink();
    });

    test("verify create account functionality", async () => {
      await m2d26.verifyCreateAccount();
    });

    test("verify login functionality", async () => {
      await m2d26.verifyLogin();
    });
  });

  test.describe("UI Tests", () => {
    test("should not have any broken images", async () => {
      await m2d26.brokenImages();
    });
    test("should verify total savings message", async () => {
      await m2d26.verifyTotalSavingMsg();
    });
  });
});
