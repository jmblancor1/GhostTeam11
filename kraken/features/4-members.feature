Feature: Members
 
@user1 @web
Scenario: Crear un tag exitosamente
  Given I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/signin"
  And I wait for 1 seconds
  And I enter email "df.guerrerov1@uniandes.edu.co"
  And I enter password "qwerty1234"
  And I click next
  And I wait for 1 seconds
  And I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
  And I wait for 5 seconds
  And I click on the link with text "Members"
  And I wait for 1 seconds
  When I click on the link with text "New member"
  And I wait for 1 seconds

