//**************************************** Test para v5.14.1 de ghost ****************************************/

// Función para obtener un índice aleatorio
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

describe("logueo para acceder a las funcionalidades de ghost con datos online", function () {
  let testData;

  before(() => {
    // URL de la API generada en Mockaroo
    const apiUrl =
      "https://my.api.mockaroo.com/ghost_login_schema.json?key=bb5be090";

    // Solicitud HTTP para obtener los datos
    cy.request({
      method: "GET",
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      testData = response.body; // Guardar los datos obtenidos
    });
  });

  beforeEach(() => {
    cy.visit("/#/signin");

    Cypress.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught exception", err);
      return false;
    });
  });

  // ************************************************************************************************************
  // **************************************** INICIO TEST LOG IN ************************************************
  // ************************************************************************************************************

  it("Ingresar una dirección de correo electrónico y contraseña vacíos", () => {
    cy.get("#ember6").should("have.value", "");
    cy.get("#ember8").should("have.value", "");
    cy.get("#ember10 > span").click();
    cy.get(".main-error").should(
      "contain",
      "Please fill out the form to sign in."
    );
  });

  it("Ingresar una dirección de correo electrónico no válido", () => {
    const randomIndex = getRandomIndex(testData.length);
    const login = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    // Loguear al usuario
    cy.get("#ember6").invoke("val", "").type(login.user_name);
    cy.get("#ember8").invoke("val", "").type(login.password_random);
    cy.get("#ember10 > span").click();
    cy.get(".main-error").should(
      "contain",
      "Please fill out the form to sign in."
    );
  });

  it("Ingresar una dirección de correo electrónico no registrado", () => {
    const randomIndex = getRandomIndex(testData.length);
    const login = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    // Loguear al usuario
    cy.get("#ember6").invoke("val", "").type(login.email_address_random);
    cy.get("#ember8").invoke("val", "").type(login.password_random);
    cy.get("#ember10 > span").click();
    cy.get(".main-error").should(
      "contain",
      "There is no user with that email address."
    );
  });

  it("Ingresar la dirección de correo electrónico y contraseña correctos", () => {
    const login = testData[0]; // Acceder al primer conjunto de datos

    // Loguear al usuario
    cy.get("#ember6").type(login.email_address);
    cy.get("#ember8").type(login.password);
    cy.get("#ember10 > span").click();
    // Agrega una verificación aquí para asegurarte de que el login fue exitoso
  });

  // ************************************************************************************************************
  // **************************************** FIN TEST LOG IN ************************************************
  // ************************************************************************************************************
});
