require('cypress-xpath');
describe('Create Post draft in Ghost', () => {
    
    
    beforeEach(() => {
        login();
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Uncaught exception', err);
            return false;});
    });

    it('debería crear y luego editar un borrador', () => {
        cy.visit('/ghost/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type('alimentación{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type('Una buena alimentación es buena para la salud');
        //click boton publicar
        cy.xpath('//span[normalize-space()=\'Publish\']').click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        //accediendo a la ruta draft
        cy.visit('/ghost/#/posts?type=draft');
        //busca el post con el paramentro y le da click
        cy.contains('alimentación').click();
        //se limpia el campo titilo y se le coloca otro valor
        cy.get('div[contenteditable="true"]').first().clear().type('deporte');
        //click boton publicar
        cy.xpath("//span[normalize-space()=\'Publish\']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        // se valida que la actualizacion del titulo estuvo bien
        cy.contains('deporte').should('exist');
       
    });

    
    it('debería crear un draft post sin descripción', () => {
        cy.visit('/ghost/#/editor/post');
        cy.get('textarea[placeholder="Post title"]', { timeout: 10000 }).should('be.visible').type('cocina{enter}');
        cy.xpath("//span[normalize-space()='Publish']", { timeout: 10000 }).should('be.visible').click();
        cy.contains('Ready, set, publish. Share it with the world.', { timeout: 10000 }).should('be.visible');
    });
    

    
    

    it('debería verificar que el botón de publicar esté presente cuando son solo caracteres especiales', () => {
        const specialChars = '!@#$%^&*()_+{}:"<>?[];\',./`~';
        const titleWithSpecialChars = new Array(5)
            .fill(null)
            .map(() => specialChars[Math.floor(Math.random() * specialChars.length)])
            .join('');
        cy.visit('/ghost/#/editor/post');
        cy.url().should('include', '/ghost/#/editor/post');
        cy.get('textarea[placeholder="Post title"]', { timeout: 10000 })
            .should('be.visible')
            .type(titleWithSpecialChars, { parseSpecialCharSequences: false })
            .type('{enter}');
        cy.xpath('//span[normalize-space()="Publish"]').should('exist');
    });

    it('debería crear un draft post con título y descripción validando la cantidad de palabras.', () => {
        cy.visit('/ghost/#/editor/post');
        cy.url().should('include', '/ghost/#/editor/post');
        cy.get('textarea[placeholder="Post title"]', { timeout: 10000 }).should('be.visible').type('Música');
        cy.get('div[data-kg="editor"]').click({ force: true }).type('La música alegra y reconforta el alma', { force: true });
        cy.get('.gh-editor-wordcount').invoke('text').then(wordCountText => {
            const wordCount = parseInt(wordCountText.match(/\d+/)[0], 10);
            expect(wordCount).to.be.at.least(1);
        });
    });
    
    it('debería crear un draft post con un título y contenido con caracteres especiales', () => {
        const specialCharacters = '!@#$%^&*()_+{}:"<>?[];\',./`~';
        cy.visit('/ghost/#/editor/post');
        cy.url().should('include', '/ghost/#/editor/post');
        cy.get('textarea[placeholder="Post title"]', { timeout: 10000 }).should('be.visible').type('Paramédicos');
    
        
        cy.get('div[data-kg="editor"]').click({ force: true }).type(specialCharacters, { force: true });
    
        
        cy.xpath('//span[normalize-space()="Publish"]').should('be.visible').click();
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
    });

   
});
function login(){
    cy.visit('https://ghost-grupo-11.onrender.com/ghost/#/signin');
    cy.get('input[name="identification"]').type('df.guerrerov1@uniandes.edu.co');
    cy.get('input[name="password"]').type('qwerty1234');
    cy.get('button[type="submit"]').click();
}