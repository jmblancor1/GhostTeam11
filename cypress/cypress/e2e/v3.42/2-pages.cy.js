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
// **************************************** START TESTING PAGE ************************************************
// ************************************************************************************************************

describe("Acceder a la funcionalidad Pages", () => {
  // **************************************** NEW PAGE ************************************************

  it("Crear una nueva página con campos completos", () => {
    cy.visit("/#/pages");
    //click boton Pagina
    cy.get("a").contains("Pages").click();
    //click boton Nueva pagina
    cy.get("a").contains("New page").click();
    //Digitar el título de la página
    cy.get('textarea[placeholder="Page Title"]')
      .click()
      .type("Giro de Italia 2024");
    //Digitar el contenido de la página
    cy.get('div[data-placeholder="Begin writing your page..."]').type(
      "Daniel Martínez sorprende en la etapa 2 del Giro de Italia y se mete en el top-3 de la carrera: así va la clasificación general."
    );
    cy.screenshot("/v3.42/caso-06/2-pages-nueva-pagina-01");
    //click boton Publicar
    cy.get("span").contains("Publish").click();
    cy.get("span").contains("Publish").click();
    //Se valida la publicación a compartir
    cy.get("span.gh-notification-title").should("contain", "Published");
    cy.wait(2000);
    cy.visit("/#/pages");
    cy.wait(2000);
  });

  // **************************************** NEW PAGE WITH TITLE ************************************************

  it.only("Crear una página con título superior a 255 caracteres", () => {
    cy.visit("/#/pages");
    //click boton Pagina
    cy.get("a").contains("Pages").click();
    //click boton Nueva pagina
    cy.get("a").contains("New page").click();
    //Digitar el contenido de la página
    cy.get('div[data-placeholder="Begin writing your page..."]').type(
      "En esta etapa 2, los ciclistas colombianos fueron los grandes protagonistas, debido a que la fracción tuvo tres puertos de montaña (dos de tercera y una de primera categoría)."
    );
    cy.screenshot("/v3.42/caso-07/2-pages-titulo-con-mas-01");

    //Digitar el título de la página
    cy.get('textarea[placeholder="Page Title"]')
      .click()
      .invoke("val", "")
      .type(
        "Daniel Martínez sorprende en la etapa 2 del Giro de Italia y se mete en el top-3 de la carrera: así va la clasificación general. Dani Martínez (Bora-Hansgrohe) el que tuvo mejor rendimiento, pues logró un segundo lugar por detrás de Pogacar, llegando a 27 segundos."
      );
    cy.get("span").contains("Publish").click();
    cy.get("span").contains("Publish").click();

    //Validar el mensaje que el titulo no debe ser mayor a 255 caracteres
    cy.get("div").should(
      "contain",
      "Saving failed: Title cannot be longer than 255 characters."
    );

    //Eliminar draft
    cy.visit("/#/pages");

    cy.get("span").contains("Leave").click();

    cy.xpath(
      "/html/body/div[2]/div/main/section/section/ol/li[2]/a[2]"
    ).click();

    cy.get("button.post-settings");
    cy.xpath(
      "/html/body/div[4]/div[1]/div/div/div/div/div[1]/div/div[1]/div[2]/form/button/span"
    ).click();

    cy.get("span").contains("Delete").click();
    cy.wait(2000);
  });

  // **************************************** DELETE PAGE ************************************************

  it("Eliminar una página creada", () => {
    cy.visit("/#/pages");
    cy.xpath("/html/body/div[2]/div/main/section/section/ol/li[2]").click();

    cy.xpath(
      "/html/body/div[2]/div/main/section/header/section/button"
    ).click();

    cy.xpath(
      "/html/body/div[4]/div[1]/div/div/div/div/div[1]/div/div[1]/div[2]/form/button"
    ).click();

    cy.get("h1").should("contain", "Are you sure you want to delete this ");
    cy.screenshot("/v3.42/caso-08/2-pages-eliminar-pagina-01");
    cy.get("button.gh-btn-red > span").contains("Delete").click();
  });
});

// ************************************************************************************************************
// **************************************** END TESTING PAGE ************************************************
// ************************************************************************************************************

function login() {
  cy.visit("/#/signin");
  cy.fixture("login.env.json").then((login) => {
    cy.get("#ember8").type(login.userName);
    cy.get("#ember10").type(login.password);
  });
  cy.get("#ember12 > span").click();
}
