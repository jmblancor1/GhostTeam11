//**************************************** Test para v5.14.1 de ghost ****************************************/
require("cypress-xpath");

beforeEach(function () {
  Cypress.on("uncaught:exception", (err, runnable) => {
    console.error("Uncaught exception", err);
    return false;
  });

  // Acceder a los datos cargados desde el archivo JSON en fixtures
  cy.fixture("login_data.json").then(function (login) {
    this.loginData = login; // Guardar los datos en memoria en el contexto de 'this' para acceso durante las pruebas
  });

  // Inicia sesión usando los datos cargados
  cy.fixture("login_data.json").then((login) => {
    loginUser(login[0]); // Acceder al primer conjunto de datos
  });

  // Acceder a los datos cargados desde el archivo JSON en fixtures
  cy.fixture("setting_data.json").then(function (setting) {
    this.testData = setting; // Guardar los datos en memoria en el contexto de 'this' para acceso durante las pruebas
  });
});

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

// ************************************************************************************************************
// **************************************** START TESTING PAGE ************************************************
// ************************************************************************************************************

describe("Acceder a la funcionalidad Pages", () => {
  let testData;
  let randomIndex;
  let pages;

  beforeEach(function () {
    // Acceder a los datos cargados
    testData = this.testData;
    randomIndex = getRandomIndex(testData.length);
    pages = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio
  });
  // **************************************** NEW PAGE ************************************************

  it("Crear una nueva página con campos completos", function() {
    cy.visit("/#/pages");
    //click boton Pagina
    cy.get("a").contains("Pages").click();
    cy.screenshot("/v5.68/caso06/1-accessPages");
    //click boton Nueva pagina
    cy.get("span").contains("New page").click();
    cy.get('textarea[placeholder="Page title"]').click().type(pages.title);
    cy.get('div[data-placeholder="Begin writing your page..."]').type(pages.description);
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