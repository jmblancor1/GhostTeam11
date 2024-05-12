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
    cy.visit("/#/settings/code-injection");
    cy.get("#ember32").click();
    cy.get("h4").contains("Code injection").click();

    cy.get('#ghost-head > .CodeMirror > .CodeMirror-scroll')
    .click()
    .type("{ctrl+A}{del}")
    .type("Universidad de Los Andes - Ghost");
    cy.get("span").contains("Save").click();
    cy.get("span").should("contain", "Saved");
    cy.get("#ember23").click();
    cy.wait(3000)
  });

  it("Añadir un pie de página a un sitio web", () => {
    cy.visit("/#/settings/code-injection");
    cy.get("#ember32").click();
    cy.get("h4").contains("Code injection").click();
    cy.get('#ghost-foot > .CodeMirror > .CodeMirror-scroll').click()
    .type("{ctrl+A}{del}")
    .type("Colombia - 2024");
    cy.get("span").contains("Save").click();
    cy.get("span").should("contain", "Saved");
    cy.wait(2000);
    cy.get("#ember23").click();
  });
});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************

function login(){
  cy.visit("/#/signin");
  cy.fixture("login.env.json").then((login) => {
    cy.get("#ember6").type(login.userName);
    cy.get("#ember8").type(login.password);
  });
  cy.get("#ember10 > span").click();
}
