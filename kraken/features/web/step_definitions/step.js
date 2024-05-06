const { Given, When, Then } = require('@cucumber/cucumber');

/* INICIO LISTADO DE STEPS GENERALES */

When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('#ember6');
    return await element.setValue(email);
});
When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('#ember8');
    return await element.setValue(password);
});
When('I click next', async function() {
    let element = await this.driver.$('#ember10');
    return await element.click();
})
When(/^I enter "([^"]*)" into the input field with name "([^"]*)"$/, async function (value, name) {
    const inputField = await this.driver.$(`input[name="${name}"]`);
    await inputField.setValue(value);
});
When(/^I click on the link with text "([^"]*)"$/, async function (linkText) {
    const link = await this.driver.$(`//*[contains(text(), "${linkText}")]`);
    await link.click();
});
/* FIN LISTADO DE STEPS DE STEPS GENERALES */


/* INICIO LISTADO DE STEPS PARA FUNCIONALIDAD DE TAGS */

When('I enter tag name {kraken-string}', async function (tag) {
    let element = await this.driver.$('#tag-name');
    return await element.setValue(tag);
});
When('I enter description {kraken-string}', async function (description) {
    let element = await this.driver.$('#tag-description');
    return await element.setValue(description);
});
When(/^the tag "([^"]*)" should be present in the tag list$/, async function (tagName) {
    const tagList = await this.driver.$$('.gh-tags-list-item');

    const tagPresent = await Promise.all(tagList.map(async (tag) => {
        const nameElement = await tag.$('.gh-tag-list-name');
        const nameText = await nameElement.getText();
        return nameText === tagName;
    }));
    const index = tagPresent.indexOf(true);
    if (index !== -1) {
        const tagToClick = tagList[index];
        await tagToClick.click();
    } else {
        throw new Error(`El tag "${tagName}" no está presente en la lista.`);
    }
});
When(/^the modal with text "([^"]*)" should exist$/, async function (modalText) {
    await this.driver.waitUntil(async () => {
        const modal = await this.driver.$('.modal-content');
        return await modal.isDisplayed();
    });

    const modalHeader = await this.driver.$('.modal-header h1');
    const headerText = await modalHeader.getText();
    if (headerText !== modalText) {
        throw new Error(`El texto del encabezado del modal no coincide. Se esperaba "${modalText}" pero se encontró "${headerText}".`);
    }
});
When(/^I click on the "([^"]*)" button in the modal footer$/, async function (buttonText) {
    await this.driver.waitUntil(async () => {
        const modal = await this.driver.$('.modal-content');
        return await modal.isDisplayed();
    });
    const deleteButton = await this.driver.$('.modal-footer .gh-btn-red');
    await deleteButton.click();
});
When(/^the tag "([^"]*)" should be deleted$/, async function (tagName) {
    await this.driver.waitUntil(async () => {
        const tags = await this.driver.$$('.gh-tags-list-item');
        return !tags.some(tag => {
            return tag.getText() === tagName;
        });
    });

    const tags = await this.driver.$$('.gh-tags-list-item');
    const tagNames = await Promise.all(tags.map(tag => tag.getText()));
    if (tagNames.includes(tagName)) {
        throw new Error(`El tag "${tagName}" todavía está presente en la lista después de eliminarlo.`);
    } else {
        console.log(`El tag "${tagName}" ha sido eliminado correctamente.`);
    }
});
/* FIN LISTADO DE STEPS PARA FUNCIONALIDAD DE TAGS */


/*---------------STEPS PARA POSTS------------------------------
/*----------Creacion de Post---------------------*/
When('I enter post name {kraken-string}', async function (post) {
    let element = await this.driver.$('textarea[placeholder="Post title"]');
    return await element.setValue(post);
});
When('I enter post description {kraken-string}', async function (description) {
    let element = await this.driver.$('div[contenteditable="true"]');
    return await element.setValue(description);
});

When('I click settings', async function() {
    let element = await this.driver.$('.settings-menu-toggle');
    return await element.click();
})
  
/*----------------validacion que los post esten en el listado d ePosts---------------*/
When(/^the post "([^"]*)" should be present in the post list$/, async function (tagName) {
    const tagList = await this.driver.$$('.posts-list');

    const tagPresent = await Promise.all(tagList.map(async (tag) => {
        const nameElement = await tag.$('.gh-content-entry-title');
        const nameText = await nameElement.getText();
        return nameText === tagName;
    }));
    const index = tagPresent.indexOf(true);
    if (index !== -1) {
        const tagToClick = tagList[index];
        await tagToClick.click();
    } else {
        throw new Error(`El tag "${tagName}" no está presente en la lista.`);
    }
});
/* -------------------estos para eliminar post ----------------------- */
When('I click on the post settings', async function() {
    let element = await this.driver.$('.settings-menu-toggle');
    return await element.click();
});
When('I click on Delete post', async function() {
    let element = await this.driver.$("//button/span[text()=' Delete ']");
    return await element.click();
});


