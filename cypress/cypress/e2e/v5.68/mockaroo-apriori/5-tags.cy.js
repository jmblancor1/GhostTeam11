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

describe("Login y escenarios para tags con datos a priori y aleatorios", () => {
  it("Debería crear múltiples tags exitosamente con datos a priori", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.tags;
  
      cy.wrap(tags).each((tag, index) => {
        cy.visit("/#/tags");
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

        cy.get('input[name="name"][id="tag-name"]').type(tag.nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
        cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(1000);
        cy.visit("/#/tags");
        cy.wait(2000);
      });
    });
  });
  
  it("Debería crear varios tags con datos aleatorios", () => {
    const numTags = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numTags; i++) {
      const nombre = faker.lorem.words(3);
      const slug = faker.lorem.slug();
      const descripcion = faker.lorem.sentence();
      const color = faker.internet.color().replace('#', '')
      cy.visit("/#/tags");

      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

      cy.get('input[name="name"][id="tag-name"]').type(nombre);
      cy.get('.input-color input[name="accent-color"]').eq(0).type(color);
      cy.get('input[name="slug"][id="tag-slug"]').type(slug);
      cy.get('textarea[name="description"][id="tag-description"]').type(descripcion);
      cy.wait(1000);
      cy.get("span").contains("Save").click();
      cy.wait(1000);
      cy.visit("/#/tags");
      cy.wait(2000);
    }
  });

  it("Debería realizar el intento de creación tags con datos a priori, nombre inválido", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.errorNombre;
  
      cy.wrap(tags).each((tag, index) => {
        cy.visit("/#/tags");
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();
        cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
        cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(1000);
        cy.get('span.error').within(() => {
          cy.get('.response').should('contain.text', 'You must specify a name for the tag.');
        });
        cy.visit("/#/tags");
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

  it("Debería realizar el intento de creación tags con datos aleatorios, nombre inválido", () => {
    const numTags = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numTags; i++) {
      const slug = faker.lorem.slug();
      const descripcion = faker.lorem.sentence();
      const color = faker.internet.color().replace('#', '')
      cy.visit("/#/tags");

      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

      cy.get('.input-color input[name="accent-color"]').eq(0).type(color);
      cy.get('input[name="slug"][id="tag-slug"]').type(slug);
      cy.get('textarea[name="description"][id="tag-description"]').type(descripcion);
      cy.wait(1000);
      cy.get("span").contains("Save").click();
      cy.wait(1000);
      cy.visit("/#/tags");
      cy.get('span.error').within(() => {
        cy.get('.response').should('contain.text', 'You must specify a name for the tag.');
      });
      cy.visit("/#/tags");
      cy.get('body').then($body => {
        if ($body.find('.modal-content').length > 0) {
          cy.get('.modal-content').should('be.visible');
          cy.wait(3000);
          cy.get('.modal-footer').find('button').contains('Leave').click();
          cy.wait(5000);
        }
      });
    }
  });

  it("Debería realizar el intento de creación tags con datos a priori, color inválido", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.errorColor;
  
      cy.wrap(tags).each((tag, index) => {
        cy.visit("/#/tags");
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
          .contains('New tag')
          .click();
        cy.get('input[name="name"][id="tag-name"]').type(tag.nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
        cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
        cy.wait(1000);
        cy.get("span").contains("Save").click();
        cy.wait(1000);
        cy.get('span.error').within(() => {
          cy.get('.response').should('contain.text', 'The colour should be in valid hex format');
        });
        cy.visit("/#/tags");
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

  it("Debería crear múltiples tags con meta data válida exitosamente con datos a priori", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.metaData;
  
      cy.wrap(tags).each((tag, index) => {
        cy.wait(4000);
        cy.visit("/#/tags");
        cy.wait(2000);
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
          .contains('New tag')
          .click();
        cy.get('input[name="name"][id="tag-name"]').type(tag.nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
        cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="metaTitle"][id="meta-title"]').type(tag.metaTitle);
        cy.get('textarea[name="metaDescription"][id="meta-description"]').type(tag.metaDescripcion);
        cy.get('input[name="canonicalUrl"][id="canonical-url"]').type(tag.metaUrl);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Stay').click();
            cy.wait(5000);
          }
        });
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
      });
    });
  });

  it("Debería crear múltiples tags con meta data válida exitosamente con datos aleatorios", () => {
    const numTags = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numTags; i++) {
      const nombre = faker.lorem.words(3);
      const slug = faker.lorem.slug();
      const descripcion = faker.lorem.sentence();
      const color = faker.internet.color().replace('#', '')
      const metaTitle = faker.lorem.words(3);
      const metaDescripcion = faker.lorem.words(3);
      const metaUrl = faker.internet.url();

      cy.visit("/#/tags");
      cy.wait(2000);

      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

      cy.get('input[name="name"][id="tag-name"]').type(nombre);
      cy.get('.input-color input[name="accent-color"]').eq(0).type(color);
      cy.get('input[name="slug"][id="tag-slug"]').type(slug);
      cy.get('textarea[name="description"][id="tag-description"]').type(descripcion);
      cy.wait(1000);
      cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
        cy.wrap($btnExpand).click();
        cy.wait(3000);
        });
      cy.get('input[name="metaTitle"][id="meta-title"]').type(metaTitle);
      cy.get('textarea[name="metaDescription"][id="meta-description"]').type(metaDescripcion);
      cy.get('input[name="canonicalUrl"][id="canonical-url"]').type(metaUrl);
      cy.wait(2000);
      cy.get("span").contains("Save").click();
      cy.wait(1000);
      cy.get('body').then($body => {
        if ($body.find('.modal-content').length > 0) {
          cy.get('.modal-content').should('be.visible');
          cy.wait(3000);
          cy.get('.modal-footer').find('button').contains('Stay').click();
          cy.wait(5000);
        }
      });
      cy.wait(2000);
      cy.get("span").contains("Save").click();
      cy.wait(2000);
    }
  });

  it("Debería crear múltiples tags con twitter card válida exitosamente con datos a priori", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.twitterCard;
  
      cy.wrap(tags).each((tag, index) => {
        cy.wait(4000);
        cy.visit("/#/tags");
        cy.wait(2000);
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
          .contains('New tag')
          .click();
        cy.get('input[name="name"][id="tag-name"]').type(tag.nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
        cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="twitterTitle"][id="twitter-title"]').type(tag.twitterTitle);
        cy.get('textarea[name="twitterDescription"][id="twitter-description"]').type(tag.twitterDescription);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Stay').click();
            cy.wait(5000);
          }
        });
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
      });
    });
  });

  it("Debería crear múltiples tags con twitter card válida exitosamente con datos aleatorios", () => {
    const numTags = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numTags; i++) {
      const nombre = faker.lorem.words(3);
      const slug = faker.lorem.slug();
      const descripcion = faker.lorem.sentence();
      const color = faker.internet.color().replace('#', '')
      const twitterTitle = faker.lorem.words(3);
      const twitterDescription = faker.lorem.words(3);

      cy.visit("/#/tags");

      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

      cy.get('input[name="name"][id="tag-name"]').type(nombre);
      cy.get('.input-color input[name="accent-color"]').eq(0).type(color);
      cy.get('input[name="slug"][id="tag-slug"]').type(slug);
      cy.get('textarea[name="description"][id="tag-description"]').type(descripcion);
      cy.wait(1000);
      cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
        cy.wrap($btnExpand).click();
        cy.wait(3000);
      });
      cy.get('input[name="twitterTitle"][id="twitter-title"]').type(twitterTitle);
      cy.get('textarea[name="twitterDescription"][id="twitter-description"]').type(twitterDescription);
      cy.wait(2000);
      cy.get('body').then($body => {
        if ($body.find('.modal-content').length > 0) {
          cy.get('.modal-content').should('be.visible');
          cy.wait(3000);
          cy.get('.modal-footer').find('button').contains('Stay').click();
          cy.wait(5000);
        }
      });
      cy.wait(2000);
      cy.get("span").contains("Save").click();
      cy.wait(2000);
    }
  });

  it("Debería crear múltiples tags con facebook card válida exitosamente con datos a priori", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.facebookCard;
  
      cy.wrap(tags).each((tag, index) => {
        cy.wait(4000);
        cy.visit("/#/tags");
        cy.wait(2000);
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
          .contains('New tag')
          .click();
        cy.get('input[name="name"][id="tag-name"]').type(tag.nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
        cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="ogTitle"][id="og-title"]').type(tag.facebookTitle);
        cy.get('textarea[name="ogDescription"][id="og-description"]').type(tag.facebookDescription);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Stay').click();
            cy.wait(5000);
          }
        });
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
      });
    });
  });

  it("Debería crear múltiples tags con facebook card válida exitosamente con datos aleatorios", () => {
    const numTags = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numTags; i++) {
      const nombre = faker.lorem.words(3);
      const slug = faker.lorem.slug();
      const descripcion = faker.lorem.sentence();
      const color = faker.internet.color().replace('#', '')
      const facebookTitle = faker.lorem.words(3);
      const facebookDescription = faker.lorem.words(3);

      cy.visit("/#/tags");

      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

        cy.get('input[name="name"][id="tag-name"]').type(nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(color);
        cy.get('input[name="slug"][id="tag-slug"]').type(slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="ogTitle"][id="og-title"]').type(facebookTitle);
        cy.get('textarea[name="ogDescription"][id="og-description"]').type(facebookDescription);
        cy.wait(2000);
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Stay').click();
            cy.wait(5000);
          }
        });
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
    }
  });

  it("Debería crear múltiples tags con meta data title invalida con datos a priori", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.metaDataMultiple;
  
      cy.wrap(tags).each((tag, index) => {
        cy.wait(4000);
        cy.visit("/#/tags");
        cy.wait(2000);
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
          .contains('New tag')
          .click();
        cy.get('input[name="name"][id="tag-name"]').type(tag.nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
        cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="metaTitle"][id="meta-title"]').type(tag.metaTitle);
        cy.get('textarea[name="metaDescription"][id="meta-description"]').type(tag.metaDescripcion);
        cy.get('input[name="canonicalUrl"][id="canonical-url"]').type(tag.metaUrl);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(1000);
        cy.get("span").contains("Retry").click();
        
        cy.visit("/#/tags");
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

  it("Debería crear múltiples tags con meta data title inválida exitosamente con datos aleatorios", () => {
    const numTags = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numTags; i++) {
      const nombre = faker.lorem.words(3);
      const slug = faker.lorem.slug();
      const descripcion = faker.lorem.sentence();
      const color = faker.internet.color().replace('#', '')
      const metaDescripcion = faker.lorem.words(3);
      const metaUrl = faker.internet.url();
      let metaTitle = '';
      while (metaTitle.length <= 501) {
        metaTitle += faker.lorem.sentence() + ' ';
      }
      metaTitle = metaTitle.trim();

      cy.visit("/#/tags");
      cy.wait(2000);

      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

        cy.get('input[name="name"][id="tag-name"]').type(nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(color);
        cy.get('input[name="slug"][id="tag-slug"]').type(slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="metaTitle"][id="meta-title"]').type(metaTitle);
        cy.get('textarea[name="metaDescription"][id="meta-description"]').type(metaDescripcion);
        cy.get('input[name="canonicalUrl"][id="canonical-url"]').type(metaUrl);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(1000);
        cy.get("span").contains("Retry").click();
        cy.visit("/#/tags");
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Leave').click();
            cy.wait(5000);
          }
        });
    }
  });

  it("Debería crear múltiples tags con meta data description invalida con datos a priori", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.metaDataMultipleDes;
  
      cy.wrap(tags).each((tag, index) => {
        cy.wait(4000);
        cy.visit("/#/tags");
        cy.wait(2000);
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
          .contains('New tag')
          .click();
        cy.get('input[name="name"][id="tag-name"]').type(tag.nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
        cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="metaTitle"][id="meta-title"]').type(tag.metaTitle);
        cy.get('textarea[name="metaDescription"][id="meta-description"]').type(tag.metaDescripcion);
        cy.get('input[name="canonicalUrl"][id="canonical-url"]').type(tag.metaUrl);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(1000);
        cy.get("span").contains("Retry").click();
        
        cy.visit("/#/tags");
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

  it("Debería crear múltiples tags con meta data description inválida con datos aleatorios", () => {
    const numTags = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numTags; i++) {
      const nombre = faker.lorem.words(3);
      const slug = faker.lorem.slug();
      const descripcion = faker.lorem.sentence();
      const color = faker.internet.color().replace('#', '')
      const metaTitle = faker.lorem.words(3);
      const metaUrl = faker.internet.url();
      let metaDescripcion = '';
      while (metaDescripcion.length <= 501) {
        metaDescripcion += faker.lorem.sentence() + ' ';
      }
      metaDescripcion = metaDescripcion.trim();

      cy.visit("/#/tags");
      cy.wait(2000);

      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

        cy.get('input[name="name"][id="tag-name"]').type(nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(color);
        cy.get('input[name="slug"][id="tag-slug"]').type(slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="metaTitle"][id="meta-title"]').type(metaTitle);
        cy.get('textarea[name="metaDescription"][id="meta-description"]').type(metaDescripcion);
        cy.get('input[name="canonicalUrl"][id="canonical-url"]').type(metaUrl);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(1000);
        cy.get("span").contains("Retry").click();
        cy.visit("/#/tags");
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Leave').click();
            cy.wait(5000);
          }
        });
    }
  });

  it("Debería realizar el intento de creación tags con datos a priori, nombre kamoji", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.kaomoji;
  
      cy.wrap(tags).each((tag, index) => {
        cy.visit("/#/tags");
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();
      cy.get('input[name="name"][id="tag-name"]').type(tag.nombre);
      cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
      cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
      cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
      cy.wait(1000);
      cy.get("span").contains("Save").click();
      cy.wait(1000);
      cy.visit("/#/tags");
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

  it("Debería realizar el intento de creación tags con datos a priori, nombre en hebreo", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.hebreo;
  
      cy.wrap(tags).each((tag, index) => {
        cy.visit("/#/tags");
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();
      cy.get('input[name="name"][id="tag-name"]').type(tag.nombre);
      cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
      cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
      cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
      cy.wait(1000);
      cy.get("span").contains("Save").click();
      cy.wait(1000);
      cy.visit("/#/tags");
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

  it("Debería crear múltiples tags con meta data url inválida con datos a priori", () => {
    cy.fixture("tags_data.json").then((datos) => {
      const tags = datos.metaDataErr;
  
      cy.wrap(tags).each((tag, index) => {
        cy.wait(4000);
        cy.visit("/#/tags");
        cy.wait(2000);
        cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
          .contains('New tag')
          .click();
        cy.get('input[name="name"][id="tag-name"]').type(tag.nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(tag.color);
        cy.get('input[name="slug"][id="tag-slug"]').type(tag.slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(tag.descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="metaTitle"][id="meta-title"]').type(tag.metaTitle);
        cy.get('textarea[name="metaDescription"][id="meta-description"]').type(tag.metaDescripcion);
        cy.get('input[name="canonicalUrl"][id="canonical-url"]').type(tag.metaUrl);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Stay').click();
            cy.wait(5000);
          }
        });
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
      });
    });
  });

  it("Debería crear múltiples tags con twitter title inválida exitosamente con datos aleatorios", () => {
    const numTags = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numTags; i++) {
      const nombre = faker.lorem.words(3);
      const slug = faker.lorem.slug();
      const descripcion = faker.lorem.sentence();
      const color = faker.internet.color().replace('#', '')
      const twitterDescription = faker.lorem.words(3);
      let twitterTitle = '';
      while (twitterTitle.length <= 501) {
        twitterTitle += faker.lorem.sentence() + ' ';
      }
      twitterTitle = twitterTitle.trim();

      cy.visit("/#/tags");
      cy.wait(2000);

      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

        cy.get('input[name="name"][id="tag-name"]').type(nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(color);
        cy.get('input[name="slug"][id="tag-slug"]').type(slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="twitterTitle"][id="twitter-title"]').type(twitterTitle);
        cy.get('textarea[name="twitterDescription"][id="twitter-description"]').type(twitterDescription);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
        cy.visit("/#/tags");
        cy.wait(2000);
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Leave').click();
            cy.wait(5000);
          }
        });
        cy.wait(2000);
    }
  });

  it("Debería crear múltiples tags con twitter description inválida exitosamente con datos aleatorios", () => {
    const numTags = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numTags; i++) {
      const nombre = faker.lorem.words(3);
      const slug = faker.lorem.slug();
      const descripcion = faker.lorem.sentence();
      const color = faker.internet.color().replace('#', '')
      const twitterTitle = faker.lorem.words(3);
      let twitterDescription = '';
      while (twitterDescription.length <= 501) {
        twitterDescription += faker.lorem.sentence() + ' ';
      }
      twitterDescription = twitterDescription.trim();

      cy.visit("/#/tags");
      cy.wait(2000);

      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

        cy.get('input[name="name"][id="tag-name"]').type(nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(color);
        cy.get('input[name="slug"][id="tag-slug"]').type(slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="twitterTitle"][id="twitter-title"]').type(twitterTitle);
        cy.get('textarea[name="twitterDescription"][id="twitter-description"]').type(twitterDescription);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
        cy.visit("/#/tags");
        cy.wait(2000);
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Leave').click();
            cy.wait(5000);
          }
        });
        cy.wait(2000);
    }
  });

  it("Debería crear múltiples tags con facebook title inválida exitosamente con datos aleatorios", () => {
    const numTags = faker.datatype.number({ min: 1, max: 10 });

    for (let i = 0; i < numTags; i++) {
      const nombre = faker.lorem.words(3);
      const slug = faker.lorem.slug();
      const descripcion = faker.lorem.sentence();
      const color = faker.internet.color().replace('#', '')
      const facebookDescription = faker.lorem.words(3);
      let facebookTitle = '';
      while (facebookTitle.length <= 501) {
        facebookTitle += faker.lorem.sentence() + ' ';
      }
      facebookTitle = facebookTitle.trim();

      cy.visit("/#/tags");
      cy.wait(2000);

      cy.get('a[href="#/tags/new/"].gh-btn.gh-btn-primary')
        .contains('New tag')
        .click();

        cy.get('input[name="name"][id="tag-name"]').type(nombre);
        cy.get('.input-color input[name="accent-color"]').eq(0).type(color);
        cy.get('input[name="slug"][id="tag-slug"]').type(slug);
        cy.get('textarea[name="description"][id="tag-description"]').type(descripcion);
        cy.wait(1000);
        cy.get('.gh-expandable .gh-btn-expand').each(($btnExpand) => {
          cy.wrap($btnExpand).click();
          cy.wait(3000);
        });
        cy.get('input[name="ogTitle"][id="og-title"]').type(facebookTitle);
        cy.get('textarea[name="ogDescription"][id="og-description"]').type(facebookDescription);
        cy.wait(2000);
        cy.get("span").contains("Save").click();
        cy.wait(2000);
        cy.visit("/#/tags");
        cy.wait(2000);
        cy.get('body').then($body => {
          if ($body.find('.modal-content').length > 0) {
            cy.get('.modal-content').should('be.visible');
            cy.wait(3000);
            cy.get('.modal-footer').find('button').contains('Leave').click();
            cy.wait(5000);
          }
        });
        cy.wait(2000);
    }
  });
});
