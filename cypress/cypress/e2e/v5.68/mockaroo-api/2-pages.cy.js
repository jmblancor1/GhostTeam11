//**************************************** Test para v5.14.1 de ghost ****************************************/
require("cypress-xpath");

// Función para obtener un índice aleatorio
function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function loginUser(login) {
  cy.visit("/#/signin");
  // Loguear al usuario
  cy.get("#ember6").type(login.email_address);
  cy.get("#ember8").type(login.password);
  cy.get("#ember10 > span").click();
}

// Hook para manejar excepciones no controladas
Cypress.on("uncaught:exception", (err, runnable) => {
  console.error("Uncaught exception", err);
  return false;
});

// ************************************************************************************************************
// **************************************** START TESTING PAGE ************************************************
// ************************************************************************************************************

describe("Acceder a la funcionalidad Pages", () => {
  let loginData;
  let pagesData;

  before(() => {
    // URL de la API generada en Mockaroo para login data
    const loginApiUrl =
      "https://my.api.mockaroo.com/ghost_login_schema.json?key=bb5be090";
    // URL de la API generada en Mockaroo para setting data
    const pagesApiUrl = "https://my.api.mockaroo.com/pages_data_schema.json?key=bb5be090";

    // Solicitud HTTP para obtener los datos de login
    cy.request({
      method: "GET",
      url: loginApiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      loginData = response.body; // Guardar los datos de login obtenidos
    });

    // Solicitud HTTP para obtener los datos de setting
    cy.request({
      method: "GET",
      url: pagesApiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      pagesData = response.body; // Guardar los datos de setting obtenidos
    });
  });

  beforeEach(function () {
    // Loguear al usuario usando los datos obtenidos
    loginUser(loginData[0]); // Acceder al primer conjunto de datos
  });
  // **************************************** NEW PAGE ************************************************

  it("Crear una nueva página con campos completos", function() {
    const randomIndex = getRandomIndex(pagesData.length);
    const pages = pagesData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    cy.visit("/#/pages");
    //click boton Pagina
    cy.get("a").contains("Pages").click();
    cy.screenshot("/v5.68/caso06/1-accessPages");
    //click boton Nueva pagina
    cy.get("span").contains("New page").click();
    cy.get('textarea[placeholder="Page title"]').click().type(pages.title);
    cy.get('div[data-placeholder="Begin writing your page..."]').type(
      pages.description
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
    cy.wait(2000);
    cy.visit("/#/pages");
    cy.wait(2000);
  });


  // **************************************** DELETE PAGE ************************************************

  it("Eliminar una página creada", function() {
    cy.visit("/#/pages");
    cy.screenshot("/v5.68/caso08/1-accessPages");
    cy.xpath(
      "/html/body/div[2]/div/main/section/section/div[1]/ol/li[2]"
    ).click();
    cy.screenshot("/v5.68/caso08/2-accessSection");
    cy.xpath("/html/body/div[2]/div/main/button").click();
    cy.screenshot("/v5.68/caso08/3-accessSection1");
    cy.xpath(
      "/html/body/div[2]/div/main/div/div/div/div/div[2]/form/button"
    ).click();
    cy.screenshot("/v5.68/caso08/4-accessSection2");
    cy.xpath("/html/body/div[5]/div/div").should(
      "contain",
      "Are you sure you want to delete this "
    );
    cy.screenshot("/v5.68/caso08/5-deletemessage");
    cy.xpath("/html/body/div[5]/div/div/div[2]/button[2]").click();
    cy.screenshot("/v5.68/caso08/6-buttonDelete");
    cy.get("h3").should("contain", "About this site");
  });
});

// ************************************************************************************************************
// **************************************** END TESTING PAGE ************************************************
// ************************************************************************************************************