/*------------------Deleting Post--------------------------------*/
When(/^the post "([^"]*)" should be deleted$/, async function (tagName) {
    await this.driver.waitUntil(async () => {
        const tags = await this.driver.$$('.posts-list');
        return !tags.some(tag => {
            return tag.getText() === tagName;
        });
    });

    const tags = await this.driver.$$('.posts-list');
    const tagNames = await Promise.all(tags.map(tag => tag.getText()));
    if (tagNames.includes(tagName)) {
        throw new Error(`El tag "${tagName}" todavía está presente en la lista después de eliminarlo.`);
    } else {
        console.log(`El tag "${tagName}" ha sido eliminado correctamente.`);
    }
});
/*-------------Cancelat La eliminacion de Posts---------------------*/
When(/^I click on the "([^"]*)" button for canceling in the modal footer$/, async function (buttonText) {
    await this.driver.waitUntil(async () => {
        const modal = await this.driver.$('.modal-content');
        return await modal.isDisplayed();
    });
    const deleteButton = await this.driver.$('.modal-footer .gh-btn');
    await deleteButton.click();
});
/*--Publicar Post--------------------------------*/
When(/^the post "([^"]*)" should be present in the publish post list$/, async function (tagName) {
    const tagList = await this.driver.$$('.posts-list');

    const tagPresent = await Promise.all(tagList.map(async (tag) => {
        const nameElement = await tag.$('.gh-content-entry-title');
        const nameText = await nameElement.getText();
        return nameText === tagName;
    }));
    const index = tagPresent.indexOf(true);
    if (index !== -1) {
        const tagToClick = tagList[index];
        await tagToClick.click();
    } else {
        throw new Error(`El tag "${tagName}" no está presente en la lista.`);
    }
});

When('And I click Publish', async function () {
    let element = await this.driver.$("//button/span[text()='Publish']");
    return await element.click();
  });

/* FIN LISTADO DE STEPS PARA FUNCIONALIDAD DE POSTS*/

/**/
/**/
/**/

