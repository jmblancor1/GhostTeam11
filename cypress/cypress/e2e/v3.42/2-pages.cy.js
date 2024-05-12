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
    cy.screenshot('/v3.42/caso06/1-accessPages');
    //click boton Nueva pagina
    cy.get("a").contains("New page").click();
    //Digitar el título de la página
    cy.screenshot('/v3.42/caso06/2-accessNewPage');
    cy.get('textarea[placeholder="Page Title"]')
      .click()
      .type("Giro de Italia 2024");
    cy.screenshot('/v3.42/caso06/3-accessPagesTittle');
    //Digitar el contenido de la página
    cy.get('div[data-placeholder="Begin writing your page..."]').type(
      "Daniel Martínez sorprende en la etapa 2 del Giro de Italia y se mete en el top-3 de la carrera: así va la clasificación general."
    );
    cy.screenshot('/v3.42/caso06/4-accessPagesDescription');
    //click boton Publicar
    cy.get("span").contains("Publish").click();
    cy.screenshot('/v3.42/caso06/5-accessPagesDescription');
    cy.get("span").contains("Publish").click();
    //Se valida la publicación a compartir
    cy.screenshot('/v3.42/caso06/6-accessButtonPublish');
    cy.get("span.gh-notification-title").should("contain", "Published");
    cy.wait(2000);
    cy.screenshot('/v3.42/caso06/7-accessButtonPublish1');
    cy.visit("/#/pages");
    cy.wait(2000);
    cy.screenshot('/v3.42/caso06/8-listPages');
  });

  // **************************************** NEW PAGE WITH TITLE ************************************************

  it("Crear una página con título superior a 255 caracteres", () => {
    cy.visit("/#/pages");
    //click boton Pagina
    cy.get("a").contains("Pages").click();
    cy.screenshot('/v3.42/caso07/1-accessPages');
    //click boton Nueva pagina
    cy.get("a").contains("New page").click();
    //Digitar el contenido de la página
    cy.screenshot('/v3.42/caso07/2-accessNewPages');
    cy.get('div[data-placeholder="Begin writing your page..."]').type(
      "En esta etapa 2, los ciclistas colombianos fueron los grandes protagonistas, debido a que la fracción tuvo tres puertos de montaña (dos de tercera y una de primera categoría)."
    );
    //Digitar el título de la página
    cy.screenshot('/v3.42/caso07/3-accessNewPageTitte');
    cy.get('textarea[placeholder="Page Title"]')
      .click()
      .invoke("val", "")
      .type(
        "Daniel Martínez sorprende en la etapa 2 del Giro de Italia y se mete en el top-3 de la carrera: así va la clasificación general. Dani Martínez (Bora-Hansgrohe) el que tuvo mejor rendimiento, pues logró un segundo lugar por detrás de Pogacar, llegando a 27 segundos."
      );
    cy.screenshot('/v3.42/caso07/4-NewPageDescrition');  
    cy.get("span").contains("Publish").click();
    cy.screenshot('/v3.42/caso07/5-accessButtonPublish');
    cy.get("span").contains("Publish").click();
    cy.screenshot('/v3.42/caso07/6-accessButtonPublish1');
    //Validar el mensaje que el titulo no debe ser mayor a 255 caracteres
    cy.get("div").should(
      "contain",
      "Saving failed: Title cannot be longer than 255 characters."
    );
    cy.screenshot('/v3.42/caso07/7-errorMessage');
    //Eliminar draft
    cy.visit("/#/pages");
    cy.screenshot('/v3.42/caso07/8-accessListPages');
    cy.get("span").contains("Leave").click();
    cy.screenshot('/v3.42/caso07/9-accessLeave');
    cy.xpath(
      "/html/body/div[2]/div/main/section/section/ol/li[2]/a[2]"
    ).click();
    cy.screenshot('/v3.42/caso07/10-accessSection');
    cy.get("button.post-settings");
    cy.xpath(
      "/html/body/div[4]/div[1]/div/div/div/div/div[1]/div/div[1]/div[2]/form/button/span"
    ).click();
    cy.screenshot('/v3.42/caso07/11-accessSettings');
    cy.get("span").contains("Delete").click();
    cy.wait(2000);
    cy.screenshot('/v3.42/caso07/11-accessListPages1');
    // cy.visit("/#/pages");
  });

  // **************************************** DELETE PAGE ************************************************

  it("Eliminar una página creada", () => {
    cy.visit("/#/pages");
    cy.screenshot('/v3.42/caso08/1-accessPages');
    cy.xpath("/html/body/div[2]/div/main/section/section/ol/li[2]").click();
    cy.screenshot('/v3.42/caso08/2-accessSection');
    cy.xpath(
      "/html/body/div[2]/div/main/section/header/section/button"
    ).click();
    cy.screenshot('/v3.42/caso08/3-accessSection1');
    cy.xpath(
      "/html/body/div[4]/div[1]/div/div/div/div/div[1]/div/div[1]/div[2]/form/button"
    ).click();
    cy.screenshot('/v3.42/caso08/4-accessSection2');
    cy.get("h1").should("contain", "Are you sure you want to delete this ");
    cy.screenshot('/v3.42/caso08/5-accessMessageDelete');
    cy.get("button.gh-btn-red > span").contains("Delete").click();
    cy.screenshot('/v3.42/caso08/6-comfirmDelete');
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
