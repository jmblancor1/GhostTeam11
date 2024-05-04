describe("logueo para acceder a las funcionalidades de ghost", () => {
  beforeEach(() => {
    cy.visit("http://localhost:2368/ghost");
  });

  it.only('Prueba de creacion de member ya existente',()=>{
    creationMember();
    //Valida el mensaje de que el miembro ya exist
    cy.get(".error > .response").should('contain', 'Member already exists')
    
})
});


