describe("logueo para acceder a las funcionalidades de ghost", () => {
  beforeEach(() => {
    cy.visit("/#/signin");
  });

  // ************************************************************************************************************
  // **************************************** INICIO TEST LOG IN ************************************************
  // ************************************************************************************************************

  it("Ingresar una dirección de correo electrónico y contraseña vacíos", () => {
    cy.fixture("login.env.json").then(() => {
      cy.get("#ember6").should("contain", "");
      cy.get("#ember8").should("contain", "");
    });
    cy.get("#ember10 > span").click();
    cy.get(".main-error").should(
      "contain",
      "Please fill out the form to sign in."
    );
  });

  it("Ingresar una dirección de correo electrónico y contraseña inválidos", () => {
    cy.fixture("login.env.json").then(() => {
      cy.get("#ember6").type("dafer");
      cy.get("#ember8").type("1234");
    });
    cy.get("#ember10 > span").click();
    cy.get(".main-error").should(
      "contain",
      "Please fill out the form to sign in."
    );
  });

  it("Ingresar la dirección de correo electrónico y contraseña correctos", () => {
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
  });

  // ************************************************************************************************************
  // **************************************** FIN TEST LOG IN ************************************************
  // ************************************************************************************************************
});
