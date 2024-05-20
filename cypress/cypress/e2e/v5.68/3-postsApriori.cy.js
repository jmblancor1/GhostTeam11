describe('Pruebas de creación de posts con datos a priori', () => {
    let testData = [];

    before(() => {
        // Cargar los datos desde el archivo JSON en fixtures
        cy.fixture('MockDataPost').then((data) => {
            testData = data;
        });
    });

    beforeEach(() => {
        // Verificar que testData no es undefined
        if (!testData || testData.length === 0) {
            throw new Error('No se encontraron datos de prueba');
        }

        // Loguear al usuario usando el primer conjunto de datos
        const firstData = testData[0];
        cy.visit('/#/signin');
        cy.get('input[name="identification"]').type(firstData.username);
        cy.get('input[name="password"]').type(firstData.password);
        cy.get('button[type="submit"]').click();

        // Esperar a que el usuario esté logueado
        cy.url().should('include', '/#/dashboard');
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Uncaught exception', err);
            return false;
        });
    });

    // Registrar las pruebas después de que los datos hayan sido cargados
    it('Debería crear posts con los datos cargados', () => {
        // Verificar que testData tiene elementos
        if (testData && testData.length > 0) {
            testData.forEach((data, index) => {
                cy.log(`Creando post con el conjunto de datos ${index + 1}`);

                // Crear un nuevo post
                cy.visit('/#/editor/post');
                if (data.postTitle) {
                    cy.get('textarea[placeholder="Post title"]').type(data.postTitle);
                }
                cy.get('div[contenteditable="true"]').first().click({force: true}).type(data.postContent);

                // Publicar el post
                cy.get('button').contains('Publish').click();
                cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
                cy.visit('/#/posts?type=draft');
                cy.contains(data.postTitle).should('exist');
            });
        } else {
            throw new Error('No se encontraron datos de prueba');
        }
    });
});

