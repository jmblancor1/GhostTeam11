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
      cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
        .contains('New member')
        .click();
      cy.get('input[name="name"][id="member-name"]').scrollIntoView().type('Nuevo miembro Grupo # 11', { force: true });
      cy.get('input[name="email"][id="member-email"]').type(email);
      cy.get('textarea[name="note"][id="member-note"]').type('Esta es la descripción del nuevo miembro del Grupo # 11');
      cy.wait(1000);
      cy.get("span").contains("Save").click();
      cy.wait(3000);
      cy.visit("/#/members");
      cy.wait(1000);
      cy.reload();
      cy.wait(5000);
      cy.get('.gh-list-data').should('exist');
      cy.get('.gh-members-list-email').each((emailElement) => {
        cy.wrap(emailElement).invoke('text').then((memberEmailText) => {
          if (memberEmailText.trim() === email.trim()) {
            cy.wrap(emailElement).click();
            cy.log(`Se hizo clic en el miembro con el correo electrónico "${email}".`);
          }
        });
      });
    });

    it("Debería crear un miembro exitosamente y luego eliminar exitosamente", () => {
        const email = `miembro-e11-a-eliminar@gmail.com`;
        cy.visit("/#/members");
        cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
          .contains('New member')
          .click();
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type('Nuevo miembro Grupo # 11 a eliminar', { force: true });
        cy.get('input[name="email"][id="member-email"]').type(email);
        cy.get('textarea[name="note"][id="member-note"]').type('Esta es la descripción del nuevo miembro del Grupo # 11 que será eliminado');
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(3000);
        cy.visit("/#/members");
        cy.wait(1000);
        cy.reload();
        cy.wait(5000);
        cy.get('.gh-list-data').should('exist');
        cy.get('.gh-members-list-email').each((emailElement) => {
          cy.wrap(emailElement).invoke('text').then((memberEmailText) => {
            if (memberEmailText.trim() === email.trim()) {
              cy.wrap(emailElement).click();
              cy.log(`Se hizo clic en el miembro con el correo electrónico "${email}".`);
            }
          });
        });
        cy.get('.dropdown').should('be.visible');
        cy.get('.dropdown button').first().click();
        cy.get("button").contains("Delete member").click();
        cy.get('.modal-content').should('be.visible');
        cy.wait(3000);
        cy.get('.modal-footer').find('button').contains('Delete member').click();
        cy.wait(5000);
    });

    it("Debería crear un miembro exitosamente y luego filtrar eventos en la actividad del miembro", () => {
        const email = `test${Math.floor(Math.random() * 100000)}@gmail.com`;
        cy.visit("/#/members");
        cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
          .contains('New member')
          .click();
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type('Nuevo miembro a filtrar Grupo # 11', { force: true });
        cy.get('input[name="email"][id="member-email"]').type(email);
        cy.get('textarea[name="note"][id="member-note"]').type('Esta es la descripción del nuevo miembro a filtrar del Grupo # 11');
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(3000);
        cy.visit("/#/members");
        cy.wait(1000);
        cy.reload();
        cy.wait(5000);
        cy.get('.gh-list-data').should('exist');
        cy.get('.gh-members-list-email').each((emailElement) => {
          cy.wrap(emailElement).invoke('text').then((memberEmailText) => {
            if (memberEmailText.trim() === email.trim()) {
              cy.wrap(emailElement).click();
              cy.log(`Se hizo clic en el miembro con el correo electrónico "${email}".`);
            }
          });
        });
        cy.wait(2000);
        cy.get("a").contains("See all member activity").click();
        cy.get('div.gh-btn.gh-btn-icon.gh-btn-action-icon').click();
        for (let i = 0; i < 8; i++) {
            const inputSelector = `#type-${i}`;
            cy.get(inputSelector).then(($input) => {
              cy.wrap($input).click({force: true});
              cy.wait(2000);
            });
        }
        cy.get('div.gh-btn.gh-btn-icon.gh-btn-action-icon').click();
  });
});
