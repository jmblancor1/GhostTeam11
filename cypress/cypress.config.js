const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://ghost-v5-8wq2.onrender.com/ghost",
    // baseUrl: "https://ghost-3.onrender.com/ghost",
    printImage: 'false',
    supportFile: 'cypress/support/commands.js',
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 60000,
    pageLoadTimeout: 120000,

    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
  },
});
