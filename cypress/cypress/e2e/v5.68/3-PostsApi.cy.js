const axios = require('axios');

describe('Pruebas de creación de posts con datos pseudoaleatorios', () => {
    let testData;

    before(() => {
        // URL de la API generada en Mockaroo
        const apiUrl = 'https://my.api.mockaroo.com/test_schema.json?key=3aaac260';

        // Solicitud HTTP para obtener los datos
        cy.request({
            method: 'GET',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            testData = response.body; // Guardar los datos obtenidos
            cy.wrap(testData).as('testData');
        });
    });

    beforeEach(function() {
        const testData = this.testData;

        if (testData && testData.length > 0) {
            const firstData = testData[0];
            cy.visit('/#/signin');
            cy.get('input[name="identification"]').type(firstData.username);
            cy.get('input[name="password"]').type(firstData.password);
            cy.get('button[type="submit"]').click();

            cy.url().should('include', '/#/dashboard');
        } else {
            throw new Error('No se encontraron datos de prueba');
        }
    });

    it('Debería crear un post con datos de la API', function() {
        const testData = this.testData;
        if (testData && testData.length > 0) {
            const data = testData[0];

            cy.visit('/#/editor/post');
            cy.get('textarea[placeholder="Post title"]').type(data.postTittle + '{enter}');
            cy.get('div[contenteditable="true"]').first().click({ force: true }).type(data.postContent);

            cy.get('button').contains('Publish').click();
            cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
            cy.visit('/#/posts?type=draft');
            cy.contains(data.postTittle).should('exist');
        } else {
            throw new Error('No se encontraron datos de prueba');
        }
    });
});
