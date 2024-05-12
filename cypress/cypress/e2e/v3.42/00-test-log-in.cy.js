//**************************************** Test para v3.42.9 de ghost ****************************************/

beforeEach(() => {
  cy.visit("/#/signin");

  Cypress.on("uncaught:exception", (err, runnable) => {
    console.error("Uncaught exception", err);
    return false;
  });
});

describe("logueo para acceder a las funcionalidades de ghost", () => {
  // ************************************************************************************************************
  // **************************************** INICIO TEST LOG IN ************************************************
  // ************************************************************************************************************

  it("Ingresar una dirección de correo electrónico y contraseña vacíos", () => {
    cy.fixture("login.env.json").then(() => {
      cy.get("#ember8").should("contain", "");
      cy.get("#ember10").should("contain", "");
    });
    cy.get("#ember12 > span").click();
    cy.get(".main-error").should(
      "contain",
      "Please fill out the form to sign in."
    );
  });

  it("Ingresar una dirección de correo electrónico y contraseña inválidos", () => {
    cy.fixture("login.env.json").then(() => {
      cy.get("#ember8").type("dafer");
      cy.get("#ember10").type("1234");
    });
    cy.get("#ember12 > span").click();
    cy.get(".main-error").should(
      "contain",
      "Please fill out the form to sign in."
    );
  });

  it("Ingresar la dirección de correo electrónico y contraseña correctos", () => {
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember8").type(login.userName);
      cy.get("#ember10").type(login.password);
    });
    cy.get("#ember12 > span").click();
  });

  // ************************************************************************************************************
  // **************************************** FIN TEST LOG IN ************************************************
  // ************************************************************************************************************
});