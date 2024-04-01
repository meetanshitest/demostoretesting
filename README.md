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
