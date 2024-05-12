require('cypress-xpath');
describe('Create Post draft in Ghost', () => {
 
    const versionFolder = Cypress.config('baseFolder568');  
    const caseFolder = `${versionFolder}caso11`;  
 
    beforeEach(() => {
        login();
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.error('Uncaught exception', err);
            return false;});
    });
    function login(){
        cy.visit("/#/signin");
        cy.fixture("login.env.json").then((login) => {
          cy.get('input[name="identification"]').type(login.userName);
          cy.get('input[name="password"]').type(login.password);
          });
        cy.get('#ember10 > span').click({force: true});  
        
    }
    it('debería crear y luego editar un borrador', () => {
        
        
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type('alimentación{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type('Una buena alimentación es buena para la salud');
        //click boton publicar
        cy.screenshot('/v5.68/caso11/1-creating-draft');
        cy.xpath("//button/span[text()='Publish']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.68/caso11/2-ValidationSucessMesaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        //y.xpath("//a/span[text()='Posts']").click();
        cy.visit('/#/posts?type=draft');
        cy.wait(500)
        cy.screenshot('/v5.68/caso11/3-ValidationItemCreated');
        cy.contains('alimentación').should('exist');
        cy.wait(500);
        
        //busca el post con el paramentro y le da click
        cy.contains('alimentación').click();
        //se limpia el campo titilo y se le coloca otro valor
        cy.screenshot('/v5.68/caso11/4-ValidationItemForEditing');
        cy.get('textarea[placeholder="Post title"]').first().clear().type('deporte');
        cy.wait(500);
        cy.screenshot('/v5.68/caso11/5-editing-draft-tittle.png');
        //click boton publicar
        cy.xpath("//span[normalize-space()=\'Publish\']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.68/caso11/6-ValidationSucessMesajeEdition');
        // se valida que la actualizacion del titulo estuvo bien
        cy.visit('/#/posts?type=draft');
        cy.contains('deporte').should('exist');
        cy.wait(500);
        cy.screenshot('/v5.68/caso11/7-editing-draft-ValidationItemEdited.png');
              
    });

    
    it('debería crear un draft post sin descripción', () => {
        
        cy.visit('/#/editor/post');
        cy.get('textarea[placeholder="Post title"]', { timeout: 10000 }).should('be.visible').type('cocina{enter}');
        cy.screenshot('/v5.68/caso12/1-creating-draft');
        cy.xpath("//span[normalize-space()='Publish']", { timeout: 10000 }).should('be.visible').click();
        cy.contains('Ready, set, publish. Share it with the world.', { timeout: 10000 }).should('be.visible');
        cy.screenshot('/v5.68/caso12/2-ValidationSucessMesaje');
        cy.visit('/#/posts?type=draft');
        cy.contains('cocina').should('exist');
        cy.screenshot('/v5.68/caso12/3-ValidationItemCreated.png');
        
    });
    

    
    

    it('debería eliminar un draft post creado', () => {
        
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type('New post for deleting{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type('Esta es la prueba de un post para eliminar');
        //click boton publicar
        cy.wait(500);
        cy.screenshot('/v5.68/caso13/1-creating-draft.png');
        cy.xpath('//span[normalize-space()=\'Publish\']').click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.68/caso13/2-ValidationSucessMesaje');
        //click botón Editing
        cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        cy.screenshot('/v5.68/caso13/3-ValidationEditorButton');    
        //Accediendo al botón Setings
        cy.get('.settings-menu-toggle').click({force: true});
        cy.screenshot('/v5.68/caso13/4-ValidationSettingsButton');    
        //Accediendo al botón Delete
        cy.xpath("//button/span[text()=' Delete ']").click({force: true});
        cy.contains('Are you sure you want to delete this post?').should('be.visible');
        cy.wait(500);
        cy.screenshot('/v5.68/caso13/5-validationMessageDelete');        
        //click botón eliminar del Modal
        cy.xpath("//button/span[text()='Delete']").click();
        cy.screenshot('/v5.68/caso13/6-ValidationDeleteButton');    
        cy.visit('/#/editor/post');
        cy.contains('New post for deleting').should('not.exist');
        cy.wait(500);
        cy.screenshot('/v5.68/caso13/7-ValidationItemDeleted');



    });

    it('Cancelar la eliminacion de un draft post creado', () => {
        
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type('New post for canceling{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type('Esta es la prueba de un post para cancelar la eliminación');
        //click boton publicar
        cy.wait(500);
        cy.screenshot('/v5.68/caso14/1-creating-draft.png');
        cy.xpath('//span[normalize-space()=\'Publish\']').click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.68/caso14/2-ValidationSucessMesaje');
        //click botón Editing
        cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        cy.screenshot('/v5.68/caso14/3-validationEditorButton');    
        //Accediendo al botón Setings
        cy.get('.settings-menu-toggle').click({force: true});
        //Accediendo al botón Delete
        cy.screenshot('/v5.68/caso14/4-validationSettingsButton');   
        cy.xpath("//button/span[text()=' Delete ']").click({force: true});
        cy.screenshot('/v5.68/caso14/5-validationDeleteButton');   
        cy.contains('Are you sure you want to delete this post?').should('be.visible');
        cy.wait(500);
        cy.screenshot('/v5.68/caso14/6-validationMessageDelete');
           
        //click botón cancelar del Modal
        cy.xpath("//button/span[text()='Cancel']").click();
        cy.screenshot('/v5.68/caso14/7-validationCancelButton');
        cy.xpath("//a/span[text()='Posts']").click();
        cy.contains('New post for canceling').should('exist');
        cy.wait(500);
        cy.screenshot('/v5.68/caso14/8-ValidationItemCanceled');
    });
    
    it('Crear Draft Post y publicarlo y verificarlo en posts Publicados', () => {
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type('New post for publishing{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type('Creación de Post para publicarlo');
        //click boton publicar
        cy.screenshot('/v5.68/caso15/1-creating-draft');
        cy.xpath("//button/span[text()='Publish']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.68/caso15/2-ValidationSucessMessaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        //boton publicar
        cy.get(".gh-publish-cta").click();
        cy.screenshot('/v5.68/caso15/3-ValidationSucessContinue');
        cy.xpath("//button/span[text()='Publish post, right now']").click();
        cy.screenshot('/v5.68/caso15/4-ValidationConfirmationPublish');
        //mesaje de validacion de la publicacion
        cy.contains('Boom. It’s out there.').should('be.visible');
        cy.screenshot('/v5.68/caso15/5-ValidationSucessMessajePublish');
        cy.visit('/#/posts?type=published');
        cy.wait(500);
        cy.screenshot('/v5.68/caso15/6-ValidationItemPublished');
        cy.contains('New post for publishing').should('exist');
        
        
    });

   
});
		
