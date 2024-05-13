//**************************************** Test para v5.14.1 de ghost ****************************************/

beforeEach(() => {
  login();

  Cypress.on("uncaught:exception", (err, runnable) => {
    console.error("Uncaught exception", err);
    return false;
  });
});

// ************************************************************************************************************
// **************************************** INICIO TESTING SETTING ************************************************
// ************************************************************************************************************

// **************************************** EXPORTAR CONTENIDO ************************************************

describe("Login y acceder a las configuraciones de ghost: Laboratorio", () => {
  it("Descargar todas las publicaciones y configuraciones en un único archivo JSON", () => {
    cy.visit("/#/settings/labs");
    cy.get("#ember32").click();
    cy.get("h4").contains("Labs").click();
    cy.get("span").contains("Export").click();
    cy.screenshot("/v5.14/caso-05/5-setting-01");

    cy.wait(3000);
    cy.get("#ember23").click();
  });
});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************

function login() {
  cy.visit("/#/signin");
  cy.fixture("login.env.json").then((login) => {
    cy.get("#ember6").type(login.userName);
    cy.get("#ember8").type(login.password);
  });
  cy.get("#ember10 > span").click();
}
