//**************************************** Test para v5.14.1 de ghost ****************************************/

beforeEach(function () {
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

// **************************************** INYECTAR CODIGO ************************************************

describe("Login y acceder a las configuraciones de ghost: Añadir código a una publicación", function() {
  let testData;
  let randomIndex;
  let setting;

  beforeEach(function () {
    // Acceder a los datos cargados
    testData = this.testData;
    randomIndex = getRandomIndex(testData.length);
    setting = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio
  });
  it("Añadir un encabezado a un sitio web", function() {
    cy.visit("/#/settings/code-injection");
    cy.get("#ember32").click();
    cy.get("h4").contains("Code injection").click();

    cy.get("#ghost-head > .CodeMirror > .CodeMirror-scroll")
      .click()
      .type("{ctrl+A}{del}")
      .type(setting.header);
    cy.get("span").contains("Save").click();
    cy.get("span").should("contain", "Saved");
    cy.get("#ember23").click();

  });

  it("Añadir un pie de página a un sitio web", () => {
    cy.visit("/#/settings/code-injection");
    cy.get("#ember32").click();
    cy.get("h4").contains("Code injection").click();
    cy.get("#ghost-foot > .CodeMirror > .CodeMirror-scroll")
      .click()
      .type("{ctrl+A}{del}")
      .type(setting.footer);
    cy.get("span").contains("Save").click();
    cy.get("span").should("contain", "Saved");
    cy.get("#ember23").click();
  });
});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************
