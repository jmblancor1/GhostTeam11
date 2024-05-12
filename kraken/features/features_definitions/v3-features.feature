Feature: Features Ghost V3
 
@user1 @web
Scenario: Funcionalidad miembros: Crear un miembro exitosamente
  Given I navigate to page "<URL_SIGN_IN_V3>"
  And I wait for 1 seconds
  And I enter email V3 "<USERNAME>"
  And I take a screenshot in createMemberV3
  And I enter password V3 "<PASSWORD>"
  And I take a screenshot in createMemberV3
  And I click next V3
  And I take a screenshot in createMemberV3
  And I wait for 1 seconds
  And I navigate to page "<URL_DASHBOARD_V3>"
  And I take a screenshot in createMemberV3
  And I wait for 5 seconds
  And I click on the link with text "Members"
  And I navigate to page "<URL_MEMBERS_V3>"
  And I take a screenshot in createMemberV3
  And I wait for 1 seconds
  When I click on the link with text "New member"
  And I take a screenshot in createMemberV3
  And I wait for 1 seconds
  And I enter "Nuevo miembro" into the input field with name "name"
  And I take a screenshot in createMemberV3
  And I enter a random email into the input field with name "email"
  And I take a screenshot in createMemberV3
  And I enter "Esta es la nota que tiene el nuevo miembro" into the textarea field with name "note"
  And I take a screenshot in createMemberV3
  Then I click on the link with text "Save"
  And I take a screenshot in createMemberV3
  And I wait for 3 seconds
  And I click on the link with text "Members"
  And I navigate to page "<URL_MEMBERS_V3>"
  And I reload the page
  And I wait for 5 seconds
  And I take a screenshot in createMemberV3
  And the member with email should exist
  And I take a screenshot in createMemberV3
  And I wait for 3 seconds