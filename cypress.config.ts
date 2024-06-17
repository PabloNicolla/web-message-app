import { defineConfig } from "cypress";
require("dotenv").config();

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:3000`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    email_test: process.env.EMAIL_TEST,
    email_password: process.env.EMAIL_PASSWORD,
  },
});
