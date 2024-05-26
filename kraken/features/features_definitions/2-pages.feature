Feature: Pages
 
@user1 @web
Scenario: Create a page correctly
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I take a screenshot in createPage
  And I enter password "<PASSWORD>"
  And I take a screenshot in createPage
  And I wait for 1 seconds
  And I click "sign-in"
  And I take a screenshot in createPage
  And I wait for 5 seconds
  And I click "pages"
  And I take a screenshot in createPage
  And I wait for 1 seconds
  When I click "new-page"
  And I take a screenshot in createPage
  And I wait for 1 seconds
  And I click "page-title"
  And I take a screenshot in createPage
  And I enter text "Mi primera página" at "page-title"
  And I take a screenshot in createPage
  And I click "page-body"
  And I take a screenshot in createPage
  And I enter text "Esta es mi primera página" at "page-body"
  And I take a screenshot in createPage
  And I click "publish"
  And I take a screenshot in createPage
  And I wait for 1 seconds
  And I click "final-review"
  And I take a screenshot in createPage
  And I wait for 1 seconds
  And I click "publish-right-now"
  And I take a screenshot in createPage
  Then I wait for 3 seconds
  And I navigate to page "<URL_PAGES>"
  And I take a screenshot in createPage
  And I wait for 1 seconds
  And I find if the page "Mi primera página" exists
  And I take a screenshot in createPage

@user2 @web
Scenario: Delete a page created
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I take a screenshot in deletePage
  And I enter password "<PASSWORD>"
  And I take a screenshot in deletePage
  And I wait for 1 seconds
  And I click "sign-in"
  And I take a screenshot in deletePage
  And I wait for 5 seconds
  And I click "pages"
  And I take a screenshot in deletePage
  And I wait for 1 seconds
  And I click "new-page"
  And I take a screenshot in deletePage
  And I wait for 1 seconds
  And I click "page-title"
  And I take a screenshot in deletePage
  And I enter text "Página a borrar" at "page-title"
  And I take a screenshot in deletePage
  And I click "page-body"
  And I take a screenshot in deletePage
  And I enter text "Esta es una página a borrar" at "page-body"
  And I take a screenshot in deletePage
  And I click "publish"
  And I take a screenshot in deletePage
  And I wait for 1 seconds
  And I click "final-review"
  And I take a screenshot in deletePage
  And I wait for 1 seconds
  And I click "publish-right-now"
  And I take a screenshot in deletePage
  And I wait for 3 seconds
  And I navigate to page "<URL_PAGES>"
  And I take a screenshot in deletePage
  And I wait for 1 seconds
  And I find if the page "Página a borrar" exists
  And I take a screenshot in deletePage
  And I wait for 1 seconds
  When I click "edit-info-page"
  And I take a screenshot in deletePage
  And I click "delete-page"
  And I take a screenshot in deletePage
  And I click "delete-page-confirm"
  And I take a screenshot in deletePage
  Then I navigate to page "<URL_PAGES"
  And I take a screenshot in deletePage
  And I wait for 1 seconds
  And I find if the page "Página a borrar" do not exist
  And I take a screenshot in deletePage

@user3 @web
Scenario: Create a page with a title over the characters limit (255)
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I take a screenshot in createPageInvalid
  And I enter password "<PASSWORD>"
  And I take a screenshot in createPageInvalid
  And I wait for 1 seconds
  And I click "sign-in"
  And I take a screenshot in createPageInvalid
  And I wait for 5 seconds
  And I click "pages"
  And I take a screenshot in createPageInvalid
  And I wait for 1 seconds
  And I click "new-page"
  And I take a screenshot in createPageInvalid
  And I wait for 1 seconds
  And I click "page-title"
  And I take a screenshot in createPageInvalid
  When I enter text "Texto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteresTexto255caracteres" at "page-title"
  And I take a screenshot in createPageInvalid
  And I click "page-body"
  And I take a screenshot in createPageInvalid
  And I enter text "Esta es una página que su título pasa los 255 caracteres" at "page-body"
  And I take a screenshot in createPageInvalid
  Then I click "publish"
  And I take a screenshot in createPageInvalid
  And I compare text "Validation failed: Title cannot be longer than 255 characters." at "error-limit-characters"
  And I take a screenshot in createPageInvalid

