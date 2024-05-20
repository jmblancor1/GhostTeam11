beforeEach(() => {
  cy.visit("/#/signin");

  Cypress.on("uncaught:exception", (err, runnable) => {
    console.error("Uncaught exception", err);
    return false;
  });

  cy.fixture('login_data.json').then(function(login) {
    // Guardar los datos en memoria para acceso durante las pruebas
    this.testData = login; // Guardar los datos en el contexto de 'this'
    cy.wrap(login).as("testData");
  });
});

// Función para obtener un índice aleatorio
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

describe("logueo para acceder a las funcionalidades de ghost con datos a-priori", function() {

  // ************************************************************************************************************
  // **************************************** INICIO TEST LOG IN ************************************************
  // ************************************************************************************************************

  it("Ingresar una dirección de correo electrónico y contraseña vacíos", () => {
    cy.get("#ember6").should("have.value", "");
    cy.get("#ember8").should("have.value", "");
    cy.get("#ember10 > span").click();
    cy.get(".main-error").should("contain", "Please fill out the form to sign in.");
  });

  it("Ingresar una dirección de correo electrónico no válido", function () {
    // Acceder a los datos cargados
    const testData = this.testData;
    const randomIndex = getRandomIndex(testData.length);
    const login = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    // Loguear al usuario
    cy.get("#ember6").invoke("val", "").type(login.user_name);
    cy.get("#ember8").invoke("val", "").type(login.password_random);
    cy.get("#ember10 > span").click();
    cy.get(".main-error").should("contain", "Please fill out the form to sign in.");
  });

  it("Ingresar una dirección de correo electrónico no registrado", function() {
    // Acceder a los datos cargados
    const testData = this.testData;
    const randomIndex = getRandomIndex(testData.length);
    const login = testData[randomIndex]; // Seleccionar un conjunto de datos aleatorio

    // Loguear al usuario
    cy.get("#ember6").invoke("val", "").type(login.email_address_random);
    cy.get("#ember8").invoke("val", "").type(login.password_random);
    cy.get("#ember10 > span").click();
    cy.get(".main-error").should("contain", "There is no user with that email address.");

  });

  it("Ingresar la dirección de correo electrónico y contraseña correctos", function() {
    // Acceder a los datos cargados
    const testData = this.testData;
    const login = testData[0]; // Acceder al primer conjunto de datos

    // Loguear al usuario
    cy.get("#ember6").type(login.email_address);
    cy.get("#ember8").type(login.password);
    cy.get("#ember10 > span").click();
  });

  // ************************************************************************************************************
  // **************************************** FIN TEST LOG IN ************************************************
  // ************************************************************************************************************
});