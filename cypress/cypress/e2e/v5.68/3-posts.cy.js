require('cypress-xpath');
import {faker} from '@faker-js/faker'
import { forEach } from 'lodash';
import 'cypress-iframe';
require('cypress-plugin-tab')
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
    it('61-Debería crear un post borrador', () => {
        const postTitle = faker.lorem.sentence();
        const postTitleUpdate = 'Titulo Update'+faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        const updatedContent = 'Contenido actualizado ' + faker.lorem.paragraph();
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]',{ timeout: 40000 }).type(postTitle + '{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        //click boton publicar
        cy.screenshot('/v5.14/caso61/1-creating-draft',{ timeout: 60000 });
        cy.xpath("//button/span[text()='Publish']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso61/2-ValidationSucessMesaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        
              
    });

    it('62-Debería crear y luego editar un post borrador', () => {
        const postTitle = faker.lorem.sentence();
        const postTitleUpdate = 'Titulo Update'+faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        const updatedContent = 'Contenido actualizado ' + faker.lorem.paragraph();
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]',{ timeout: 40000 }).type(postTitle + '{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        //click boton publicar
        cy.screenshot('/v5.14/caso62/1-creating-draft',{ timeout: 60000 });
        cy.xpath("//button/span[text()='Publish']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso62/2-ValidationSucessMesaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        //y.xpath("//a/span[text()='Posts']").click();
        cy.visit('/#/posts?type=draft');
        cy.wait(500)
        cy.screenshot('/v5.14/caso62/3-ValidationItemCreated');
        cy.contains(postTitle).should('exist');
        cy.wait(500);
        
        //busca el post con el paramentro y le da click
        cy.contains(postTitle).click();
        //se limpia el campo titilo y se le coloca otro valor
        cy.screenshot('/v5.14/caso62/4-ValidationItemForEditing');
        cy.get('textarea[placeholder="Post title"]').first().clear().type(postTitleUpdate);
        cy.wait(500);
        cy.screenshot('/v5.14/caso62/5-editing-draft-tittle.png');
        //click boton publicar
        cy.xpath("//span[normalize-space()=\'Publish\']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso62/6-ValidationSucessMesajeEdition');
        // se valida que la actualizacion del titulo estuvo bien
        cy.visit('/#/posts?type=draft');
        cy.contains(postTitleUpdate).should('exist');
        cy.wait(500);
        cy.screenshot('/v5.14/caso62/7-editing-draft-ValidationItemEdited.png');
              
    });

    
    it('63-Debería crear un draft post sin descripción', () => {
        const postTitle = faker.lorem.sentence();
        cy.visit('/#/editor/post');
        cy.get('textarea[placeholder="Post title"]', { timeout: 30000 }).should('be.visible').type(postTitle + '{enter}');
        cy.screenshot('/v5.14/caso63/1-creating-draft',{ timeout: 60000 });
        cy.xpath("//span[normalize-space()='Publish']", { timeout: 30000 }).should('be.visible').click();
        cy.contains('Ready, set, publish. Share it with the world.', { timeout: 10000 }).should('be.visible');
        cy.screenshot('/v5.14/caso63/2-ValidationSucessMesaje');
        cy.visit('/#/posts?type=draft');
        cy.contains(postTitle).should('exist');
        cy.screenshot('/v5.14/caso63/3-ValidationItemCreated.png');
        
    });
    

    
    

    it('64-Debería eliminar un draft post creado', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type(postTitle + '{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        //click boton publicar
        cy.wait(500);
        cy.screenshot('/v5.14/caso64/1-creating-draft.png', { timeout: 60000 });
        cy.xpath('//span[normalize-space()=\'Publish\']').click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso64/2-ValidationSucessMesaje');
        //click botón Editing
        cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        cy.screenshot('/v5.14/caso64/3-ValidationEditorButton');    
        //Accediendo al botón Setings
        cy.get('.settings-menu-toggle').click({force: true});
        cy.screenshot('/v5.14/caso64/4-ValidationSettingsButton');    
        //Accediendo al botón Delete
        cy.xpath("//button/span[text()=' Delete ']").click({force: true});
        cy.contains('Are you sure you want to delete this post?').should('be.visible');
        cy.wait(500);
        cy.screenshot('/v5.14/caso64/5-validationMessageDelete');        
        //click botón eliminar del Modal
        cy.xpath("//button/span[text()='Delete']").click();
        cy.screenshot('/v5.14/caso64/6-ValidationDeleteButton');    
        cy.visit('/#/posts?type=draft');
        cy.contains(postTitle).should('not.exist');
        cy.wait(500);
        cy.screenshot('/v5.14/caso64/7-ValidationItemDeleted');



    });

    it('65-Cancelar la eliminacion de un draft post creado', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type(postTitle+'{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        //click boton publicar
        cy.wait(500);
        cy.screenshot('/v5.14/caso65/1-creating-draft.png',{ timeout: 60000 });
        cy.xpath('//span[normalize-space()=\'Publish\']').click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso65/2-ValidationSucessMesaje');
        //click botón Editing
        cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        cy.screenshot('/v5.14/caso65/3-validationEditorButton');    
        //Accediendo al botón Setings
        cy.get('.settings-menu-toggle').click({force: true});
        //Accediendo al botón Delete
        cy.screenshot('/v5.14/caso65/4-validationSettingsButton');   
        cy.xpath("//button/span[text()=' Delete ']").click({force: true});
        cy.screenshot('/v5.14/caso65/5-validationDeleteButton');   
        cy.contains('Are you sure you want to delete this post?').should('be.visible');
        cy.wait(500);
        cy.screenshot('/v5.14/caso65/6-validationMessageDelete');
           
        //click botón cancelar del Modal
        cy.xpath("//button/span[text()='Cancel']").click();
        cy.screenshot('/v5.14/caso65/7-validationCancelButton');
        cy.xpath("//a/span[text()='Posts']").click();
        cy.contains(postTitle).should('exist');
        cy.wait(500);
        cy.screenshot('/v5.14/caso65/8-ValidationItemCanceled');
    });
    
    it('66-Crear Draft Post y publicarlo y verificarlo en posts Publicados', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type(postTitle+'{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        //click boton publicar
        cy.wait(500);
        cy.screenshot('/v5.14/caso66/1-creating-draft');
        cy.xpath("//button/span[text()='Publish']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso66/2-ValidationSucessMessaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        //boton publicar
        cy.get(".gh-publish-cta").click();
        cy.screenshot('/v5.14/caso66/3-ValidationSucessContinue');
        cy.xpath("//button/span[text()='Publish post, right now']").click();
        //mesaje de validacion de la publicacion
        cy.wait(10000);
        cy.contains('Boom. It’s out there.').should('be.visible');
        cy.screenshot('/v5.14/caso66/4-ValidationSucessMessajePublish');
        cy.visit('/#/posts?type=published');
        cy.wait(500);
        cy.screenshot('/v5.14/caso66/5-ValidationItemPublished');
        cy.contains(postTitle).should('exist');
        
        
    });
    it('67-Debería verificar que el botón de publicar esté presente cuando son solo caracteres especiales', () => {
        const specialChars = '!@#$%^&*()_+{}:"<>?[];\',./`~';
        const titleWithSpecialChars = new Array(5)
            .fill(null)
            .map(() => specialChars[Math.floor(Math.random() * specialChars.length)])
            .join('');
        cy.visit('/#/editor/post');
        cy.url().should('include', '/ghost/#/editor/post');
        cy.get('textarea[placeholder="Post title"]', { timeout: 10000 })
            .should('be.visible')
            .type(titleWithSpecialChars, { parseSpecialCharSequences: false })
            .type('{enter}');
        cy.screenshot('/v5.14/caso67/1-ValidationButtonPublish');
        cy.xpath('//span[normalize-space()="Publish"]').should('exist');
    });

    it('68-Debería crear un draft post con título y descripción validando la cantidad de palabras.', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        cy.url().should('include', '/ghost/#/editor/post');
        cy.get('textarea[placeholder="Post title"]', { timeout: 10000 }).should('be.visible').type(postTitle);
        cy.get('div[data-kg="editor"]').click({ force: true }).type(postContent,{ force: true });
        cy.wait(500);
        cy.screenshot('/v5.14/caso68/1-creatingDraft');
        cy.get('.gh-editor-wordcount').invoke('text').then(wordCountText => {
            const wordCount = parseInt(wordCountText.match(/\d+/)[0], 10);
            expect(wordCount).to.be.at.least(1);
        cy.screenshot('/v5.14/caso68/2-countingWords');    
        });
    });
    
    it('69-Debería crear un draft post con un título y contenido con caracteres especiales', () => {
        const specialCharacters = '!@#$%^&*()_+{}:"<>?[];\',./`~';
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        cy.url().should('include', '/ghost/#/editor/post');
        cy.get('textarea[placeholder="Post title"]', { timeout: 10000 }).should('be.visible').type(postTitle);
        cy.get('div[data-kg="editor"]').click({ force: true }).type(specialCharacters, { force: true });
        cy.wait(500);
        cy.screenshot('/v5.14/caso69/1-creatingDraft',{ timeout: 40000 });  
        cy.xpath('//span[normalize-space()="Publish"]').should('be.visible').click();
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso69/2-sucessMessage');  
    });

    it('70-Debería crear un draft post con un título aleatorio y contenido con caracteres especiales', () => {
        const randomTitle = faker.lorem.sentence();
        const specialCharactersContent = '!#$%^&*()_+=-[]{};:<>?,./';
        cy.visit('/#/editor/post');
        cy.url().should('include', '/ghost/#/editor/post');
        cy.get('textarea[placeholder="Post title"]', { timeout: 10000 }).should('be.visible').type(randomTitle);
        //cy.xpath('//p[@data-koenig-dnd-droppable="true"]')
            //.first()
            //.click({force: true})
            //.type(specialCharactersContent,{ force: true });
        cy.get('[contenteditable="true"]').first().click({ force: true }).type(specialCharactersContent, { force: true });    
        cy.wait(500);
        cy.screenshot('/v5.14/caso70/1-creatingDraft',{ timeout: 10000 });     
        cy.xpath('//span[normalize-space()="Publish"]').click();
        cy.screenshot('/v5.14/caso70/1-sucessMessage');  
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
    });

    it('71-Debería crear un post sin título pero con contenido aleatorio', () => {
        const randomContent = faker.lorem.paragraphs(3);
        cy.visit('/#/editor/post');
        cy.url().should('include', '/ghost/#/editor/post');
        //cy.xpath('//p[@data-koenig-dnd-droppable="true"]')
        cy.get('[contenteditable="true"]')
            .first()
            .click({force: true})
            .type(randomContent,{ force: true });
        cy.wait(500);    
        cy.screenshot('/v5.14/caso71/1-creatingDraft',{ timeout: 40000 });     
        cy.xpath('//span[normalize-space()="Publish"]').click();
        cy.screenshot('/v5.14/caso71/2-sucessMessage'); 
                
    });

    it('72-Crear Draft Post y publicarlo y verificarlo en posts Publicados y despublicarlo', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type(postTitle+'{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        //click boton publicar
        cy.screenshot('/v5.14/caso72/1-creating-draft',{ timeout: 40000 });
        cy.xpath("//button/span[text()='Publish']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso72/2-ValidationSucessMessaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        //boton publicar
        cy.get(".gh-publish-cta").click();
        cy.screenshot('/v5.14/caso72/3-ValidationSucessContinue');
        cy.xpath("//button/span[text()='Publish post, right now']").click();
        //mesaje de validacion de la publicacion
        cy.contains('Boom. It’s out there.').should('be.visible');
        cy.screenshot('/v5.14/caso72/4-ValidationSucessMessajePublish');
        cy.visit('/#/posts?type=published');
        cy.wait(500);
        cy.screenshot('/v5.14/caso72/5-ValidationItemPublished');
        cy.contains(postTitle).should('exist');
        cy.contains(postTitle).click({force: true});
        cy.screenshot('/v5.14/caso72/6-accessItemPublished');
        cy.xpath("//button/span[text()='Unpublish']").click({force: true});
        cy.screenshot('/v5.14/caso72/7-accessUnPublished');
        cy.contains('This post has been published').should('be.visible');
        cy.contains('Unpublish and revert to private draft').click();
        cy.screenshot('/v5.14/caso72/8-comfirnUnPublished');
        cy.contains('Post successfully reverted to a draft.').should('be.visible')
        
        
    });
    it('73-Debería crear un Featured Post y validarlo en el listado fitrado "Featured"', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        
        // Escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type(postTitle + '{enter}');
        
        // Escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        cy.wait(500);
        cy.screenshot('/v5.14/caso73/1-creating-draft', { timeout: 40000 });
        
        // Acceder al botón Settings
        cy.get('.settings-menu-toggle').click({force: true});
        cy.screenshot('/v5.14/caso73/2-accessSettings');
        
        // Marcar el check featured this post
        cy.get('.input-toggle-component').click();
        cy.screenshot('/v5.14/caso73/3-checkFeatured');
    
        cy.xpath("//button/span[text()='Publish']").click();
        
        // Validar la creación exitosa del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso73/4-ValidationSucessMessaje');
        
        cy.visit('/#/posts?type=draft');
        cy.screenshot('/v5.14/caso73/5-listAllPost');
        
        // Abrir el dropdown del filtro
        cy.get('.ember-power-select-selected-item').first().click();
        cy.screenshot('/v5.14/caso73/6-selectFeatured');
        
        // Seleccionar la opción "Featured posts"
        cy.get('.ember-power-select-option').contains('Featured posts').click();
        cy.screenshot('/v5.14/caso73/7-confirmFeatured');
        
        // Validar que el post se encuentra en la lista de "Featured posts"
        cy.contains(postTitle).should('exist');
    });
    it('74-crear un draft Post y validarlo en el listado fitrado "Draft Post"', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type(postTitle+'{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        
        cy.screenshot('/v5.14/caso74/1-creating-draft',{ timeout: 10000 });
        
        cy.xpath("//button/span[text()='Publish']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso74/2-ValidationSucessMessaje');
        cy.visit('/#/posts?type=draft');
        cy.screenshot('/v5.14/caso74/3-listAllPost');
        cy.get('.ember-power-select-selected-item').first().click();
        cy.screenshot('/v5.14/caso74/4-selectFeatured');
        cy.contains('Draft posts').click();
        cy.screenshot('/v5.14/caso74/5-confirmFeatured');
        cy.contains(postTitle).should('exist');
    });
    it('75-crear un draft Post publicarlo y validarlo en el listado fitrado "Published posts"', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type(postTitle+'{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        //click boton publicar
        cy.wait(500);
        cy.screenshot('/v5.14/caso75/1-creating-draft',{ timeout: 60000 });
        cy.xpath("//button/span[text()='Publish']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso75/2-ValidationSucessMessaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        //boton publicar
        cy.get(".gh-publish-cta").click();
        cy.screenshot('/v5.14/caso75/3-ValidationSucessContinue');
        cy.xpath("//button/span[text()='Publish post, right now']").click({force:true});
        //mesaje de validacion de la publicacion
        cy.wait(1000);
        cy.contains('Boom. It’s out there.',{ timeout: 60000 }).should('be.visible');
        cy.screenshot('/v5.14/caso75/4-ValidationSucessMessajePublish');
        cy.visit('/#/posts?type=draft');
        cy.screenshot('/v5.14/caso75/5-listAllPost');
         // Abrir el dropdown del filtro
        cy.get('.ember-power-select-selected-item').first().click();
        cy.screenshot('/v5.14/caso75/6-selectFeatured');
         
        // Seleccionar la opción "Featured posts"
        cy.get('.ember-power-select-option').contains('Published posts').click();
        cy.screenshot('/v5.14/caso75/7-confirmFeatured');
        cy.contains(postTitle).should('exist');
    });

    it('76-Crear un post draft con hora de publicación incorrecto', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        
        // Generar una fecha de nacimiento (tipo Date)
        const birthDate = faker.date.birthdate();
        // Convertir la fecha a una cadena de texto en un formato incorrecto para la publicación
        const invalidDateString = `${birthDate.getDate()}/${birthDate.getMonth() + 1}/${birthDate.getFullYear()} 25:61`; // formato inválido deliberadamente
    
        cy.visit('/#/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle + '{enter}');
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        cy.wait(500);
        cy.screenshot('/v5.14/caso76/1-creating-draft',{ timeout: 60000 });
        // Accediendo a los ajustes del post
        cy.get('.settings-menu-toggle').click({force: true});
        cy.screenshot('/v5.14/caso76/2-accessSettings');
        cy.get('div.gh-date-time-picker-time').within(() => {
            cy.get('input[type="text"]').should('be.visible').clear().type(invalidDateString, { force: true });
        });
        cy.screenshot('/v5.14/caso76/3-enterTime');
        cy.xpath("//button/span[text()='Publish']").click();
        cy.screenshot('/v5.14/caso76/3-errorMessage');
        cy.get('body').then($body => {
            if ($body.find('.gh-alert-red').length > 0) {
                cy.get('.gh-alert-red', { timeout: 10000 }).should('exist').then(alert => {
                    if (alert.is(':visible')) {
                        cy.get('.gh-alert-close').click();
                        cy.log('Alerta superior cerrada');
                    } else {
                        cy.log('La alerta no está visible');
                    }
                });
            } else {
                cy.log('La alerta no está presente en el DOM');
            }
        });
        // Esperar y verificar que el mensaje de error de formato se muestra
        cy.contains('Must be in format', { timeout: 10000 }).should('be.visible');
        
    });

    it('77-Crear un post draft con hora de publicación mayor a la actual', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        
        cy.visit('/#/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle + '{enter}');
        cy.get('div[contenteditable="true"]').first().click({ force: true }).type(postContent);
        cy.wait(500);
        cy.screenshot('/v5.14/caso77/1-creating-draft', { timeout: 60000 });
    
        // Accediendo a los ajustes del post
        cy.get('.settings-menu-toggle').click({ force: true });
        cy.screenshot('/v5.14/caso77/2-accessSettings');
    
        // Espera explícitamente por la visibilidad del input y luego intenta interactuar
        cy.get('div.gh-date-time-picker-time').within(() => {
            cy.get('input[type="text"]').should('be.visible').clear().then((input) => {
                // Calculando la hora actual más 30 minutos
                const currentTime = new Date();
                currentTime.setMinutes(currentTime.getMinutes() + 30);
                const formattedTime = currentTime.toTimeString().substring(0, 5); // HH:MM format
                cy.wrap(input).type(formattedTime, { force: true });
            });
        });
    
        cy.screenshot('/v5.14/caso77/3-enterTime');
        cy.xpath("//button/span[text()='Publish']").click();
        cy.screenshot('/v5.14/caso77/4-errorMessage');
        cy.get('.gh-alert-red', { timeout: 10000 }).should('exist').then(alert => {
            if (alert.is(':visible')) {
                cy.get('.gh-alert-close').click();
                cy.log('Alerta superior cerrada');
            } else {
                cy.log('La alerta no está visible');
            }
        });
        // Esperar y verificar que el mensaje de error de formato se muestra
        cy.contains('Must be in the past', { timeout: 10000 }).should('be.visible');
        
    });
    
    
    it('78-Crear un post draft con el campo de Author vacío', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        
        cy.visit('/#/editor/post');
        cy.get('textarea[placeholder="Post title"]',{ timeout: 60000 }).type(postTitle + '{enter}');
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        cy.wait(500);
        cy.screenshot('/v5.14/caso78/1-creating-draft',{ timeout: 40000 });
    
        // Accediendo a los ajustes del post
        cy.get('.settings-menu-toggle').click({force: true});
        cy.screenshot('/v5.14/caso78/2-accessSettings');
    
        // Suponiendo que el componente de selección de autores utiliza ember-power-select
        // y que los autores pueden ser eliminados clicando en un elemento con clase específica o botón cerca del nombre del autor.
        cy.get('.ember-power-select-trigger').then(trigger => {
            if (trigger.find('.ember-power-select-multiple-remove-btn').length) {
                cy.get('.ember-power-select-multiple-remove-btn').click({ multiple: true, force: true });
            }
        });
        cy.screenshot('/v5.14/caso78/3-enterAuthor');
    
        cy.xpath("//button/span[text()='Publish']").click();
        cy.screenshot('/v5.14/caso78/4-errorMessage');
        cy.get('.gh-alert-red', { timeout: 10000 }).should('exist').then(alert => {
            if (alert.is(':visible')) {
                cy.get('.gh-alert-close').click();
                cy.log('Alerta superior cerrada');
            } else {
                cy.log('La alerta no está visible');
            }
        });
    
        
        cy.contains('At least one author is required.', { timeout: 60000 }).should('be.visible');
    
    });

    it('79-Crear un post draft programado y validarlo en el acceso a Programado', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        
        cy.visit('/#/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle + '{enter}');
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        cy.wait(500);
        cy.screenshot('/v5.14/caso79/1-creating-draft',{ timeout: 60000 });
         
        cy.xpath("//button/span[text()='Publish']").click();
        cy.screenshot('/v5.14/caso79/2-publishPost');
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso79/3-ValidationSucessMessaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        cy.contains('Right now').click();
        cy.screenshot('/v5.14/caso79/4-accessNow');
        cy.contains('Schedule for later').click();
        cy.screenshot('/v5.14/caso79/5-accessSchedule');
        cy.get('button').contains('Continue, final review').click({ force: true });
        //cy.xpath("//button/span[text()='Publish post, right now']").click({ timeout: 10000 },{force:true});
        cy.screenshot('/v5.14/caso79/6-accessPublishNow');
        //mesaje de validacion de la publicacion
        cy.contains('your post will be published on your site').should('be.visible');
        cy.screenshot('/v5.14/caso78/7-ValidationSucessMessajePublish');
        cy.get('button').contains('Publish post,').click();
        cy.screenshot('/v5.14/caso78/8-confirmPublish');
        cy.contains('All set! Your post will be published today').should('be.visible')
        cy.visit('//#/posts?type=scheduled');
        cy.wait(500);
        cy.screenshot('/v5.14/caso79/9-ValidationItemSchedule');
        cy.contains(postTitle).should('exist');

        
    });
    it('80-Debería crear un post draft programado y luego desprogramarlo', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        
        cy.visit('/#/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle + '{enter}');
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        cy.wait(500);
        cy.screenshot('/v5.14/caso80/1-creating-draft',{ timeout: 60000 });
         
        cy.xpath("//button/span[text()='Publish']").click();
        cy.screenshot('/v5.14/caso80/2-publishPost');
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso80/3-ValidationSucessMessaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        cy.contains('Right now').click();
        cy.screenshot('/v5.14/caso80/4-accessNow');
        cy.contains('Schedule for later').click();
        cy.screenshot('/v5.14/caso80/5-accessSchedule');
        cy.get('button').contains('Continue, final review').click({ force: true });
        //cy.xpath("//button/span[text()='Publish post, right now']").click({ timeout: 10000 },{force:true});
        cy.screenshot('/v5.14/caso80/6-accessPublishNow');
        //mesaje de validacion de la publicacion
        cy.contains('your post will be published on your site').should('be.visible');
        cy.screenshot('/v5.14/caso80/7-ValidationSucessMessajePublish');
        cy.get('button').contains('Publish post,').click();
        cy.screenshot('/v5.14/caso80/8-confirmPublish');
        cy.contains('All set! Your post will be published today').should('be.visible')
        cy.visit('//#/posts?type=scheduled');
        cy.wait(500);
        cy.screenshot('/v5.14/caso80/9-ValidationItemSchedule');
        cy.contains(postTitle).should('exist');
        cy.screenshot('/v5.14/caso80/10-accessAllItemSchedule');
        cy.contains(postTitle).click();
        cy.screenshot('/v5.14/caso80/11-accessItemSchedule');
        cy.get('button').contains('Unschedule').click();
        cy.screenshot('/v5.14/caso80/12-accessUnSchedule');
        cy.contains('This post has been scheduled').should('be.visible');
        cy.screenshot('/v5.14/caso80/13-validationAccessUnSchedule');
        cy.contains('Unschedule and revert to draft').click();
        cy.screenshot('/v5.14/caso80/14-validationConfirmUnSchedule');
        cy.contains('Post successfully reverted to a draft.').should('be.visible');
        cy.screenshot('/v5.14/caso80/15-validationSuccessUnSchedule');


        
    });

    it('81-Crear un post draft y previsualizarlo', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = "Demens depereo degenero dolorum caecus viduo adipiscor deleniti.";
        
        cy.visit('/#/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle + '{enter}');
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        cy.wait(500);
        cy.screenshot('/v5.14/caso81/1-ValuesDraft', { timeout: 60000 });
        cy.get('button').contains('Preview').click();
        cy.screenshot('/v5.14/caso81/2-previewPost');
            
        cy.frameLoaded('.gh-pe-iframe'); // Usa la clase o id del iframe
        cy.iframe().find('p').contains(postContent).should('be.visible');
    });
    
    it('82-Crear un post y validarlo que se muestre en el dashboard', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type(postTitle+'{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        //click boton publicar
        cy.screenshot('/v5.14/caso82/1-creating-draft',{ timeout: 60000 });
        
        cy.xpath("//button/span[text()='Publish']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.wait(500);
        cy.screenshot('/v5.14/caso82/2-ValidationSucessMessaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        
        //boton publicar
        cy.get(".gh-publish-cta").click();
        cy.screenshot('/v5.14/caso82/3-ValidationSucessContinue');
        cy.xpath("//button/span[text()='Publish post, right now']").click({force:true});
        //mesaje de validacion de la publicacion
        cy.contains('Boom. It’s out there.').should('be.visible');
        cy.screenshot('/v5.14/caso82/4-ValidationSucessMessajePublish');
        cy.visit('/#/dashboard')
        cy.screenshot('/v5.14/caso82/5-ValidationPostPublishDash');
        cy.contains(postTitle).should('be.visible');

    });

    
    it.only('83-Crear un post draft y asignarle un tag personalizado', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        const tag = `${faker.hacker.adjective()} ${faker.hacker.noun()}`;
        
        cy.visit('/#/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle + '{enter}');
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        
        cy.screenshot('/v5.14/caso83/1-creating-draft',{ timeout: 60000 });
    
        // Accediendo a los ajustes del post
        cy.get('.settings-menu-toggle').click({force: true});
        cy.screenshot('/v5.14/caso83/2-accessSettings');
        cy.get('.ember-power-select-trigger-multiple-input').first().type(tag+'{enter}')
        // Suponiendo que el componente de selección de autores utiliza ember-power-select
        // y que los autores pueden ser eliminados clicando en un elemento con clase específica o botón cerca del nombre del autor.
        
        cy.screenshot('/v5.14/caso83/3-enterTag');

    
        cy.xpath("//button/span[text()='Publish']").click();
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso83/4-ValidationSucessMessaje');
        cy.visit('/#/tags', {
            onBeforeLoad: (win) => {
                cy.stub(win, 'confirm').callsFake((msg) => {
                    return true; 
                });
            }
        });
        cy.screenshot('/v5.14/caso83/5-ValidationTagCreated');
        cy.contains(tag,{ timeout: 10000}).should('be.visible');
    });
    it.only('84-Crear un post con tag personalizado y en la opción de tags acceder al tag creado', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        const tag = `${faker.hacker.adjective()} ${faker.hacker.noun()}`;
        
        // Interceptar y confirmar automáticamente cualquier diálogo de confirmación que aparezca
        cy.on('window:confirm', () => true);
        
        cy.visit('/#/editor/post');
        cy.get('textarea[placeholder="Post title"]').type(postTitle + '{enter}');
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        cy.screenshot('/v5.14/caso84/1-creating-draft', { timeout: 60000 });
    
        // Accediendo a los ajustes del post
        cy.get('.settings-menu-toggle').click({force: true});
        cy.screenshot('/v5.14/caso84/2-accessSettings');
        
        // Eliminar cualquier tag existente
        cy.get('.ember-power-select-multiple-option .ember-power-select-multiple-remove-btn').each(($el) => {
            cy.wrap($el).click();
        });
    
        // Añadir el nuevo tag
        cy.get('.ember-power-select-trigger-multiple-input', { timeout: 10000 }).first().type(tag + '{enter}');
        cy.screenshot('/v5.14/caso84/3-enterTag');
    
        // Publicar el post
        cy.xpath("//button/span[text()='Publish']").click();
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso84/4-ValidationSucessMessaje');
        
        // Visitar la página de tags y confirmar cualquier diálogo de confirmación
        cy.visit('/#/tags', {
            onBeforeLoad: (win) => {
                cy.stub(win, 'confirm').callsFake((msg) => {
                    return true; // Simula hacer clic en "Leave" en el modal de confirmación
                });
            }
        });
        cy.screenshot('/v5.14/caso84/5-ValidationTag');
        cy.wait(500);
        cy.contains(tag, { timeout: 10000 }).should('be.visible', { timeout: 60000 });
        cy.contains(tag).click();
        cy.screenshot('/v5.14/caso84/6-accessTag');
        cy.contains(tag, { timeout: 10000 }).should('be.visible');
    });
    
    
    it('85-Crear un post y validarlo que se muestre en el dashboard y acceder al post desde el ahi', () => {
        const postTitle = faker.lorem.sentence();
        const postContent = faker.lorem.paragraphs(5);
        cy.visit('/#/editor/post');
        //escribir nombre post
        cy.get('textarea[placeholder="Post title"]').type(postTitle+'{enter}');
        //escribir contenido del post
        cy.get('div[contenteditable="true"]').first().click({force: true}).type(postContent);
        //click boton publicar
        cy.screenshot('/v5.14/caso85/1-creating-draft',{ timeout: 60000 });
        cy.xpath("//button/span[text()='Publish']").click();
        //se valida la creacion esitoso del post
        cy.contains('Ready, set, publish. Share it with the world.').should('be.visible');
        cy.screenshot('/v5.14/caso85/2-ValidationSucessMessaje');
        //cy.xpath("//button/span[text()=' Editor']").click();
        cy.wait(500);
        //boton publicar
        cy.get(".gh-publish-cta").click();
        cy.screenshot('/v5.14/caso85/3-ValidationSucessContinue');
        cy.xpath("//button/span[text()='Publish post, right now']").click({force:true});
        cy.screenshot('/v5.14/caso85/4-ValidationRightNow',{ timeout: 60000 });
        //mesaje de validacion de la publicacion
        cy.contains('Boom. It’s out there.').should('be.visible');
        cy.visit('/#/posts?type=published');
        cy.contains(postTitle).should('be.visible');
        cy.screenshot('/v5.14/caso85/5-ValidationSucessMessajePublish');
        cy.visit('/#/dashboard')
        cy.screenshot('/v5.14/caso85/6-ValidationPostPublishDash');
        cy.contains(postTitle).should('be.visible');
        cy.contains(postTitle).click();
        cy.screenshot('/v5.14/caso85/7-ValidationPostPublishDashboard');
        //cy.contains(postTitle).should('be.visible');

    });

    
    
    

});
    


    
       
        
    
    

    
   

		