@user4 @web
Scenario: Edit the published hour with a correct hour to a page created
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I take a screenshot in createPageValidHour
  And I enter password "<PASSWORD>"
  And I take a screenshot in createPageValidHour
  And I wait for 1 seconds
  And I click "sign-in"
  And I take a screenshot in createPageValidHour
  And I wait for 5 seconds
  And I click "pages"
  And I take a screenshot in createPageValidHour
  And I wait for 1 seconds
  And I click "new-page"
  And I take a screenshot in createPageValidHour
  And I wait for 1 seconds
  And I click "page-title"
  And I take a screenshot in createPageValidHour
  And I enter text "Página con edición de hora correcta" at "page-title"
  And I take a screenshot in createPageValidHour
  And I click "page-body"
  And I take a screenshot in createPageValidHour
  And I enter text "A esta página se le editará la hora correctamente" at "page-body"
  And I take a screenshot in createPageValidHour
  And I click "publish"
  And I take a screenshot in createPageValidHour
  And I wait for 1 seconds
  And I click "final-review"
  And I take a screenshot in createPageValidHour
  And I wait for 1 seconds
  And I click "publish-right-now"
  And I take a screenshot in createPageValidHour
  And I wait for 3 seconds
  And I navigate to page "<URL_PAGES>"
  And I take a screenshot in createPageValidHour
  And I wait for 1 seconds
  When I find if the page "Página con edición de hora correcta" exists
  And I take a screenshot in createPageValidHour
  And I wait for 1 seconds
  And I click "edit-info-page"
  And I take a screenshot in createPageValidHour
  And I clear text at "hour-field"
  And I take a screenshot in createPageValidHour
  And I enter text "20:00" at "hour-field"
  And I take a screenshot in createPageValidHour
  And I click "page-title"
  And I take a screenshot in createPageValidHour
  Then I reload the page
  And I click "edit-info-page"
  And I take a screenshot in createPageValidHour
  And I compare text "20:00" at "hour-field"
  And I take a screenshot in createPageValidHour

@user5 @web
Scenario: Edit the published hour with an incorrect hour to a page created
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I take a screenshot in createPageInvalidHour
  And I enter password "<PASSWORD>"
  And I take a screenshot in createPageInvalidHour
  And I wait for 1 seconds
  And I click "sign-in"
  And I take a screenshot in createPageInvalidHour
  And I wait for 5 seconds
  And I click "pages"
  And I take a screenshot in createPageInvalidHour
  And I wait for 1 seconds
  And I click "new-page"
  And I take a screenshot in createPageInvalidHour
  And I wait for 1 seconds
  And I click "page-title"
  And I take a screenshot in createPageInvalidHour
  And I enter text "Página con edición de hora incorrecta" at "page-title"
  And I take a screenshot in createPageInvalidHour
  And I click "page-body"
  And I take a screenshot in createPageInvalidHour
  And I enter text "A esta página se le editará la hora de manera errónea" at "page-body"
  And I take a screenshot in createPageInvalidHour
  And I click "publish"
  And I take a screenshot in createPageInvalidHour
  And I wait for 1 seconds
  And I click "final-review"
  And I take a screenshot in createPageInvalidHour
  And I wait for 1 seconds
  And I click "publish-right-now"
  And I take a screenshot in createPageInvalidHour
  And I wait for 3 seconds
  And I navigate to page "<URL_PAGES>"
  And I take a screenshot in createPageInvalidHour
  And I wait for 1 seconds
  And I find if the page "Página con edición de hora incorrecta" exists
  And I take a screenshot in createPageInvalidHour
  And I wait for 1 seconds
  When I click "edit-info-page"
  And I take a screenshot in createPageInvalidHour
  And I clear text at "hour-field"
  And I take a screenshot in createPageInvalidHour
  And I enter text "25:00" at "hour-field"
  And I take a screenshot in createPageInvalidHour
  Then I click "page-title"
  And I take a screenshot in createPageInvalidHour
  And I compare text "Must be in format: "15:00" at "hour-error"
  And I take a screenshot in createPageInvalidHour