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


describe("Acceder a la funcionalidad Pages", () => {

  // **************************************** NEW PAGE ************************************************

  it("Crear una nueva página con campos completos", () => {
    cy.visit("/#/pages");
    //click boton Pagina
    cy.get("a").contains("Pages").click();
    cy.screenshot('/v5.68/caso06/1-accessPages');
    //click boton Nueva pagina
    cy.get("span").contains("New page").click();
    cy.screenshot('/v5.68/caso06/2-accessNewPage');
    cy.get('textarea[placeholder="Page title"]')
      .click()
      .type("Giro de Italia 2024");
      cy.screenshot('/v5.68/caso06/3-accessNewPageTittle');  
    cy.get('div[data-placeholder="Begin writing your page..."]').type(
      "Daniel Martínez sorprende en la etapa 2 del Giro de Italia y se mete en el top-3 de la carrera: así va la clasificación general."
    );
    cy.screenshot('/v5.68/caso06/4-accessNewPageDescription');
    //click boton Publicar
    cy.get("span").contains("Publish").click();
    cy.screenshot('/v5.68/caso06/5-accessNewPagePublish');
    //Se valida la publicación a compartir
    cy.get("div.green").should("contain", "Ready, set, publish.");
    cy.screenshot('/v5.68/caso06/6-accessNewPagePublish');
    //click boton Continuar revisión final
    cy.get("span").contains("Continue, final review →").click();
    cy.screenshot('/v5.68/caso06/8-buttoncontinue');
    cy.get("p.gh-publish-confirmation").should("contain", "        Your");
    //click boton publicar pagina ahora mismo
    cy.screenshot('/v5.68/caso06/9-buttonpublish');
    
    cy.get("span").contains("Publish page, right now").click();
    cy.screenshot('/v5.68/caso06/10-sbuttonRight');
    //validar que la página ha sido publicada
    cy.get("span").should("contain", "Boom. It’s out there.");
    cy.screenshot('/v5.68/caso06/11-sucessMessage');
    cy.wait(2000);
    cy.visit("/#/pages");
    
    cy.wait(2000);
    cy.screenshot('/v5.68/caso06/12-listPages');
  });



  // **************************************** NEW PAGE WITH TITLE ************************************************

  it("Crear una página con título superior a 255 caracteres", () => {
    cy.visit("/#/pages");
    cy.screenshot('/v5.68/caso07/1-accessPages');
    //click boton Pagina
    cy.get("a").contains("Pages").click();
    cy.screenshot('/v5.68/caso07/2-accessPages1');
    //click boton Nueva pagina
    cy.get("span").contains("New page").click();
    cy.screenshot('/v5.68/caso07/3-accessNewPages');
    //Digitar el contenido de la página
    cy.get('div[data-placeholder="Begin writing your page..."]').type(
      "En esta etapa 2, los ciclistas colombianos fueron los grandes protagonistas, debido a que la fracción tuvo tres puertos de montaña (dos de tercera y una de primera categoría)."
    );
    cy.screenshot('/v5.68/caso07/4-accessNewPagesTittle');
    //Digitar el título de la página
    cy.get('textarea[placeholder="Page title"]')
      .click()
      .type(
        "Daniel Martínez sorprende en la etapa 2 del Giro de Italia y se mete en el top-3 de la carrera: así va la clasificación general. Dani Martínez (Bora-Hansgrohe) el que tuvo mejor rendimiento, pues logró un segundo lugar por detrás de Pogacar, llegando a 27 segundos."
      );
    cy.screenshot('/v5.68/caso07/5-accessNewPagesdescrition');  
    //click boton Publicar
    cy.get("span").contains("Publish").click();
    cy.screenshot('/v5.68/caso07/6-accessbuttonPublish');  
    //Validar el mensaje que el titulo no debe ser mayor a 255 caracteres
    cy.get("div").should("contain", "Validation failed: Title cannot be longer than 255 characters.");
    cy.screenshot('/v5.68/caso07/7-validationError');  
    //Eliminar draft
    cy.xpath("/html/body/div[2]/div/main/button").click();
    cy.screenshot('/v5.68/caso07/8-buttonleave');  
    cy.xpath(
      "/html/body/div[2]/div/main/div/div/div/div/div[2]/form/button"
    ).click();
    cy.screenshot('/v5.68/caso07/8-buttonDelete');  
    cy.xpath("/html/body/div[5]/div/div/div[2]/button[2]").click();
    cy.screenshot('/v5.68/caso07/8-buttonDelete1');  
  });



  // **************************************** DELETE PAGE ************************************************

  it("Eliminar una página creada", () => {
    cy.visit("/#/pages");
    cy.screenshot('/v5.68/caso08/1-accessPages');
    cy.xpath(
      "/html/body/div[2]/div/main/section/section/div[1]/ol/li[2]"
    ).click();
    cy.screenshot('/v5.68/caso08/2-accessSection');
    cy.xpath("/html/body/div[2]/div/main/button").click();
    cy.screenshot('/v5.68/caso08/3-accessSection1');
    cy.xpath(
      "/html/body/div[2]/div/main/div/div/div/div/div[2]/form/button"
      ).click();
    cy.screenshot('/v5.68/caso08/4-accessSection2'); 
    cy.xpath("/html/body/div[5]/div/div").should(
        "contain",
        "Are you sure you want to delete this "
        );
    cy.screenshot('/v5.68/caso08/5-deletemessage'); 
    cy.xpath("/html/body/div[5]/div/div/div[2]/button[2]").click();
    cy.screenshot('/v5.68/caso08/6-buttonDelete'); 
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
