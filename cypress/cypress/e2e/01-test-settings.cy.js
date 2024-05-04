// ************************************************************************************************************
// **************************************** INICIO TESTING SETTING ************************************************
// ************************************************************************************************************

// **************************************** INFORMACIÓN GENERAL ************************************************

describe("Login y acceder a las configuraciones de ghost: Información de publicación", () => {

  it("Asignar un título a una publicación web", () => {
    cy.visit("/#/signin");
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span").click();
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type("Grupo # 11")
      .should("have.value", "Grupo # 11");
    cy.wait(3000);
    cy.get('span').contains('Save').click();
    cy.get(":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span").click();
    cy.get("#ember23").click();
  });

  it("Establecer la zona horaria del sitio web", () => {
    cy.visit("/#/settings/general");
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(":nth-child(1) > .gh-expandable > :nth-child(2) > .gh-expandable-header > .gh-btn > span").click();
    cy.get("select")
      .select("America/Bogota")
      .should("have.value", "America/Bogota")
      .contains("(GMT -5:00) Bogota, Lima, Quito")
    cy.wait(3000);
    cy.get("span").contains("Save").click();
    cy.get(":nth-child(1) > .gh-expandable > :nth-child(2) > .gh-expandable-header > .gh-btn > span").click();
    cy.get("#ember23").click();
  })

  it("Establecer el idioma de la publicación", () => {
    cy.visit("/#/settings/general");
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(3) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "") // Limpia el campo de texto si hay algún valor previo
      .type("es")
      .should("have.value", "es");
    cy.wait(3000);
    cy.get("span").contains("Save").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(3) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get("#ember23").click();
  });

});


// **************************************** METADATOS ************************************************

describe("Login y acceder a las configuraciones de ghost: Metadatos ", () => {
  it("Asignar un título como metadato (Contenido extra para motores de búsqueda)", () => {
    cy.visit("/#/settings/general");
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(2) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type("Grupo # 11 - Pruebas automatizadas de software")
      .should("have.value", "Grupo # 11 - Pruebas automatizadas de software");
    cy.wait(3000);
    cy.get("span").contains("Save").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get("#ember23").click();
  });

  it("Personalizar los datos estructurados de un sitio para Twitter", () => {
    cy.visit("/#/settings/general");
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(2) > .gh-expandable > :nth-child(2) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type("MISW-4103 - 2024-12")
      .should("have.value", "MISW-4103 - 2024-12");
    cy.wait(3000)
    cy.get("span").contains("Save").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get("#ember23").click();
  });

  it("Personalizar los datos estructurados de tu sitio para Facebook", () => {
    cy.visit("/#/settings/general");
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(2) > .gh-expandable > :nth-child(3) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get('input[type="text"]')
      .eq(0)
      .invoke("val", "")
      .type("MISW-4103 - 2024-12")
      .should("have.value", "MISW-4103 - 2024-12");
    cy.wait(3000);
    cy.get("span").contains("Save").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get("#ember23").click();
  });

  it.only("Vincular cuentas sociales con datos incorrectos", () => {
    cy.visit("/#/settings/general");
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(2) > .gh-expandable > :nth-child(4) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get('input[type="url"]')
      .eq(0)
      .invoke("val", "")
      .type("https://www.")

    cy.get('input[type="url"]')
      .eq(1)
      .invoke("val", "")
      .type("https://twitter.com/¿?)(&%$")
    cy.get('input[type="url"]')
      .eq(1)
      .should("have.value", "https://twitter.com/¿?)(&%$");

    cy.get(".response")
      .eq(0)
      .should("contain", "The URL must be in a format like https://www.facebook.com/yourPage");

    cy.get("span").contains("Save").click();

    cy.get(".response").eq(1).should("contain", "Your Username is not a valid Twitter Username");
    cy.wait(3000);
  });

  it("Vincular cuentas sociales con datos correctos", () => {
    cy.visit("/#/settings/general");
    cy.fixture("login.env.json").then((login) => {
      cy.get("#ember6").type(login.userName);
      cy.get("#ember8").type(login.password);
    });
    cy.get("#ember10 > span").click();
    cy.get("#ember32").click();
    cy.get("h4").contains("General").click();
    cy.get(
      ":nth-child(2) > .gh-expandable > :nth-child(4) > .gh-expandable-header > .gh-btn > span"
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
    cy.get("span").contains("Save").click();
    cy.get(
      ":nth-child(1) > .gh-expandable > :nth-child(1) > .gh-expandable-header > .gh-btn > span"
    ).click();
    cy.get("#ember23").click();
  });
});

// ************************************************************************************************************
// **************************************** FIN TEST SETTING ************************************************
// ************************************************************************************************************