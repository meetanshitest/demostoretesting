//globalSetup.ts
const { FullConfig } = require("@playwright/test");
import dotenv from 'dotenv';

export async function globalSetup(config: any) {
    dotenv.config({
      path: '.env',
      override: true
    });
  }
  
  module.exports = globalSetup;