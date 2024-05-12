beforeEach(() => {

  login();

  Cypress.on('uncaught:exception', (err, runnable) => {
    console.error('Uncaught exception', err);
    return false;
  });
});

// ************************************************************************************************************
// **************************************** INICIO TESTING SETTING ************************************************
// ************************************************************************************************************

// **************************************** METADATOS ************************************************

describe("Login y acceder a las configuraciones de ghost: Metadatos ", () => {
  it("Asignar un título como metadato (Contenido extra para motores de búsqueda)", () => {
    cy.get("a").contains("General").click();
    cy.xpath(
      "/html/body/div[2]/div/main/section/div/section/div[6]/div[1]/div[1]/div[2]/button/span"
     ).click();
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type("Grupo # 11 - Pruebas automatizadas de software")
      .should("have.value", "Grupo # 11 - Pruebas automatizadas de software");
    cy.wait(3000);
    cy.get("span").contains("Save settings").click();
    cy.get(".mt2").click();
  });

  it("Personalizar los datos estructurados de un sitio para Twitter", () => {
    cy.get("a").contains("General").click();
    cy.xpath(
      "/html/body/div[2]/div/main/section/div/section/div[6]/div[2]/div[1]/div[2]/button/span"
    ).click();
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type("MISW-4103 - 2024-12")
      .should("have.value", "MISW-4103 - 2024-12");
    cy.wait(3000);
    cy.get("span").contains("Save settings").click();
    cy.get(".mt2").click();
  });

  it("Personalizar los datos estructurados de tu sitio para Facebook", () => {
    cy.get("a").contains("General").click();
    cy.xpath(
      "/html/body/div[2]/div/main/section/div/section/div[6]/div[3]/div[1]/div[2]/button/span"
    ).click();
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type("MISW-4103 - 2024-12")
      .should("have.value", "MISW-4103 - 2024-12");
    cy.wait(3000);
    cy.get("span").contains("Save settings").click();
    cy.get(".mt2").click();
  });

  it("Vincular cuentas redes sociales con datos incorrectos", () => {
     cy.get("a").contains("General").click();
     cy.xpath(
       "/html/body/div[2]/div/main/section/div/section/div[8]/div/div[2]/button/span"
     ).click();
    cy.get('input[type="url"]').eq(0).invoke("val", "").type("https://www.");

    cy.get('input[type="url"]')
      .eq(1)
      .invoke("val", "")
      .type("https://twitter.com/¿?)(&%$");
    cy.get('input[type="url"]')
      .eq(1)
      .should("have.value", "https://twitter.com/¿?)(&%$");

    cy.get(".response")
      .eq(0)
      .should(
        "contain",
        "The URL must be in a format like https://www.facebook.com/yourPage"
      );

    cy.get("span").contains("Save settings").click();

    cy.get(".response")
      .eq(1)
      .should("contain", "Your Username is not a valid Twitter Username");
    cy.wait(3000);
  });

  it("Vincular cuentas redes sociales con datos correctos", () => {
     cy.get("a").contains("General").click();
     cy.xpath(
       "/html/body/div[2]/div/main/section/div/section/div[8]/div/div[2]/button/span"
     ).click();
    cy.get('input[type="url"]')
      .eq(0)
      .invoke("val", "")
      .type("https://facebook.com/grupo-11")
      .should("have.value", "https://facebook.com/grupo-11");
    cy.get('input[type="url"]')
      .eq(1)
      .invoke("val", "")
      .type("https://twitter.com/grupo_11")
      .should("have.value", "https://twitter.com/grupo_11");
    cy.wait(3000);
    cy.get("span").contains("Save settings").click();
  });
});



// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************

function login(){
  cy.visit("/#/signin");
  cy.fixture("login.env.json").then((login) => {
    cy.get("#ember8").type(login.userName);
    cy.get("#ember10").type(login.password);
  });
  cy.get("#ember12 > span").click();
}
