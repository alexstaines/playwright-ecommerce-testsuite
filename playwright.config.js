// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

 module.exports = defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,
  expect: {
    timeout: 8000.
  },

  reporter: 'html',
 
  use: {
    headless: true,

    permissions: ['geolocation'],

    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'Chrome',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
  ],

});

