beforeEach(() => {

  login();

  Cypress.on('uncaught:exception', (err, runnable) => {
    console.error('Uncaught exception', err);
    return false;
  });
});

// ************************************************************************************************************
// **************************************** INICIO TESTING SETTING ************************************************
// ************************************************************************************************************

// **************************************** GESTIONAR AUTORES Y COLABORADORES ************************************************

describe("Login y acceder a las configuraciones de ghost: Personas (Staff)", () => {
  it("Envíar una invitación a una nueva persona para que cree una cuenta de personal y seleccionar su rol sin e-mail", () => {
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.get("span").contains("Invite people").click();
    cy.get("#new-user-email")
      .invoke("val", "")
    cy.get("span").contains("Send invitation now →").click();
    cy.get("p.response").should("contain", "Please enter an email.");
  });

  it("Envíar una invitación a una nueva persona para que cree una cuenta de personal y seleccionar su rol con e-mail válido", () => {
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.get("span").contains("Invite people").click();
    cy.get("#new-user-email")
      .invoke("val", "")
      .type("dafer.guerrero@gmail.com")
      .should("have.value", "dafer.guerrero@gmail.com");
    cy.get("span").contains("Send invitation now →").click();
    cy.wait(2000)
    cy.get("a.close").click();
  });

  it("Envíar una invitación a una nueva persona para que cree una cuenta de personal y seleccionar su rol a usuario ya invitado", () => {
    cy.visit("/#/settings/general");
    cy.get("#ember32").click();
    cy.get("h4").contains("Staff").click();
    cy.get("span").contains("Invite people").click();
    cy.get("#new-user-email")
      .invoke("val", "")
      .type("dafer.guerrero@gmail.com")
      .should("have.value", "dafer.guerrero@gmail.com");
    cy.get("span").contains("Send invitation now →").click();
    cy.get("p.response").should(
      "contain",
      "A user with that email address was already invited."
    );
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

function login(){
  cy.visit("/#/signin");
  cy.fixture("login.env.json").then((login) => {
    cy.get("#ember6").type(login.userName);
    cy.get("#ember8").type(login.password);
  });
  cy.get("#ember10 > span").click();
}
