//**************************************** Test para v5.14.1 de ghost ****************************************/

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
// **************************************** INICIO TESTING SETTING ************************************************
// ************************************************************************************************************

// **************************************** INYECTAR CODIGO ************************************************

describe("Login y acceder a las configuraciones de ghost: Añadir código a una publicación", function () {
  let loginData;
  let settingData;

  before(() => {
    // URL de la API generada en Mockaroo para login data
    const loginApiUrl = "https://my.api.mockaroo.com/ghost_login_schema.json?key=bb5be090";
    // URL de la API generada en Mockaroo para setting data
    const settingApiUrl = "https://my.api.mockaroo.com/ghost_setting_schema.json?key=bb5be090";

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
      url: settingApiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      settingData = response.body; // Guardar los datos de setting obtenidos
    });
  });

  beforeEach(function () {
    // Loguear al usuario usando los datos obtenidos
    loginUser(loginData[0]); // Acceder al primer conjunto de datos
  });
  it("Añadir un encabezado a un sitio web", function () {
    const randomIndex = getRandomIndex(settingData.length);
    const setting = settingData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    cy.visit("/#/settings/code-injection");
    cy.get("#ember32").click();
    cy.get("h4").contains("Code injection").click();

    cy.get("#ghost-head > .CodeMirror > .CodeMirror-scroll")
      .click()
      .type("{ctrl+A}{del}")
      .type(setting.header);
    cy.get("span").contains("Save").click();
    cy.get("span").should("contain", "Saved");
    cy.get("#ember23").click();
  });

  it("Añadir un pie de página a un sitio web", () => {
    const randomIndex = getRandomIndex(settingData.length);
    const setting = settingData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    cy.visit("/#/settings/code-injection");
    cy.get("#ember32").click();
    cy.get("h4").contains("Code injection").click();
    cy.get("#ghost-foot > .CodeMirror > .CodeMirror-scroll")
      .click()
      .type("{ctrl+A}{del}")
      .type(setting.footer);
    cy.get("span").contains("Save").click();
    cy.get("span").should("contain", "Saved");
    cy.get("#ember23").click();
  });
});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************
