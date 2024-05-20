import faker from 'faker';

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
  it("Debería crear varios miembros con datos a priori", () => {
    cy.fixture("members_data.json").then((datos) => {
      const miembros = datos.miembros;

      cy.wrap(miembros).each((miembro, index) => {
        const email = `test${Date.now() + index}@hotmail.com`;
        cy.visit("/#/members");
        cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
          .contains("New member")
          .click();
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type(miembro.nombre, { force: true });
        cy.get('input[name="email"][id="member-email"]').type(email);
        cy.get('textarea[name="note"][id="member-note"]').type(miembro.descripcion);
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(3000);
      });
      
      cy.visit("/#/members");
      cy.wait(1000);
      cy.reload();
      cy.wait(5000);
      cy.get(".gh-list-data").should("exist");
    });
  });

  it("Debería crear varios miembros con datos aleatorios", () => {
    const numMiembros = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numMiembros; i++) {
      const nombre = faker.name.findName();
      const email = faker.internet.email();
      const descripcion = faker.lorem.sentence();
      cy.visit("/#/members");

      cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
        .contains("New member")
        .click();
      cy.get('input[name="name"][id="member-name"]').scrollIntoView().type(nombre, { force: true });
      cy.get('input[name="email"][id="member-email"]').type(email);
      cy.get('textarea[name="note"][id="member-note"]').type(descripcion);
      cy.wait(1000);
      cy.get("span").contains("Save").click();
      cy.wait(3000);
    }
    cy.visit("/#/members");
    cy.wait(1000);
    cy.reload();
    cy.wait(5000);
    cy.get(".gh-list-data").should("exist");
  });

  it("Debería generar error al crear un miembro con correo aleatorio inválido", () => {
    const email = faker.internet.email().replace('@', '');
    const nombre = faker.name.findName();
    const descripcion = faker.lorem.sentence();
    cy.visit("/#/members");
    cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
      .contains('New member')
      .click();
    cy.get('input[name="name"][id="member-name"]').scrollIntoView().type(nombre, { force: true });
    cy.get('input[name="email"][id="member-email"]').type(email);
    cy.get('textarea[name="note"][id="member-note"]').type(descripcion);
    cy.wait(1000);
    cy.get("span").contains("Save").click();
    cy.wait(3000);
    cy.get('.form-group.error').within(() => {
      cy.get('.response').should('contain.text', 'Invalid Email.');
    });
  });

  it("Debería generar error al crear un miembro con correo a priori inválido", () => {
    cy.fixture("members_data.json").then((datos) => {
      const miembros = datos.errores;

      cy.wrap(miembros).each((miembro, index) => {
        cy.visit("/#/members");
        cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
          .contains("New member")
          .click();
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type(miembro.nombre, { force: true });
        cy.get('input[name="email"][id="member-email"]').type(miembro.email);
        cy.get('textarea[name="note"][id="member-note"]').type(miembro.descripcion);
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(3000);
        cy.get('.form-group.error').within(() => {
          cy.get('.response').should('contain.text', 'Invalid Email.');
        });
        cy.visit("/#/members");
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Leave').click();
            cy.wait(5000);
          }
        });
      });
    });
  });

  it("Debería generar error al crear un miembro con nota aleatoria inválida", () => {
    const email = faker.internet.email();
    const nombre = faker.name.findName();
    let textoLargo = '';
    while (textoLargo.length <= 501) {
      textoLargo += faker.lorem.sentence() + ' ';
    }
    textoLargo = textoLargo.trim();
    cy.visit("/#/members");
    cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
      .contains('New member')
      .click();
    cy.get('input[name="name"][id="member-name"]').scrollIntoView().type(nombre, { force: true });
    cy.get('input[name="email"][id="member-email"]').type(email);
    cy.get('textarea[name="note"][id="member-note"]').type(textoLargo);
    cy.wait(1000);
    cy.get("span").contains("Save").click();
    cy.wait(3000);
    cy.get('.form-group.error').within(() => {
      cy.get('.response').should('contain.text', 'Note is too long.');
    });
  });

  it("Debería generar error al crear un miembro con nota a priori inválida", () => {
    cy.fixture("members_data.json").then((datos) => {
      const miembros = datos.memberError;

      cy.wrap(miembros).each((miembro, index) => {
        cy.visit("/#/members");
        cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
          .contains("New member")
          .click();
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type(miembro.nombre, { force: true });
        cy.get('input[name="email"][id="member-email"]').type(miembro.email);
        cy.get('textarea[name="note"][id="member-note"]').type(miembro.descripcion);
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(3000);
        cy.get('.form-group.error').within(() => {
          cy.get('.response').should('contain.text', 'Note is too long.');
        });
        cy.visit("/#/members");
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Leave').click();
            cy.wait(5000);
          }
        });
      });
    });
  });

  it("Debería crear varios miembros con datos a priori y nombre con kaomoji", () => {
    cy.fixture("members_data.json").then((datos) => {
      const miembros = datos.kaomoji;

      cy.wrap(miembros).each((miembro, index) => {
        const email = `test${Date.now() + index}@hotmail.com`;
        cy.visit("/#/members");
        cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
          .contains("New member")
          .click();
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type(miembro.nombre, { force: true });
        cy.get('input[name="email"][id="member-email"]').type(email);
        cy.get('textarea[name="note"][id="member-note"]').type(miembro.descripcion);
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(3000);
      });
      
      cy.visit("/#/members");
      cy.wait(1000);
      cy.reload();
      cy.wait(5000);
      cy.get(".gh-list-data").should("exist");
    });
  });

  it("Debería generar error al crear un miembro con nombre aleatorio inválido", () => {
    const email = faker.internet.email();
    let nombre = '';
    while (nombre.length <= 191) {
      nombre += faker.lorem.words(10) + ' ';
    }
    nombre = nombre.trim().slice(0, 192);
    const descripcion = faker.lorem.sentence();
    cy.visit("/#/members");
    cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
      .contains('New member')
      .click();
    cy.get('input[name="name"][id="member-name"]').scrollIntoView().type(nombre, { force: true });
    cy.get('input[name="email"][id="member-email"]').type(email);
    cy.get('textarea[name="note"][id="member-note"]').type(descripcion);
    cy.wait(1000);
    cy.get("span").contains("Save").click();
    cy.wait(3000);
    cy.get("span").contains("Retry").click();
    cy.visit("/#/members");
    cy.get('body').then($body => {
      if ($body.find('.modal-content').length > 0) {
        cy.get('.modal-content').should('be.visible');
        cy.wait(3000);
        cy.get('.modal-footer').find('button').contains('Leave').click();
        cy.wait(5000);
      }
    });
  });

  it("Debería generar error al crear un miembro con nombre a priori inválido", () => {
    cy.fixture("members_data.json").then((datos) => {
      const miembros = datos.nameErrores;
      const email = faker.internet.email();

      cy.wrap(miembros).each((miembro, index) => {
        cy.visit("/#/members");
        cy.get('a[href="#/members/new/"].gh-btn.gh-btn-primary')
          .contains("New member")
          .click();
        cy.get('input[name="name"][id="member-name"]').scrollIntoView().type(miembro.nombre, { force: true });
        cy.get('input[name="email"][id="member-email"]').type(email);
        cy.get('textarea[name="note"][id="member-note"]').type(miembro.descripcion);
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(3000);
        cy.get("span").contains("Retry").click();
        cy.visit("/#/members");
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Leave').click();
            cy.wait(5000);
          }
        });
      });
    });
  });
});
