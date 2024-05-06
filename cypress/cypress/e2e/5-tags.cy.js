beforeEach(() => {
    login();
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception', err);
        return false;});
});

function login(){
    cy.visit("/#/signin");
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
}

describe("Login y escenarios para tags", () => {
    it("Debería crear un tag exitosamente con nombre, slug y descripción", () => {
      cy.visit("/#/tags");
      cy.wait(2000);
      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();
      cy.get('input[name="name"][id="tag-name"]').type('Nuevo Tag para el equipo #11');
      cy.get('.input-color input[name="accent-color"]').eq(0).type('52ff1f');
      cy.get('input[name="slug"][id="tag-slug"]').type('nuevo-tag');
      cy.get('textarea[name="description"][id="tag-description"]').type('Esta es la descripción para el nuevo tag del equipo #11');
      cy.wait(1000);
      cy.get("span").contains("Save").click();
      cy.wait(1000);
      cy.visit("/#/tags");
      cy.wait(2000);
      cy.get('.gh-tags-list-item')
        .contains('h3', 'Nuevo Tag para el equipo #11')
        .click();
    });

    it("Debería crear un tag y eliminar exitosamente", () => {
        cy.visit("/#/tags");
        cy.wait(3000);
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
          .contains('New tag')
          .click();
        cy.get('input[name="name"][id="tag-name"]').type('Nuevo Tag para eliminar del equipo #11');
        cy.get('.input-color input[name="accent-color"]').eq(0).type('52ff1f');
        cy.get('input[name="slug"][id="tag-slug"]').type('nuevo-tag-eliminar');
        cy.get('textarea[name="description"][id="tag-description"]').type('Esta es la descripción para el nuevo tag a eliminar del equipo #11');
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(1000);
        cy.visit("/#/tags");
        cy.wait(2000);
        cy.get('.gh-tags-list-item')
          .contains('h3', 'Nuevo Tag para eliminar del equipo #11')
          .click();
        cy.wait(1000);
        cy.get("span").contains("Delete tag").click();
        cy.get('.modal-content').should('be.visible');
        cy.wait(3000);
        cy.get('.modal-footer').find('button').contains('Delete').click();
        cy.wait(5000);
      });
});