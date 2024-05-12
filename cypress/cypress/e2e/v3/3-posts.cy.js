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
        cy.get('#ember12 > span').click({force: true});  
        
    }
    it('debería crear y luego editar un borrador', () => {
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('.gh-editor-title').type('alimentación{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type('Una buena alimentación es buena para la salud');
        //click boton publicar
        cy.screenshot('/v3.42/caso11/1-creating-post');
        cy.xpath("//div/span[text()='Publish']").click();
        cy.screenshot('/v3.42/caso11/2-ValidationPublish');
        cy.contains('Set it live now').click();
        cy.screenshot('/v3.42/caso11/3-ValidationMarkPublish');
        cy.xpath("//button/span[text()='Publish']").click();
        cy.contains('Published').should('be.visible');
        cy.screenshot('/v3.42/caso11/4-ValidationMessagePublished');
        cy.contains('Unpublished').click();
        cy.get(".gh-publishmenu-button").click();
        cy.contains("Saved").should('be.visible');
        cy.screenshot('/v3.42/caso11/5-ValidationMessageUnPublished');
        cy.visit('/#/posts?type=draft');
        cy.contains('alimentación').should('exist');
        cy.screenshot('/v3.42/caso11/6-ValidationPostDrafted');
        //edicion
        cy.contains('alimentación').click();
        cy.screenshot('/v3.42/caso11/7-ValidationPostEdited');
        cy.get('.gh-editor-title').clear().type('deporte{enter}');
        //click boton publicar
        cy.screenshot('/v3.42/caso11/8-changingPostValues');
        cy.xpath("//div/span[text()='Publish']").click();
        cy.screenshot('/v3.42/caso11/9-ValidationPublishEditing');
        cy.contains('Set it live now').click();
        cy.screenshot('/v3.42/caso11/10-ValidationMarkPublishEditing');
        cy.xpath("//button/span[text()='Publish']").click();
        cy.contains('Published').should('be.visible');
        cy.screenshot('/v3.42/caso11/11-ValidationMessagePublishedEditing');
        cy.contains('Unpublished').click();
        cy.screenshot('/v3.42/caso11/12-ValidationMessageUnPublishedEditing');
        cy.get(".gh-publishmenu-button").click();
        cy.contains("Saved").should('be.visible');
        cy.screenshot('/v3.42/caso11/13-ValidationMessageSavedEditing');
        cy.visit('/#/posts?type=draft');
        cy.contains('deporte').should('exist');
        cy.screenshot('/v3.42/caso11/14-ValidationPostinDraftEdited');
             
    });

    

    
    
    it('Crear Draft Post y publicarlo y verificarlo en posts Publicados', () => {
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('.gh-editor-title').type('New post for publishing{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type('Una buena alimentación es buena para la salud');
        //click boton publicar
        cy.screenshot('/v3.42/caso15/1-creating-post');
        cy.xpath("//div/span[text()='Publish']").click();
        cy.screenshot('/v3.42/caso15/2-ValidationPublish');
        cy.contains('Set it live now').click();
        cy.screenshot('/v3.42/caso15/3-ValidationMarkPublish');
        cy.xpath("//button/span[text()='Publish']").click();
        cy.contains('Published').should('be.visible');
        cy.screenshot('/v3.42/caso15/4-ValidationMessagePublished');
        cy.visit('/#/posts?type=published');
        cy.contains('New post for publishing').should('exist');
        cy.screenshot('/v3.42/caso15/5-ValidationpostPublished');
        //-----------------------------------
        
        
        
    });

   
});
