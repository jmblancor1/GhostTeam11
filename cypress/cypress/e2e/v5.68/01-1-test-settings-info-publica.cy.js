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

// **************************************** INFORMACIÓN GENERAL ************************************************

describe("Login y acceder a las configuraciones de ghost: Información de publicación", () => {
  it("Asignar un título a una publicación web", () => {
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.screenshot("/v5.14/caso-01/1-setting-01");
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type("Grupo # 11")
      .should("have.value", "Grupo # 11");
    cy.wait(3000);
    cy.screenshot("/v5.14/caso-01/1-setting-02");
    cy.get("span").contains("Save").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.screenshot("/v5.14/caso-01/1-setting-03");
    cy.get("#ember23").click();
  });

  it("Establecer la zona horaria del sitio web", () => {
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(2) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.screenshot("/v5.14/caso-01/1-setting-04");
    cy.get("select")
      .select("America/Bogota")
      .should("have.value", "America/Bogota")
      .contains("(GMT -5:00) Bogota, Lima, Quito");
    cy.wait(3000);
    cy.get("span").contains("Save").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(2) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.screenshot("/v5.14/caso-01/1-setting-05");
    cy.get("#ember23").click();
  });

  it("Establecer el idioma de la publicación", () => {
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
      .type("es")
      .should("have.value", "es");
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

function login() {
  cy.visit("/#/signin");
  cy.fixture("login.env.json").then((login) => {
    cy.get("#ember6").type(login.userName);
    cy.get("#ember8").type(login.password);
  });
  cy.get("#ember10 > span").click();
}
