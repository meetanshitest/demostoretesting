![Logo](https://eadn-wc04-1926448.nxedge.io/cdn/media/logo/stores/1/logo.png)


# Automate Test cases using Page Object Model (POM) Strategy with Playwright TypeScript

## Introduction

This repository demonstrates the implementation of the Page Object Model (POM) design pattern using Playwright and TypeScript. POM is a popular design pattern in test automation that helps in maintaining scalable, robust, and easy-to-maintain automated test suites.

In this project, we utilize Playwright, a modern end-to-end testing library for web applications, and TypeScript, a statically typed superset of JavaScript, to implement the POM pattern.

## Features

- Structured test automation framework using Page Object Model.
- Test scripts written in TypeScript for type safety and better code organization.
- Utilizes Playwright for browser automation, providing cross-browser support.
- Easy to maintain and scale with clear separation of concerns between tests and page elements.
- Includes sample tests demonstrating common scenarios for web application testing.

## Getting Started 

## Pre Requirement Before installing playwright:

To get started with this project, follow these steps:

1. Install Node js latest stable Version.
   
2. Install VS Code Editor

3. Set Up and install git in your local

4. Install Node Package Manager using CLI.
   

# Playwright Intro

Playwright is a powerful end-to-end testing library for web applications developed by Microsoft. It allows you to automate interactions with web pages across multiple browsers, including Chromium, Firefox, and WebKit. This guide outlines the steps to install Playwright for your test automation projects.

# Playwright Installation Steps

## Installation Steps

Follow these steps to install Playwright:

### Step 1: Create a project in your local directory

If you haven't already set up a Node.js project, you can create a new one by running the following command in your terminal:

```bash
mkdir my-project
cd my-project
npm init -y
```

### Step 2: Install Playwright latest version your local directory:

```bash
npm init playwright@latest
```

### Step 3: Set Up Configuration (Optional)

Create a configuration file (e.g. playwright.config.ts) in your project directory if you need to customize Playwright's behavior. You can use this file to specify browser options, test environment configurations, and more.

### Step 4: Write Your First Test

Now that Playwright is installed, you can start writing your first test scripts using your preferred testing framework (e.g., Jest, Mocha, Jasmine). Import Playwright's API functions to interact with browsers and web pages in your tests.


## Project Structure

The project structure follows the Page Object Model (POM) design pattern:

- /tests: Contains test scripts written using Playwright and TypeScript.
  
- /pages: Contains Page Object classes representing web pages or components.

Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


## Tech Stack

Core Technologies:

1. Node.js: Playwright requires Node.js (version 14.18.0 or later) as its runtime environment. Node.js provides the foundation for running Playwright scripts and interacting with various libraries.

2. TypeScript: While Playwright supports JavaScript, using TypeScript offers strong typing and improved code maintainability. TypeScript enhances developer experience with features like type checking and code completion.
Playwright Library:

3.Playwright: The core library of Playwright provides a unified API for interacting with Chromium, Firefox, and WebKit browsers. It allows you to:

1. Launch browsers
2. Navigate to web pages
3. Interact with web page elements
4. Capture screenshots
5. Run tests in a headless or headed mode
6. Additional Tools (Optional):

    6.1. Testing Frameworks: Playwright works well with various testing frameworks like Jest, Mocha, or Jasmine for organizing your tests and providing assertions.

    6.2. Page Object Model (POM): POM is a design pattern for structuring your test code to represent web page components and their interactions. This improves code readability and reusability when testing web applications.

<!--- 3. Axe Builder (Accessibility Testing): The @axe-core/playwright library (Axe Builder) integrates with Playwright for automated accessibility testing. It helps you analyze web pages for WCAG (Web Content Accessibility Guidelines) compliance.
-->
Overall, the tech stack for Playwright TypeScript consists of Node.js (runtime), TypeScript (language), Playwright (core library), and optionally, testing frameworks, POM patterns<!---, and Axe Builder for accessibility testing-->.

## Additional Considerations:

You may need additional Node.js packages depending on your specific testing needs, such as assertion libraries (e.g., chai) or mocking libraries (e.g., sinon).

Consider using a test runner like Playwright Test (official test runner) or other test runners with Playwright support for managing test execution and reporting.

Explore browser-specific tools (e.g., Chrome DevTools) for debugging during test development.