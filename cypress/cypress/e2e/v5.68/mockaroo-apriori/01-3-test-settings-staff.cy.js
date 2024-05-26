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

// **************************************** GESTIONAR AUTORES Y COLABORADORES ************************************************

describe("Login y acceder a las configuraciones de ghost: Personas (Staff)", function() {
  let testData;
  let randomIndex;
  let setting;

  beforeEach(function () {
    // Acceder a los datos cargados
    testData = this.testData;
    randomIndex = getRandomIndex(testData.length);
    setting = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio
  });

  it("Envíar una invitación a una nueva persona para que cree una cuenta de personal y seleccionar su rol sin e-mail", function() {

    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.get("span").contains("Invite people").click();
    cy.get("#new-user-email")
    .invoke("val", "");
    cy.get("span").contains("Send invitation now →").click();
    cy.get("p.response").should("contain", "Please enter an email.");
  });

  it("Envíar una invitación a una nueva persona para que cree una cuenta de personal y seleccionar su rol con e-mail válido", function() {
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.get("span").contains("Invite people").click();
    cy.get("#new-user-email")
      .invoke("val", "")
      .type(setting.email)
      .should("have.value", setting.email);
    cy.get("span").contains("Send invitation now →").click();
    cy.wait(2000);
    cy.get("a.close").click();
  });

  it("Envíar una invitación a una nueva persona para que cree una cuenta de personal y seleccionar su rol a usuario ya invitado", function() {
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.get("span").contains("Invite people").click();
    cy.get("#new-user-email")
      .invoke("val", "")
      .type(setting.email)
      .should("have.value", setting.email);
    cy.get("span").contains("Send invitation now →").click();

    // Verificar si el usuario con ese email ya fue invitado
    cy.get("p.response").then(($response) => {
      if (
        $response
          .text()
          .includes("A user with that email address was already invited.")
      ) {
        cy.get("p.response").should("contain", "A user with that email address was already invited.");
        // cy.wait(2000);
        cy.get("a.close").click();
      }
    });
  });

  it("Revocar una invitación a una persona para que cree una cuenta de personal a usuario ya invitado", () => {
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.wait(5000);
    cy.get("a").contains("Revoke").click();
    cy.get("span").should("contain", "Invitation revoked");
  });
});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************
