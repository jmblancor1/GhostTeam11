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

// **************************************** METADATOS ************************************************

describe("Login y acceder a las configuraciones de ghost: Metadatos ", function() {

  it("Asignar un título como metadato (Contenido extra para motores de búsqueda)", function() {
    // Acceder a los datos cargados
    const testData = this.testData;
    const randomIndex = getRandomIndex(testData.length);
    const setting = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(2) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get(':nth-child(1) > input[type="text"]')
      .invoke("val", "")
      .type(setting.title)
    cy.get('textarea[id="metaDescription"]')
      .invoke("val", "")
      .type(setting.description);
    cy.wait(3000);
    cy.get("span").contains("Save").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get("#ember23").click();
  });

  it("Personalizar los datos estructurados de un sitio para Twitter", function() {
    // Acceder a los datos cargados
    const testData = this.testData;
    const randomIndex = getRandomIndex(testData.length);
    const setting = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(2) > .gh-expandable > :nth-child(2) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get('input[type="text"]')
    .invoke("val", "")
    .type(setting.title);
    cy.get('textarea[id="twitterDescription"]')
      .invoke("val", "")
      .type(setting.description);
    cy.get("span").contains("Save").click();
    cy.get('input[type="text"]')
      .should("have.value", setting.title);
    cy.get('textarea[id="twitterDescription"]')
      .should("have.value", setting.description);
  });

  it("Personalizar los datos estructurados de tu sitio para Facebook", function() {
    // Acceder a los datos cargados
    const testData = this.testData;
    const randomIndex = getRandomIndex(testData.length);
    const setting = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(2) > .gh-expandable > :nth-child(3) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get('input[type="text"]')
      .invoke("val", "")
      .type(setting.title)
    cy.get('textarea[id="ogDescription"]')
      .invoke("val", "")
      .type(setting.description);
    cy.get("span").contains("Save").click();
      cy.get('input[type="text"]')
        .should("have.value", setting.title);
    cy.get("span").contains("Save").click();
    cy.get('input[type="text"]').should("have.value", setting.title);
    cy.get('textarea[id="ogDescription"]').should("have.value", setting.description);
  });

  it("Vincular cuentas redes sociales con datos incorrectos", function() {
    // Acceder a los datos cargados
    const testData = this.testData;
    const randomIndex = getRandomIndex(testData.length);
    const setting = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(2) > .gh-expandable > :nth-child(4) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get('input[type="url"]')
      .eq(0)
      .invoke("val", "")
      .type(setting.urlInvalid);
    cy.get('input[type="url"]')
      .eq(1)
      .invoke("val", "")
      .type("https://twitter.com/")
      .type(setting.character);
    cy.get('input[type="url"]')
      .eq(1)
      .should("have.value", "https://twitter.com/%&)$#&?@~!");

    cy.get("span")
      .contains("Save").click();
    cy.get(".response")
      .eq(0)
      .should("contain","The URL must be in a format like https://www.facebook.com/yourPage");
    cy.get(".response")
      .eq(1)
      .should("contain", "Your Username is not a valid Twitter Username");
  });

  it("Vincular cuentas redes sociales con datos correctos", function() {
    // Acceder a los datos cargados
    const testData = this.testData;
    const randomIndex = getRandomIndex(testData.length);
    const setting = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio
    const expectedValueFacebook = "https://www.facebook.com/" + setting.socialmedia;
    const expectedValueTiwtter = "https://twitter.com/" + setting.socialmedia;
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(2) > .gh-expandable > :nth-child(4) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get('input[type="url"]')
      .eq(0)
      .invoke("val", "")
      .type(setting.socialmedia)
    cy.get('input[type="url"]')
      .eq(1)
      .invoke("val", "")
      .type(setting.socialmedia);
    cy.get("span").contains("Save").click();
    cy.get('input[type="url"]')
      .eq(0)
      .should("have.value", expectedValueFacebook);
    cy.get('input[type="url"]')
      .eq(1)
      .should("have.value", expectedValueTiwtter);
  });
});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************