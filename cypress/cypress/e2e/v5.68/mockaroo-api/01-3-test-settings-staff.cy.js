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

// **************************************** GESTIONAR AUTORES Y COLABORADORES ************************************************

describe("Login y acceder a las configuraciones de ghost: Personas (Staff)", function() {
  let loginData;
  let settingData;

  before(() => {
    // URL de la API generada en Mockaroo para login data
    const loginApiUrl =
      "https://my.api.mockaroo.com/ghost_login_schema.json?key=bb5be090";
    // URL de la API generada en Mockaroo para setting data
    const settingApiUrl =
      "https://my.api.mockaroo.com/ghost_setting_schema.json?key=bb5be090";

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

  it("Envíar una invitación a una nueva persona para que cree una cuenta de personal y seleccionar su rol sin e-mail", function() {

    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.get("span").contains("Invite people").click();
    cy.get("#new-user-email")
    .invoke("val", "");
    cy.get("span").contains("Send invitation now →").click();
    cy.get("p.response").should("contain", "Please enter an email.");
  });

  it("Envíar una invitación a una nueva persona para que cree una cuenta de personal y seleccionar su rol con e-mail válido", function() {
    const randomIndex = getRandomIndex(settingData.length);
    const setting = settingData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.get("span").contains("Invite people").click();
    cy.get("#new-user-email")
      .invoke("val", "")
      .type(setting.email)
      .should("have.value", setting.email);
    cy.get("span").contains("Send invitation now →").click();
    cy.wait(2000);
    cy.get("a.close").click();
  });

  it("Envíar una invitación a una nueva persona para que cree una cuenta de personal y seleccionar su rol a usuario ya invitado", function() {
    const randomIndex = getRandomIndex(settingData.length);
    const setting = settingData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.get("span").contains("Invite people").click();
    cy.get("#new-user-email")
      .invoke("val", "")
      .type(setting.email)
      .should("have.value", setting.email);
    cy.get("span").contains("Send invitation now →").click();

    // Verificar si el usuario con ese email ya fue invitado
    cy.get("p.response").then(($response) => {
      if (
        $response
          .text()
          .includes("A user with that email address was already invited.")
      ) {
        cy.get("p.response").should(
          "contain",
          "A user with that email address was already invited."
        );
        // cy.wait(2000);
        cy.get("a.close").click();
      }
    });
  });

  it("Revocar una invitación a una persona para que cree una cuenta de personal a usuario ya invitado", () => {
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.wait(5000);
    cy.get("a").contains("Revoke").click();
    cy.get("span").should("contain", "Invitation revoked");
  });
});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************
