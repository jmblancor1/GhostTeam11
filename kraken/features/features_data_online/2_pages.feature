Feature: Pages
 
@user1 @web
Scenario: Create a page correctly
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click "sign-in"
  And I wait for 5 seconds
  And I click "pages"
  And I wait for 1 seconds
  When I click "new-page"
  And I wait for 1 seconds
  And I click "page-title"
  And I enter text at "page-title" with data online
  And I click "page-body"
  And I enter text at "page-body" with data online
  And I click "publish"
  And I wait for 1 seconds
  And I click "final-review"
  And I wait for 1 seconds
  And I click "publish-right-now"
  Then I wait for 3 seconds
  And I navigate to page "<URL_PAGES>"
  And I wait for 1 seconds
  And I find if the page "Mi primera página" exists

@user2 @web
Scenario: Delete a page created
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click "sign-in"
  And I wait for 5 seconds
  And I click "pages"
  And I wait for 1 seconds
  And I click "new-page"
  And I wait for 1 seconds
  And I click "page-title"
  And I enter text at "page-title" with data online
  And I click "page-body"
  And I enter text at "page-body" with data online
  And I click "publish"
  And I wait for 1 seconds
  And I click "final-review"
  And I wait for 1 seconds
  And I click "publish-right-now"
  And I wait for 3 seconds
  And I navigate to page "<URL_PAGES>"
  And I wait for 1 seconds
  And I find if the page "Página a borrar" exists
  And I wait for 1 seconds
  When I click "edit-info-page"
  And I click "delete-page"
  And I click "delete-page-confirm"
  Then I navigate to page "<URL_PAGES"
  And I wait for 1 seconds
  And I find if the page "Página a borrar" do not exist

@user3 @web
Scenario: Create a page with a title over the characters limit (255)
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click "sign-in"
  And I wait for 5 seconds
  And I click "pages"
  And I wait for 1 seconds
  And I click "new-page"
  And I wait for 1 seconds
  And I click "page-title"
  When I enter text at "page-title" with data online over characters limit
  And I click "page-body"
  And I enter text at "page-body" with data online
  Then I click "publish"
  And I compare text "Validation failed: Title cannot be longer than 255 characters." at "error-limit-characters"

@user4 @web
Scenario: Edit the published hour with a correct hour to a page created
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click "sign-in"
  And I wait for 5 seconds
  And I click "pages"
  And I wait for 1 seconds
  And I click "new-page"
  And I wait for 1 seconds
  And I click "page-title"
  And I enter text at "page-title" with data online
  And I click "page-body"
  And I enter text at "page-body" with data online
  And I click "publish"
  And I wait for 1 seconds
  And I click "final-review"
  And I wait for 1 seconds
  And I click "publish-right-now"
  And I wait for 3 seconds
  And I navigate to page "<URL_PAGES>"
  And I wait for 1 seconds
  When I find if the page "Página con edición de hora correcta" exists
  And I wait for 1 seconds
  And I click "edit-info-page"
  And I clear text at "hour-field"
  And I enter text at "hour-field" with data online and valid hour
  And I click "page-title"
  Then I reload the page
  And I click "edit-info-page"
  And I compare text "20:00" at "hour-field"

@user5 @web
Scenario: Edit the published hour with an incorrect hour to a page created
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click "sign-in"
  And I wait for 5 seconds
  And I click "pages"
  And I wait for 1 seconds
  And I click "new-page"
  And I wait for 1 seconds
  And I click "page-title"
  And I enter text "Página con edición de hora incorrecta" at "page-title"
  And I click "page-body"
  And I enter text "A esta página se le editará la hora de manera errónea" at "page-body"
  And I click "publish"
  And I wait for 1 seconds
  And I click "final-review"
  And I wait for 1 seconds
  And I click "publish-right-now"
  And I wait for 3 seconds
  And I navigate to page "<URL_PAGES>"
  And I wait for 1 seconds
  And I find if the page "Página con edición de hora incorrecta" exists
  And I wait for 1 seconds
  When I click "edit-info-page"
  And I clear text at "hour-field"
  And I enter text "25:00" at "hour-field"
  Then I click "page-title"
  And I compare text "Must be in format: "15:00" at "hour-error"