/* INICIO LISTADO DE STEPS PARA FUNCIONALIDAD DE PAGES */
When('I click {kraken-string}', async function(site_to_visit) {
    let value = ''

    if (site_to_visit === 'sign-in') {
        value = '/html/body/div[2]/div/main/div/div/section/form/button/span';
    } else if (site_to_visit === 'pages') {
        value = '/html/body/div[2]/div/nav[1]/div/section/div[1]/ul[2]/li[2]/a';
    } else if (site_to_visit === 'new-page') {
        value = '/html/body/div[2]/div/main/section/div/header/section/a/span';
    } else if (site_to_visit === 'page-title') {
        value = '/html/body/div[2]/div/main/div/section/div[1]/div[1]/textarea';
    } else if (site_to_visit === 'page-body') {
        value = '/html/body/div[2]/div/main/div/section/div[1]/div[1]/article/div[1]/div';
    } else if (site_to_visit === 'publish') {
        value = '/html/body/div[2]/div/main/div/section/header/section/button[2]';
    } else if (site_to_visit === 'final-review') {
        value = '/html/body/div[4]/div/div/div/div[3]/button';
    } else if (site_to_visit === 'publish-right-now') {
        value = '/html/body/div[4]/div/div/div/div[2]/button[1]';
    } else if (site_to_visit === 'edit-info-page') {
        value = '/html/body/div[2]/div/main/button/span';
    } else if (site_to_visit === 'delete-page') {
        value = '/html/body/div[2]/div/main/div/div/div/div/div[2]/form/button/span';
    } else if (site_to_visit === 'delete-page-confirm') {
        value = '/html/body/div[5]/div/div/div[2]/button[2]/span';
    } else if (site_to_visit === 'settings') {
        value = '/html/body/div[2]/div/nav[1]/div/section/div[2]/div/div/div[2]/a';
    } else if (site_to_visit === 'settings-general') {
        value = '/html/body/div[2]/div/main/section/section/div[2]/a[1]';
    } else if (site_to_visit === 'meta-data') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[1]/div[1]/button/span';
    } else if (site_to_visit === 'save-settings') {
        value = '/html/body/div[2]/div/main/section/div[1]/header/section/button/span';
    } else if (site_to_visit === 'twitter') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[2]/div[1]/button/span';
    } else if (site_to_visit === 'facebook') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[3]/div[1]/button/span';
    } else if (site_to_visit === 'social-accounts') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[4]/div[1]/button/span';
    } else if (site_to_visit === 'social-accounts-title') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[4]/div[1]/div/h4';
    }

    let element = await this.driver.$(value);
    return await element.click();
})
When('I compare text {kraken-string} at {kraken-string}', async function(text_to_compare, site_to_compare_text) {
    let value = '';

    if (site_to_compare_text == 'error-limit-characters') {
        value = '/html/body/div[2]/aside/article/div';
    } else if (site_to_compare_text === 'hour-field') {
        value = '/html/body/div[2]/div/main/div/div/div/div/div[2]/form/div[2]/div/div[2]/input';
    } else if (site_to_compare_text === 'hour-error') {
        value = '/html/body/div[2]/div/main/div/div/div/div/div[2]/form/div[2]/div/div[3]';
    } else if (site_to_compare_text === 'meta-title') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[1]/div[2]/div/div/div/div/div[1]/div[1]/input';
    } else if (site_to_compare_text === 'twitter-title') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[2]/div[2]/div/div/div/div/div[1]/div[2]/input';
    } else if (site_to_compare_text === 'facebook-title') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[3]/div[2]/div/div/div/div/div[1]/div[2]/input';
    } else if (site_to_compare_text === 'error-twitter') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[4]/div[2]/div/div/div/div[2]/p[1]';
    } else if (site_to_compare_text === 'error-facebook') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[4]/div[2]/div/div/div/div[1]/p[1]';
    } else if (site_to_compare_text === 'social-facebook-page') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[4]/div[2]/div/div/div/div[1]/input';
    } else if (site_to_compare_text === 'social-twitter-profile') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[4]/div[2]/div/div/div/div[2]/input';
    }

    let element = await this.driver.$(value);
    let element_text = await element.getValue();

    if (site_to_compare_text === 'error-limit-characters' || site_to_compare_text === 'hour-error' || site_to_compare_text === 'error-twitter' || site_to_compare_text === 'error-facebook') {
        element_text = await element.getText();
    }

    if (element_text !== text_to_compare) {
        throw new Error(`El texto en la sección "${site_to_compare_text}" no es correcto.`);
    }
})
When('I enter text {kraken-string} at {kraken-string}', async function(text_to_enter, site_to_enter_text) {
    let value = '';

    if (site_to_enter_text === 'page-title') {
        value = '/html/body/div[2]/div/main/div/section/div[1]/div[1]/textarea';
    } else if (site_to_enter_text === 'page-body') {
        value = '/html/body/div[2]/div/main/div/section/div[1]/div[1]/article/div[1]/div';
    } else if (site_to_enter_text === 'hour-field') {
        value = '/html/body/div[2]/div/main/div/div/div/div/div[2]/form/div[2]/div/div[2]/input';
    } else if (site_to_enter_text === 'meta-title') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[1]/div[2]/div/div/div/div/div[1]/div[1]/input';
    } else if (site_to_enter_text === 'twitter-title') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[2]/div[2]/div/div/div/div/div[1]/div[2]/input';
    } else if (site_to_enter_text === 'facebook-title') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[3]/div[2]/div/div/div/div/div[1]/div[2]/input';
    } else if (site_to_enter_text === 'social-facebook-page') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[4]/div[2]/div/div/div/div[1]/input';
    } else if (site_to_enter_text === 'social-twitter-profile') {
        value = '/html/body/div[2]/div/main/section/div[2]/div[2]/section/div[4]/div[2]/div/div/div/div[2]/input';
    }

    let element = await this.driver.$(value);
    return await element.setValue(text_to_enter);
})
When('I find if the page {kraken-string} exists', async function (pageToFind) {
    const pageList = await this.driver.$$('.gh-posts-list-item')

    const pagePresent = await Promise.all(pageList.map(async (page) => {
        const nameElement = await page.$('.gh-content-entry-title');
        const nameText = await nameElement.getText();
        return nameText === pageToFind
    }));
    
    const index = pagePresent.indexOf(true);

    if (index !== -1) {
        const pageToClick = pageList[index];
        await pageToClick.click();
    } else {
        throw new Error(`La página "${pageToFind}" no existe.`);
    }
})
When('I find if the page {kraken-string} do not exist', async function (pageToNotFind) {
    const pageList = await this.driver.$$('.gh-posts-list-item')

    const pagePresent = await Promise.all(pageList.map(async (page) => {
        const nameElement = await page.$('.gh-content-entry-title');
        const nameText = await nameElement.getText();
        return nameText === pageToNotFind
    }));
    
    const index = pagePresent.indexOf(true);

    if (index !== -1) {
        throw new Error(`La página "${pageToNotFind}" aún existe.`);
    }
})

