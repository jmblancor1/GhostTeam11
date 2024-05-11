const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    //baseUrl: "https://ghost-grupo-11.onrender.com/ghost"
    screenshotsFolder: 'cypress/screenshots',
    baseUrl: "https://ghost-v5-8wq2.onrender.com/ghost",
    supportFile: 'cypress/support/commands.js',
    videosFolder: 'cypress/videos',
    supportFile: 'cypress/support/commands.js',
    viewportWidth: 1280,
    viewportHeight: 800,

    // baseUrl: "https://ghost-v5-8wq2.onrender.com/ghost",
    baseUrl: "https://ghost-3.onrender.com/ghost",


    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
