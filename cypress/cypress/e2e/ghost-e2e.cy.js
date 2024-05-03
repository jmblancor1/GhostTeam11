///<reference types="cypress"/>
//Para que funcionen los comandos
require('cypress-xpath');
import MembersPO from '../support/PageObject/MembersPOM/MembersPO';




  /*---------------------Pruebas Members----------------------------------------------------
  */
  it.only('Prueba de creacion de member ya existente',()=>{
    creationMember();
    //Valida el mensaje de que el miembro ya exist
    cy.get(".error > .response").should('contain', 'Member already exists')
    
})

