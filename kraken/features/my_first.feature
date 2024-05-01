Feature: Example
 
@user1 @web
Scenario: Ingresa a ghost
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I enter email "margaritavill98@gmail.com"
  And I wait for 1 seconds
  And I enter password "Marvil981221"
  And I wait for 1 seconds
  And I click next
  And I wait for 1 seconds