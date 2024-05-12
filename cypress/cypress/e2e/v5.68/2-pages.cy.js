//**************************************** Test para v5.14.1 de ghost ****************************************/

require("cypress-xpath");

beforeEach(() => {
  login();

  Cypress.on("uncaught:exception", (err, runnable) => {
    console.error("Uncaught exception", err);
    return false;
  });
});

// ************************************************************************************************************
// **************************************** START TESTING PAGE ************************************************
// ************************************************************************************************************

// **************************************** NEW PAGE ************************************************

describe("Acceder a la funcionalidad Pages: Crear nueva pagina", () => {
  it("Crear una nueva página con campos completos", () => {
    cy.visit("/#/pages");
    //click boton Pagina
    cy.get("a").contains("Pages").click();
    //click boton Nueva pagina
    cy.get("span").contains("New page").click();
    cy.get('textarea[placeholder="Page title"]')
      .click()
      .type("Giro de Italia 2024");
    cy.get('div[data-placeholder="Begin writing your page..."]').type(
      "Daniel Martínez sorprende en la etapa 2 del Giro de Italia y se mete en el top-3 de la carrera: así va la clasificación general."
    );
    //click boton Publicar
    cy.get("span").contains("Publish").click();
    //Se valida la publicación a compartir
    cy.get("div.green").should("contain", "Ready, set, publish.");
    //click boton Continuar revisión final
    cy.get("span").contains("Continue, final review →").click();
    cy.get("p.gh-publish-confirmation").should("contain", "        Your");
    //click boton publicar pagina ahora mismo
    cy.get("span").contains("Publish page, right now").click();
    //validar que la página ha sido publicada
    cy.get("span").should("contain", "Boom. It’s out there.");
  });

  it("Acceder a la funcionalidad Pages: Eliminar una página", () => {
    cy.visit("/#/pages");
    cy.xpath(
      "/html/body/div[2]/div/main/section/section/div[1]/ol/li[2]"
    ).click();
    cy.xpath("/html/body/div[2]/div/main/button").click();
    cy.xpath(
      "/html/body/div[2]/div/main/div/div/div/div/div[2]/form/button"
    ).click();
    cy.xpath("/html/body/div[5]/div/div").should(
      "contain",
      "Are you sure you want to delete this "
    );
    cy.xpath("/html/body/div[5]/div/div/div[2]/button[2]").click();
    cy.get("h3").should("contain", "About this site");
  });
});

// ************************************************************************************************************
// **************************************** END TESTING PAGE ************************************************
// ************************************************************************************************************

function login() {
  cy.visit("/#/signin");
  cy.fixture("login.env.json").then((login) => {
    cy.get("#ember6").type(login.userName);
    cy.get("#ember8").type(login.password);
  });
  cy.get("#ember10 > span").click();
}
