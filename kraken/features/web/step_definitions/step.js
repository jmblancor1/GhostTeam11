const { Given, When, Then } = require('@cucumber/cucumber');
const { assert } = require('chai');
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
const ids = Array.from({ length: 8 }, (_, i) => `type-${i}`);

async function testCheckboxes(driver) {
    for (const id of ids) {
        const checkbox = await driver.$(`label[for="${id}"]`);
        const input = await driver.$(`#${id}`);
        const isChecked = await input.isSelected();

        if (isChecked) {
            await checkbox.click();
            await driver.pause(1000);
            console.log(`Se desclickeó el checkbox con ID ${id}.`);
        } else {
            await checkbox.click();
            await driver.pause(1000);
            console.log(`Se clickeó el checkbox con ID ${id}.`);
        }

        const updatedIsChecked = await input.isSelected();
        assert.strictEqual(updatedIsChecked, !isChecked, `El estado del checkbox con ID ${id} no se actualizó correctamente.`);
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
            const emailElement = await member.$('p.gh-members-list-email');
            const memberEmailText = await emailElement.getText();

            if (memberEmailText === expectedMemberEmail) {
                memberFound = true;
                await member.click();
                console.log(`Se hizo clic en el miembro con el correo electrónico "${expectedMemberEmail}".`);
                break;
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
            const emailElement = await member.$('.gh-members-list-email');
            const memberEmailText = await emailElement.getText();

            if (memberEmailText === memberEmail) {
                memberFound = true;
                await member.click();
                console.log(`Se hizo clic en el miembro con el correo electrónico "${memberEmail}".`);
                break;
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

/* FIN LISTADO DE STEPS PARA FUNCIONALIDAD DE MEMBERS */

module.exports = { generateRandomEmail };