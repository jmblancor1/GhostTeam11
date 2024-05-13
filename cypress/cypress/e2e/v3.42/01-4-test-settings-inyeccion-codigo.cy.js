//**************************************** Test para v3.42.9 de ghost ****************************************/

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

// **************************************** INYECTAR CODIGO ************************************************

describe("Login y acceder a las configuraciones de ghost: Añadir código a una publicación", () => {
  it("Añadir un encabezado a un sitio web", () => {
    cy.get("a").contains("Code injection").click();
    cy.get('#ghost-head > .CodeMirror > .CodeMirror-scroll')
    .click()
    .type("{ctrl+A}{del}")
    .type("Universidad de Los Andes - Ghost");
    cy.screenshot("/v3.42/caso-04/1-settings-inyeccion-codigo-01");
    cy.get("span").contains("Save").click();
    cy.get("span").should("contain", "Saved");
    cy.wait(3000)
  });

  it("Añadir un pie de página a un sitio web", () => {
    cy.get("a").contains("Code injection").click();
    cy.get('#ghost-foot > .CodeMirror > .CodeMirror-scroll').click()
    .type("{ctrl+A}{del}")
    .type("Colombia - 2024");
    cy.screenshot("/v3.42/caso-04/1-settings-inyeccion-codigo-02");
    cy.get("span").contains("Save").click();
    cy.get("span").should("contain", "Saved");
    cy.wait(2000);
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
