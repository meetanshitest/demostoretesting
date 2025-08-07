# Copilot Instructions for demostoretesting (Playwright + TypeScript)

## Project Overview
- This is a Playwright-based end-to-end test automation project using TypeScript and the Page Object Model (POM) pattern.
- Major directories:
  - `pages/`: Page Object classes (e.g., `Assertions/`, `PageObjects/`).
  - `test/`: Test specs using Playwright Test runner.
  - `config/`: Configuration and global setup files.
  - `playwright-report/`, `test-results/`: Output and reporting directories.

## Key Patterns & Conventions
- **Page Object Model (POM):**
  - Each page/component is represented by a class in `pages/PageObjects/`.
  - Assertion helpers and flows are in `pages/Assertions/` (e.g., `m2d1_Assertions.ts`).
  - Page objects extend base classes and use Playwright's `Locator` and `Page` APIs.
- **Test Structure:**
  - Test files in `test/` import assertion/page object classes and use Playwright's `test` and `expect` APIs.
  - Use async/await for all Playwright actions.
- **Data Generation:**
  - Uses `@faker-js/faker` for generating test data (see account creation and checkout flows).
- **Selectors:**
  - Prefer Playwright's `locator()` API for robust element selection.
  - Custom selectors and flows are encapsulated in page object methods.

## Developer Workflows
- **Install dependencies:**
  ```bash
  npm install
  ```
- **Run tests:**
  ```bash
  npx playwright test
  ```
- **View reports:**
  - After test runs, open `playwright-report/index.html` for results.
- **Debugging:**
  - Use Playwright's headed mode: `npx playwright test --headed`
  - Use `test.step()` for granular reporting in complex flows (see `placeOrder()` in `m2d1_Assertions.ts`).

## Integration Points
- **External dependencies:**
  - Playwright, TypeScript, @faker-js/faker.
- **Image/file uploads:**
  - Example: `profileImage.setInputFiles("images/profile.jpg")` in account creation.
- **Custom configuration:**
  - `playwright.config.ts` and files in `config/` control browser/test settings.

## Project-Specific Tips
- Always use the provided page object methods for navigation and assertions—do not duplicate selectors in test specs.
- For new flows, add methods to the relevant page object or assertion class, then call from test specs.
- Use Playwright's built-in `expect` for assertions; avoid mixing with other assertion libraries unless required.
- For debugging broken images or product counts, see utility methods in `m2d1_Assertions.ts` (`brokenImages`, `productCount`).

## Example: Adding a New Test
1. Create a new spec in `test/` (e.g., `test/new-feature.spec.ts`).
2. Import the relevant page object/assertion class.
3. Use async Playwright test blocks and call page object methods for actions/assertions.

---
For questions about unclear flows, custom selectors, or integration, review `README.md` and page object classes in `pages/`.
