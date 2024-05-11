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

describe("Login y escenarios para members", () => {
    it("Debería crear un miembro exitosamente con nombre, correo y descripción", () => {
      const email = `test${Math.floor(Math.random() * 100000)}@gmail.com`;
      cy.visit("/#/members");
      cy.screenshot('/v5/caso16/1-visit-members');
      cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
        .contains('New member')
        .click();
      cy.screenshot('/v5/caso16/2-new-member');
      cy.get('input[name="name"][id="member-name"]').scrollIntoView().type('Nuevo miembro Grupo # 11', { force: true });
      cy.screenshot('/v5/caso16/3-type-member-name');
      cy.get('input[name="email"][id="member-email"]').type(email);
      cy.screenshot('/v5/caso16/4-type-member-email');
      cy.get('textarea[name="note"][id="member-note"]').type('Esta es la descripción del nuevo miembro del Grupo # 11');
      cy.screenshot('/v5/caso16/5-type-member-note');
      cy.wait(1000);
      cy.get("span").contains("Save").click();
      cy.screenshot('/v5/caso16/6-click-save');
      cy.wait(3000);
      cy.visit("/#/members");
      cy.screenshot('/v5/caso16/7-visit-members');
      cy.wait(1000);
      cy.reload();
      cy.wait(5000);
      cy.get('.gh-list-data').should('exist');
      cy.get('.gh-members-list-email').each((emailElement) => {
        cy.wrap(emailElement).invoke('text').then((memberEmailText) => {
          if (memberEmailText.trim() === email.trim()) {
            cy.wrap(emailElement).click();
            cy.screenshot('/v5/caso16/8-click-member-created');
            cy.log(`Se hizo clic en el miembro con el correo electrónico "${email}".`);
          }
        });
      });
    });

    it("Debería crear un miembro exitosamente y luego eliminar exitosamente", () => {
        const email = `miembro-e11-a-eliminar@gmail.com`;
        cy.visit("/#/members");
        cy.screenshot('/v5/caso17/1-visit-members');
        cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
          .contains('New member')
          .click();
        cy.screenshot('/v5/caso17/2-new-member');
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type('Nuevo miembro Grupo # 11 a eliminar', { force: true });
        cy.screenshot('/v5/caso17/3-type-member-name');
        cy.get('input[name="email"][id="member-email"]').type(email);
        cy.screenshot('/v5/caso17/4-type-member-email');
        cy.get('textarea[name="note"][id="member-note"]').type('Esta es la descripción del nuevo miembro del Grupo # 11 que será eliminado');
        cy.screenshot('/v5/caso17/5-type-member-note');
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.screenshot('/v5/caso17/6-click-save');
        cy.wait(3000);
        cy.visit("/#/members");
        cy.screenshot('/v5/caso17/7-visit-members');
        cy.wait(1000);
        cy.reload();
        cy.wait(5000);
        cy.get('.gh-list-data').should('exist');
        cy.get('.gh-members-list-email').each((emailElement) => {
          cy.wrap(emailElement).invoke('text').then((memberEmailText) => {
            if (memberEmailText.trim() === email.trim()) {
              cy.wrap(emailElement).click();
              cy.screenshot('/v5/caso17/8-click-member-created');
              cy.log(`Se hizo clic en el miembro con el correo electrónico "${email}".`);
            }
          });
        });
        cy.get('.dropdown').should('be.visible');
        cy.get('.dropdown button').first().click();
        cy.screenshot('/v5/caso17/9-click-dropdown');
        cy.get("button").contains("Delete member").click();
        cy.screenshot('/v5/caso17/10-click-delete-member-dropdown');
        cy.get('.modal-content').should('be.visible');
        cy.screenshot('/v5/caso17/11-modal-be-visible');
        cy.wait(3000);
        cy.get('.modal-footer').find('button').contains('Delete member').click();
        cy.wait(5000);
        cy.screenshot('/v5/caso17/12-delete-member');
    });

    it.only("Debería crear un miembro exitosamente y luego filtrar eventos en la actividad del miembro", () => {
        const email = `test${Math.floor(Math.random() * 100000)}@gmail.com`;
        cy.visit("/#/members");
        cy.screenshot('/v5/caso18/1-visit-members');
        cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
          .contains('New member')
          .click();
        cy.screenshot('/v5/caso18/2-new-member');
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type('Nuevo miembro a filtrar Grupo # 11', { force: true });
        cy.screenshot('/v5/caso18/3-type-member-name');
        cy.get('input[name="email"][id="member-email"]').type(email);
        cy.screenshot('/v5/caso18/4-type-member-email');
        cy.get('textarea[name="note"][id="member-note"]').type('Esta es la descripción del nuevo miembro a filtrar del Grupo # 11');
        cy.screenshot('/v5/caso18/5-type-member-note');
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.screenshot('/v5/caso18/6-click-save');
        cy.wait(3000);
        cy.visit("/#/members");
        cy.screenshot('/v5/caso18/7-visit-members');
        cy.wait(1000);
        cy.reload();
        cy.wait(5000);
        cy.get('.gh-list-data').should('exist');
        cy.get('.gh-members-list-email').each((emailElement) => {
          cy.wrap(emailElement).invoke('text').then((memberEmailText) => {
            if (memberEmailText.trim() === email.trim()) {
              cy.wrap(emailElement).click();
              cy.screenshot('/v5/caso18/8-click-member-created');
              cy.log(`Se hizo clic en el miembro con el correo electrónico "${email}".`);
            }
          });
        });
        cy.wait(2000);
        cy.get("a").contains("See all member activity").click();
        cy.screenshot('/v5/caso18/9-click-member-activity');
        cy.get('div.gh-btn.gh-btn-icon.gh-btn-action-icon').click();
        cy.screenshot('/v5/caso18/10-click-select-filter');
        for (let i = 0; i < 8; i++) {
            const inputSelector = `#type-${i}`;
            cy.get(inputSelector).then(($input) => {
              cy.wrap($input).click({force: true});
              cy.screenshot(`/v5/caso18/11-click-select-each-filter-${i}`);
              cy.wait(2000);
            });
        }
        cy.get('div.gh-btn.gh-btn-icon.gh-btn-action-icon').click();
        cy.screenshot(`/v5/caso18/12-click-close-icon`);
  });
});
