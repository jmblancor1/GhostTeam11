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
    }

    let element = await this.driver.$(value);
    return await element.click();
})
When('I enter text {kraken-string} at {kraken-string}', async function(text_to_enter, site_to_enter_text) {
    let value = '';

    if (site_to_enter_text === 'page-title') {
        value = '/html/body/div[2]/div/main/div/section/div[1]/div[1]/textarea';
    } else if (site_to_enter_text === 'page-body') {
        value = '/html/body/div[2]/div/main/div/section/div[1]/div[1]/article/div[1]/div';
    }

    let element = await this.driver.$(value);
    return await element.setValue(text_to_enter);
})
Then('I find if the page {kraken-string} exists', async function (pageToFind) {
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

/* FIN LISTADO DE STEPS PARA FUNCIONALIDAD DE PAGES */
