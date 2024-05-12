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
    cy.screenshot('/v5.14/caso19/1-visit-tags');
    cy.wait(2000);
    cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
      .contains('New tag')
      .click();
    cy.screenshot('/v5.14/caso19/2-new-tag');
    cy.get('input[name="name"][id="tag-name"]').type('Nuevo Tag para el equipo #11');
    cy.screenshot('/v5.14/caso19/3-type-tag-name');
    cy.get('.input-color input[name="accent-color"]').eq(0).type('52ff1f');
    cy.screenshot('/v5.14/caso19/4-type-accent-color');
    cy.get('input[name="slug"][id="tag-slug"]').type('nuevo-tag');
    cy.screenshot('/v5.14/caso19/5-type-tag-slug');
    cy.get('textarea[name="description"][id="tag-description"]').type('Esta es la descripción para el nuevo tag del equipo #11');
    cy.screenshot('/v5.14/caso19/6-type-tag-description');
    cy.wait(1000);
    cy.get("span").contains("Save").click();
    cy.screenshot('/v5.14/caso19/7-click-save');
    cy.wait(1000);
    cy.visit("/#/tags");
    cy.screenshot('/v5.14/caso19/8-visit-tags');
    cy.wait(2000);
    cy.get('.gh-tags-list-item')
      .contains('h3', 'Nuevo Tag para el equipo #11')
      .click();
    cy.screenshot('/v5.14/caso19/9-click-tag-created');
  });

  it("Debería crear un tag y eliminar exitosamente", () => {
      cy.visit("/#/tags");
      cy.screenshot('/v5.14/caso20/1-visit-tags');
      cy.wait(3000);
      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();
      cy.screenshot('/v5.14/caso20/2-new-tag');
      cy.get('input[name="name"][id="tag-name"]').type('Nuevo Tag para eliminar del equipo #11');
      cy.screenshot('/v5.14/caso20/3-type-tag-name');
      cy.get('.input-color input[name="accent-color"]').eq(0).type('52ff1f');
      cy.screenshot('/v5.14/caso20/4-type-accent-color');
      cy.get('input[name="slug"][id="tag-slug"]').type('nuevo-tag-eliminar');
      cy.screenshot('/v5.14/caso20/5-type-tag-slug');
      cy.get('textarea[name="description"][id="tag-description"]').type('Esta es la descripción para el nuevo tag a eliminar del equipo #11');
      cy.screenshot('/v5.14/caso20/6-type-tag-description');
      cy.wait(1000);
      cy.get("span").contains("Save").click();
      cy.screenshot('/v5.14/caso20/7-click-save');
      cy.wait(1000);
      cy.visit("/#/tags");
      cy.screenshot('/v5.14/caso20/8-visit-tags');
      cy.wait(2000);
      cy.get('.gh-tags-list-item')
        .contains('h3', 'Nuevo Tag para eliminar del equipo #11')
        .click();
      cy.screenshot('/v5.14/caso20/9-click-tag-created');
      cy.wait(1000);
      cy.get("span").contains("Delete tag").click();
      cy.screenshot('/v5.14/caso20/10-click-delete-tag');
      cy.get('.modal-content').should('be.visible');
      cy.screenshot('/v5.14/caso20/11-click-show-modal');
      cy.wait(3000);
      cy.get('.modal-footer').find('button').contains('Delete').click();
      cy.screenshot('/v5.14/caso20/12-click-delete-tag-modal');
      cy.wait(5000);
    });
});