//**************************************** Test para v5.14.1 de ghost ****************************************/

beforeEach(function() {
  Cypress.on("uncaught:exception", (err, runnable) => {
    console.error("Uncaught exception", err);
    return false;
  });

  // Acceder a los datos cargados desde el archivo JSON en fixtures
  cy.fixture("login_data.json").then(function (login) {
    this.loginData = login; // Guardar los datos en memoria en el contexto de 'this' para acceso durante las pruebas
  });

  // Inicia sesión usando los datos cargados
  cy.fixture("login_data.json").then((login) => {
    loginUser(login[0]); // Acceder al primer conjunto de datos
  });

  // Acceder a los datos cargados desde el archivo JSON en fixtures
  cy.fixture("setting_data.json").then(function (setting) {
    this.testData = setting; // Guardar los datos en memoria en el contexto de 'this' para acceso durante las pruebas
  });
});

// Función para obtener un índice aleatorio
function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}


function loginUser(login) {
  cy.visit("/#/signin");
  // Loguear al usuario
  cy.get("#ember6").type(login.email_address);
  cy.get("#ember8").type(login.password);
  cy.get("#ember10 > span").click();
}


// ************************************************************************************************************
// **************************************** INICIO TESTING SETTING ************************************************
// ************************************************************************************************************

// **************************************** INFORMACIÓN GENERAL ************************************************

describe("Login y acceder a las configuraciones de ghost: Información de publicación", function() {
  it("Asignar un título y una descripción a una publicación web", function() {
    // Acceder a los datos cargados
    const testData = this.testData;

    const randomIndex = getRandomIndex(testData.length);
    const setting = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get(':nth-child(1) > input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type(setting.title);
    cy.get(':nth-child(2) > input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type(setting.description);
    cy.wait(3000);
    cy.get("span").contains("Save").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get("#ember23").click();
  });

  it("Establecer el idioma de la publicación", function() {
    // Acceder a los datos cargados
    const testData = this.testData;
    const randomIndex = getRandomIndex(testData.length);
    const setting = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(3) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.screenshot("/v5.14/caso-01/1-setting-06");
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "") // Limpia el campo de texto si hay algún valor previo
      .type(setting.country);
    cy.wait(3000);
    cy.get("span").contains("Save").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(3) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get("#ember23").click();
  });

});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************


