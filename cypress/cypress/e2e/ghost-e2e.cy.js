describe("logueo para acceder a las funcionalidades de ghost", () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("Realizar login con datos validos", () => {
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
  });
});


