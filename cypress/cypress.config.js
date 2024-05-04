const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://ghost-grupo-11.onrender.com/ghost/#/signin",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
