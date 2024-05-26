//**************************************** Test para v3.42.9 de ghost ****************************************/
require("cypress-xpath");

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
    cy.get("a").contains("General").click();
    cy.screenshot("/v3.42/caso-01/1-settings-01");
    cy.xpath(
      "/html/body/div[2]/div/main/section/div/section/div[2]/div[1]/div[2]/button/span"
    ).click();
    cy.screenshot("/v3.42/caso-01/1-settings-02");
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type("Ghost v3")
      .should("have.value", "Ghost v3");
    cy.wait(3000);
    cy.get("span").contains("Save settings").click();
    cy.get(".mt2").click();
    cy.get("#ember27").click();
  });

  it("Establecer la zona horaria del sitio web", () => {
    cy.get("a").contains("General").click();
    cy.xpath(
      "/html/body/div[2]/div/main/section/div/section/div[2]/div[2]/div[2]/button/span"
    ).click();
    cy.get("select")
      .select("America/Bogota")
      .should("have.value", "America/Bogota")
      .contains("(GMT -5:00) Bogota, Lima, Quito");
    cy.wait(3000);
    cy.get("span").contains("Save settings").click();
    cy.get(".mt2").click();
  });

  it("Establecer el idioma de la publicación", () => {
    cy.get("a").contains("General").click();
    cy.xpath(
      "/html/body/div[2]/div/main/section/div/section/div[2]/div[3]/div[2]/button/span"
    ).click();
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "") // Limpia el campo de texto si hay algún valor previo
      .type("es")
      .should("have.value", "es");
    cy.wait(3000);
    cy.get("span").contains("Save settings").click();
    cy.get(".mt2").click();
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
