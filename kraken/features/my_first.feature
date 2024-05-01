Feature: Iniciar una conversación

@user1 @web
Scenario: Como primer usuario inicio sesion y mandó un mensaje al usuario 2
  Given I navigate to page "https://www.messenger.com/login"
  And I wait for 5 seconds
  When I enter email "<USERNAME1>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD1>"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  Then I send a signal to user 2 containing "login1 complete"
  And I wait for a signal containing "login2 complete" for 15 seconds

@user2 @web
Scenario: Como usuario 2 inicio sesion y mandó un mensaje al usuario 1
  Given I navigate to page "https://www.messenger.com/login"
  When I wait for 2 seconds
  When I enter email "<USERNAME2>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD2>"
  And I wait for 7 seconds
  And I wait for a signal containing "login1 complete" for 15 seconds
  And I click next
  And I wait for 7 seconds
  And I send a signal to user 1 containing "login2 complete"