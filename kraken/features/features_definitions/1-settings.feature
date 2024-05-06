Feature: Settings

@user1 @web
Scenario: Acceder a las configuraciones de ghost (metadatos)
    Given I navigate to page "<URL_SIGN_IN>"
    And I wait for 1 seconds
    And I enter email "<USERNAME>"
    And I enter password "<PASSWORD>"
    And I wait for 1 seconds
    And I click "sign-in"
    And I wait for 5 seconds
    When I click "settings"
    And I wait for 1 seconds
    And I click "settings-general"
    And I wait for 1 seconds
    And I click "meta-data"
    And I wait for 1 seconds
    And I clear text at "meta-title"
    And I enter text "Grupo 11" at "meta-title"
    And I wait for 1 seconds
    And I click "save-settings"
    And I wait for 1 seconds
    Then I reload the page
    And I click "meta-data"
    And I wait for 1 seconds
    And I compare text "Grupo 11" at "meta-title"

@user2 @web
Scenario: Personalizar los datos estructurados de un sitio para Twitter
    Given I navigate to page "<URL_SIGN_IN>"
    And I wait for 1 seconds
    And I enter email "<USERNAME>"
    And I enter password "<PASSWORD>"
    And I wait for 1 seconds
    And I click "sign-in"
    And I wait for 5 seconds
    When I click "settings"
    And I wait for 1 seconds
    And I click "settings-general"
    And I wait for 1 seconds
    And I click "twitter"
    And I wait for 1 seconds
    And I clear text at "twitter-title"
    And I enter text "Grupo 11 Twitter" at "twitter-title"
    And I wait for 1 seconds
    And I click "save-settings"
    And I wait for 1 seconds
    Then I reload the page
    And I click "twitter"
    And I wait for 1 seconds
    And I compare text "Grupo 11 Twitter" at "twitter-title"

@user3 @web
Scenario: Personalizar los datos estructurados de un sitio para Facebook
    Given I navigate to page "<URL_SIGN_IN>"
    And I wait for 1 seconds
    And I enter email "<USERNAME>"
    And I enter password "<PASSWORD>"
    And I wait for 1 seconds
    And I click "sign-in"
    And I wait for 5 seconds
    When I click "settings"
    And I wait for 1 seconds
    And I click "settings-general"
    And I wait for 1 seconds
    And I click "facebook"
    And I wait for 1 seconds
    And I clear text at "facebook-title"
    And I enter text "Grupo 11 Facebook" at "facebook-title"
    And I wait for 1 seconds
    And I click "save-settings"
    And I wait for 1 seconds
    Then I reload the page
    And I click "facebook"
    And I wait for 1 seconds
    And I compare text "Grupo 11 Facebook" at "facebook-title"

@user4 @web
Scenario: Vincular cuentas de redes sociales con datos incorrectos
    Given I navigate to page "<URL_SIGN_IN>"
    And I wait for 1 seconds
    And I enter email "<USERNAME>"
    And I enter password "<PASSWORD>"
    And I wait for 1 seconds
    And I click "sign-in"
    And I wait for 5 seconds
    When I click "settings"
    And I wait for 1 seconds
    And I click "settings-general"
    And I wait for 1 seconds
    And I click "social-accounts"
    And I wait for 1 seconds
    And I clear text at "social-facebook-page"
    And I enter text "https://facebook.com/¿?&%$" at "social-facebook-page"
    And I clear text at "social-twitter-profile"
    And I enter text "https://twitter.com/¿?&%$" at "social-twitter-profile"
    And I click "social-accounts-title"
    And I compare text "The URL must be in a format like https://www.facebook.com/yourPage" at "error-facebook"
    And I compare text "Your Username is not a valid Twitter Username" at "error-twitter"

@user5 @web
Scenario: Vincular cuentas de redes sociales con datos correctos
    Given I navigate to page "<URL_SIGN_IN>"
    And I wait for 1 seconds
    And I enter email "<USERNAME>"
    And I enter password "<PASSWORD>"
    And I wait for 1 seconds
    And I click "sign-in"
    And I wait for 5 seconds
    When I click "settings"
    And I wait for 1 seconds
    And I click "settings-general"
    And I wait for 1 seconds
    And I click "social-accounts"
    And I wait for 1 seconds
    And I clear text at "social-facebook-page"
    And I enter text "https://facebook.com/MISO-Grupo-11" at "social-facebook-page"
    And I clear text at "social-twitter-profile"
    And I enter text "https://twitter.com/MISO-Grupo-11" at "social-twitter-profile"
    And I click "save-settings"
    Then I reload the page
    And I click "social-accounts"
    And I wait for 1 seconds
    And I compare text "https://facebook.com/MISO-Grupo-11" at "social-facebook-page"
    And I compare text "https://twitter.com/MISO-Grupo-11" at "social-twitter-profile"