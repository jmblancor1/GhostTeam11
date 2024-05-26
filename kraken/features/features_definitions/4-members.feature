Feature: Members
 
@user1 @web
Scenario: Crear un miembro exitosamente
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I take a screenshot in createMember
  And I enter password "<PASSWORD>"
  And I take a screenshot in createMember
  And I click next
  And I take a screenshot in createMember
  And I wait for 1 seconds
  And I navigate to page "<URL_DASHBOARD>"
  And I take a screenshot in createMember
  And I wait for 5 seconds
  And I click on the link with text "Members"
  And I navigate to page "<URL_MEMBERS>"
  And I take a screenshot in createMember
  And I wait for 1 seconds
  When I click on the link with text "New member"
  And I take a screenshot in createMember
  And I wait for 1 seconds
  And I enter "Nuevo miembro" into the input field with name "name"
  And I take a screenshot in createMember
  And I enter a random email into the input field with name "email"
  And I take a screenshot in createMember
  And I enter "Esta es la nota que tiene el nuevo miembro" into the textarea field with name "note"
  And I take a screenshot in createMember
  Then I click on the link with text "Save"
  And I take a screenshot in createMember
  And I wait for 3 seconds
  And I click on the link with text "Members"
  And I navigate to page "<URL_MEMBERS>"
  And I reload the page
  And I wait for 5 seconds
  And I take a screenshot in createMember
  And the member with email should exist
  And I take a screenshot in createMember
  And I wait for 3 seconds

@user2 @web
Scenario: Eliminar un miembro exitosamente
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I take a screenshot in deleteMember
  And I enter password "<PASSWORD>"
  And I take a screenshot in deleteMember
  And I click next
  And I take a screenshot in deleteMember
  And I wait for 1 seconds
  And I navigate to page "<URL_DASHBOARD>"
  And I wait for 5 seconds
  And I click on the link with text "Members"
  And I navigate to page "<URL_MEMBERS>"
  And I take a screenshot in deleteMember
  And I wait for 1 seconds
  And I click on the link with text "New member"
  And I take a screenshot in deleteMember
  And I wait for 1 seconds
  And I enter "Nuevo miembro a eliminar" into the input field with name "name"
  And I take a screenshot in deleteMember
  And I enter "miembro-a-eliminar@gmail.com" into the input field with name "email"
  And I take a screenshot in deleteMember
  And I enter "Esta es la nota que tiene el nuevo miembro a eliminar" into the textarea field with name "note"
  And I take a screenshot in deleteMember
  And I click on the link with text "Save"
  And I take a screenshot in deleteMember
  And I wait for 3 seconds
  And I click on the link with text "Members"
  And I navigate to page "<URL_MEMBERS>"
  And I reload the page
  And I wait for 5 seconds
  And I take a screenshot in deleteMember
  And I handle the member with email "miembro-a-eliminar@gmail.com"
  And I take a screenshot in deleteMember
  And I click on the dropdown button
  And I take a screenshot in deleteMember
  When I click on the link with text "Delete member"
  And I take a screenshot in deleteMember
  And I wait for 2 seconds
  And the modal with text "Delete member account" should exist
  And I take a screenshot in deleteMember
  And I wait for 1 seconds
  Then I click on the "Delete member" button in the modal footer
  And I take a screenshot in deleteMember
  And I wait for 3 seconds
  And I navigate to page "<URL_MEMBERS>"
  And I take a screenshot in deleteMember
  And I wait for 2 seconds

@user3 @web
Scenario: Filtar eventos en la actividad del miembro
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I take a screenshot in filterMember
  And I enter password "<PASSWORD>"
  And I take a screenshot in filterMember
  And I click next
  And I take a screenshot in filterMember
  And I wait for 1 seconds
  And I navigate to page "<URL_DASHBOARD>"
  And I take a screenshot in filterMember
  And I wait for 5 seconds
  And I click on the link with text "Members"
  And I navigate to page "<URL_MEMBERS>"
  And I take a screenshot in filterMember
  And I wait for 1 seconds
  And I click on the link with text "New member"
  And I take a screenshot in filterMember
  And I wait for 1 seconds
  And I enter "Nuevo miembro a filtrar" into the input field with name "name"
  And I take a screenshot in filterMember
  And I enter a random email into the input field with name "email"
  And I take a screenshot in filterMember
  And I enter "Esta es la nota que tiene el nuevo miembro a filtrar" into the textarea field with name "note"}
  And I take a screenshot in filterMember
  And I click on the link with text "Save"
  And I take a screenshot in filterMember
  And I wait for 3 seconds
  And I click on the link with text "Members"
  And I navigate to page "<URL_MEMBERS>"
  And I reload the page
  And I take a screenshot in filterMember
  And I wait for 5 seconds
  And the member with email should exist
  And I take a screenshot in filterMember
  And I wait for 3 seconds
  And I click on the link with text "See all member activity"
  And I take a screenshot in filterMember
  And I wait for 3 seconds
  When I click filter button
  And I take a screenshot in filterMember
  And I wait for 3 seconds
  And I take a screenshot in filterMember
  Then I check and uncheck the checkboxes
  And I wait for 3 seconds
  And I take a screenshot in filterMember
  And I check and uncheck the checkboxes
  And I take a screenshot in filterMember
  And I wait for 5 seconds
