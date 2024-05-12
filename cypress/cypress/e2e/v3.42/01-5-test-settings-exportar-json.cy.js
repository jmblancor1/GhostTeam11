beforeEach(() => {

  login();

  Cypress.on('uncaught:exception', (err, runnable) => {
    console.error('Uncaught exception', err);
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

    cy.get("span").contains("Export").click()

      cy.wait(3000);
  });

});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************

function login(){
  cy.visit("/#/signin");
  cy.fixture("login.env.json").then((login) => {
    cy.get("#ember8").type(login.userName);
    cy.get("#ember10").type(login.password);
  });
  cy.get("#ember12 > span").click();
}
