//**************************************** Test para v3.42.9 de ghost ****************************************/

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
    cy.get("a").contains("Labs").click();

    //**************************************** Test para v3.42.9 de ghost ****************************************/
    cy.get("span").contains("Export").click();
    //**************************************** Test para v3.42.9 de ghost ****************************************/
    cy.screenshot("/v3.42/caso-05/1-settings-exportar-json-01");

    cy.wait(3000);
  });
});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************

function login() {
  cy.visit("/#/signin");
  cy.fixture("login.env.json").then((login) => {
    cy.get("#ember8").type(login.userName);
    cy.get("#ember10").type(login.password);
  });
  cy.get("#ember12 > span").click();
}
