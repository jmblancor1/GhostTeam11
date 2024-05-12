const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://ghost-v5-8wq2.onrender.com/ghost",
    //baseUrl: "https://ghost-3.onrender.com/ghost",

    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
  },
});
