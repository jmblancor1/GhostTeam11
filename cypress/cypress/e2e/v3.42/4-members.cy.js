beforeEach(() => {
    login();
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.error('Uncaught exception', err);
        return false;});
});

function login(){
    cy.visit("/#/signin");
    cy.fixture("login.env.json").then((login) => {
        cy.get("#ember8").type(login.userName);
        cy.get("#ember10").type(login.password);
    });
    cy.get("#ember12 > span").click();
    cy.wait(1000);
}

describe("Login y escenarios para members", () => {
    it("Debería crear un miembro exitosamente con nombre, correo y descripción", () => {
        const email = `test${Math.floor(Math.random() * 100000)}@gmail.com`;
        cy.wait(1000);
        cy.visit("/#/members");
        cy.screenshot('/v3.42/caso16/1-visit-members');
        cy.wait(1000);
        cy.get('a[href="#/members/new/"].gh-btn')
        .contains('New member')
        .click();
        cy.screenshot('/v3.42/caso16/2-new-member');
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type('Nuevo miembro Grupo # 11', { force: true });
        cy.screenshot('/v3.42/caso16/3-type-member-name');
        cy.get('input[name="email"][id="member-email"]').type(email);
        cy.screenshot('/v3.42/caso16/4-type-member-email');
        cy.get('textarea[name="note"][id="member-note"]').type('Esta es la descripción del nuevo miembro del Grupo # 11');
        cy.screenshot('/v3.42/caso16/5-type-member-note');
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.screenshot('/v3.42/caso16/6-click-save');
        cy.wait(3000);
        cy.visit("/#/members");
        cy.screenshot('/v3.42/caso16/7-visit-members');
        cy.wait(1000);
        cy.reload();
        cy.wait(5000);
        cy.get('.members-list').should('exist');
        cy.get('.gh-members-list-email').each((emailElement) => {
            cy.wrap(emailElement).invoke('text').then((memberEmailText) => {
                if (memberEmailText.trim() === email.trim()) {
                cy.wrap(emailElement).click();
                cy.screenshot('/v3.42/caso16/8-click-member-created');
                cy.log(`Se hizo clic en el miembro con el correo electrónico "${email}".`);
                }
            });
        });
    });

    it("Debería crear un miembro exitosamente y luego eliminar exitosamente", () => {
        const email = `miembro-e11-a-eliminar@gmail.com`;
        cy.wait(1000);
        cy.visit("/#/members");
        cy.screenshot('/v3.42/caso17/1-visit-members');
        cy.wait(1000);
        cy.get('a[href="#/members/new/"].gh-btn')
            .contains('New member')
            .click();
        cy.screenshot('/v3.42/caso17/2-new-member');
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type('Nuevo miembro Grupo # 11 a eliminar', { force: true });
        cy.screenshot('/v3.42/caso17/3-type-member-name');
        cy.get('input[name="email"][id="member-email"]').type(email);
        cy.screenshot('/v3.42/caso17/4-type-member-email');
        cy.get('textarea[name="note"][id="member-note"]').type('Esta es la descripción del nuevo miembro del Grupo # 11 que será eliminado');
        cy.screenshot('/v3.42/caso17/5-type-member-note');
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.screenshot('/v3.42/caso17/6-click-save');
        cy.wait(3000);
        cy.visit("/#/members");
        cy.screenshot('/v3.42/caso17/7-visit-members');
        cy.wait(1000);
        cy.reload();
        cy.wait(5000);
        cy.get('.members-list').should('exist');
        cy.get('.gh-members-list-email').each((emailElement) => {
            cy.wrap(emailElement).invoke('text').then((memberEmailText) => {
                if (memberEmailText.trim() === email.trim()) {
                cy.wrap(emailElement).click();
                cy.screenshot('/v3.42/caso17/8-click-member-created');
                cy.log(`Se hizo clic en el miembro con el correo electrónico "${email}".`);
                }
            });
        });
        cy.get("button").contains("Delete member").click();
        cy.screenshot('/v3.42/caso17/9-click-delete-member');
        cy.get('.fullscreen-modal-container').should('be.visible');
        cy.screenshot('/v3.42/caso17/10-modal-be-visible');
        cy.wait(3000);
        cy.get('.modal-footer').find('button').contains('Delete member').click();
        cy.screenshot('/v3.42/caso17/11-delete-member-confirm');
        cy.wait(3000);
        cy.visit("/#/members");
    });
});
