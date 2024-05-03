
///<reference types="cypress"/>
//Para que funcionen los comandos
require('cypress-xpath');
import MembersPO from '../support/PageObject/MembersPOM/MembersPO';

describe("logueo para acceder a las funcionalidades de ghost", () => {
  beforeEach(() => {
    cy.visit("https://ghost-grupo-11.onrender.com/ghost/#/signin");
  });





  /*---------------------Pruebas Members----------------------------------------------------
  */
  it.only('Prueba de creacion de member ya existente',()=>{
    creationMember();
    //Valida el mensaje de que el miembro ya exist
    cy.get(".error > .response").should('contain', 'Member already exists')
    
})