/* FIN LISTADO DE STEPS PARA FUNCIONALIDAD DE PAGES */

/**/
/**/
/**/

/* INICIO LISTADO DE STEPS PARA FUNCIONALIDAD DE MEMBERS */

function generateRandomEmail() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `${randomString}@gmail.com`;
}
async function reloadPage(driver) {
    await driver.refresh();
}
const ids = Array.from({ length: 8 }, (_, i) => `type-${i}`);

async function testCheckboxes(driver) {
    for (const id of ids) {
        const checkbox = await driver.$(`label[for="${id}"]`);
        const input = await driver.$(`#${id}`);
        const isChecked = await input.isSelected();

        if (isChecked) {
            await checkbox.click();
            await driver.pause(1000);
            console.log(`Se desmarcó el checkbox con ID ${id}.`);
        } else {
            await checkbox.click();
            await driver.pause(1000);
            console.log(`Se marcó el checkbox con ID ${id}.`);
        }

        const updatedIsChecked = await input.isSelected();
        if (updatedIsChecked !== !isChecked) {
            console.error(`El estado del checkbox con ID ${id} no se actualizó correctamente.`);
        } else {
            console.log(`El estado del checkbox con ID ${id} se actualizó correctamente.`);
        }
    }
}

When(/^I enter "([^"]*)" into the textarea field with name "([^"]*)"$/, async function (value, name) {
    const textArea = await this.driver.$(`textarea[name="${name}"]`);
    await textArea.setValue(value);
});
When(/^I enter a random email into the input field with name "([^"]*)"$/, async function (fieldName) {
    const randomEmail = generateRandomEmail();
    const emailInput = await this.driver.$(`input[name="${fieldName}"]`);
    await emailInput.setValue(randomEmail);
    this.lastGeneratedEmail = randomEmail;
});
When(/^the member with email should exist$/, async function () {
    try {
        const expectedMemberEmail = this.lastGeneratedEmail;
    
        await this.driver.waitUntil(async () => {
            const memberList = await this.driver.$$('.gh-list-data');
            return memberList.length > 0;
        });
    
        const memberList = await this.driver.$$('.gh-list-data');
        let memberFound = false;
        for (const member of memberList) {
            try {
                const emailElement = await member.$('p.gh-members-list-email');
                const memberEmailText = await emailElement.getText();
    
                if (memberEmailText === expectedMemberEmail) {
                    memberFound = true;
                    await member.click();
                    console.log(`Se hizo clic en el miembro con el correo electrónico "${expectedMemberEmail}".`);
                    break;
                }
            } catch (error) {
                console.error("Error al obtener el correo electrónico del miembro:", error);
            }
        }
        if (!memberFound) {
            throw new Error(`El miembro con el correo electrónico "${expectedMemberEmail}" no se encontró en la lista.`);
        }
    } catch (error) {
        console.error("Error al hacer clic en el miembro:", error);
        throw error;
    }    
});
When(/^I click on the dropdown button$/, async function () {
    await this.driver.waitUntil(async () => {
        const dropdownElement = await this.driver.$('.dropdown');
        return await dropdownElement.isDisplayed();
    });
    const dropdownButton = await this.driver.$('.dropdown button');
    await dropdownButton.click();
});
When(/^I click filter button$/, async function () {
    const filterButton = await this.driver.$('div.gh-btn.gh-btn-icon.gh-btn-action-icon');
    await filterButton.click();
});
When('I check and uncheck the checkboxes', async function () {
    await testCheckboxes(this.driver);
});
When(/^I handle the member with email "([^"]*)"$/, async function (memberEmail) {
    try {
        await this.driver.waitUntil(async () => {
            const memberList = await this.driver.$$('.gh-list-data');
            return memberList.length > 0;
        });
    
        const memberList = await this.driver.$$('.gh-list-data');
        let memberFound = false;
        
        for (const member of memberList) {
            try {
                const emailElement = await member.$('p.gh-members-list-email');
                const memberEmailText = await emailElement.getText();
    
                if (memberEmailText === memberEmail) {
                    memberFound = true;
                    await member.click();
                    console.log(`Se hizo clic en el miembro con el correo electrónico "${memberEmail}".`);
                    break;
                }
            } catch (error) {
                console.error("Error al obtener el correo electrónico del miembro:", error);
            }
        }
    
        if (!memberFound) {
            throw new Error(`El miembro con el correo electrónico "${memberEmail}" no existe.`);
        }
    } catch (error) {
        console.error("Error al manejar el miembro:", error);
        throw error;
    }    
});
When('I reload the page', async function () {
    await reloadPage(this.driver);
})

/* FIN LISTADO DE STEPS PARA FUNCIONALIDAD DE MEMBERS */

module.exports = { generateRandomEmail };
