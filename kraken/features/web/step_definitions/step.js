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