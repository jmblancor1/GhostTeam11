class MembersPO{
    
    Login(){
        cy.get('#identification').should("be.visible").type("jmbr2004@gmail.com")
        cy.get('#password').should("be.visible").type("Joyce.1984")
        cy.get('.login').should("be.visible").click()
        cy.wait(1000)
        }
    creationMember(){
        //click buton nuevo miembro
        cy.get('li').contains('Members').click();
        //Boton nuevo miembro
        cy.xpath("//span[@class='gh-btn-text-hide-for-mobile'][contains(.,'New')]").click({force: true});
        //nombre 
        cy.get('#member-name').should('be.visible').type("Lina")
        //email 
        cy.get('#member-email').should('be.visible').type("lina2023@gmail.com")
        //label 
        //cy.get('#ember-power-select-trigger-multiple-input-ember79').should('be.visible').type("prueba")
        //nota 
        cy.get('#member-note').should('be.visible').type("Mi suscripción a Ghost")
        //botón guardar 
        cy.xpath("//span[@data-test-task-button-state='idle'][contains(.,'Save')]").click()
    }    
    
}
export default MembersPO();