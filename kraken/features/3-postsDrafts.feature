Feature: Post Drafts en Ghost

  @user1 @web
  Scenario: debería crear y luego editar un borrador de post
    Given I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
    And I wait for 1 seconds
    And I enter email "df.guerrerov1@uniandes.edu.co"
    And I enter password "qwerty1234"
    And I click next
    And I wait for 1 seconds
    And I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
    And I wait for 1 seconds
    And I click on the link with text "Drafts"
    And I wait for 1 seconds
    When I click on the link with text "New post"
    And I wait for 1 seconds
    And I enter post name "New post"
    And I enter post description "Una buena alimentación es buena para la salud"
    And I wait for 2 seconds
    And I click on the link with text "Publish"
    And I wait for 2 seconds
    And I click on the link with text " Editor"
    And I wait for 2 seconds
    And I enter post name "New post Edited"
    And I enter post description "Una buena alimentación es buena para la salud en general"
    And I wait for 2 seconds
    And I click on the link with text "Publish"
    And I wait for 2 seconds
    And I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/posts?type=draft"
    And I wait for 2 seconds
    Then the post "New post Edited" should be present in the post list
    And I wait for 2 seconds  
    

  @user2 @web
  Scenario: debería crear un draft post sin descripción
    Given I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
    And I wait for 1 seconds
    And I enter email "df.guerrerov1@uniandes.edu.co"
    And I enter password "qwerty1234"
    And I click next
    And I wait for 1 seconds
    And I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
    And I wait for 1 seconds
    And I click on the link with text "Drafts"
    And I wait for 1 seconds
    When I click on the link with text "New post"
    And I wait for 1 seconds
    And I enter post name "New post borrador"
    And I wait for 1 seconds
    And I enter post description " "
    And I wait for 2 seconds
    And And I click Publish
    And I wait for 1 seconds
    And I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/posts?type=draft"
    And I wait for 2 seconds
    Then the post "New post borrador" should be present in the post list
    And I wait for 2 seconds  
    

  @user3 @web
  Scenario: debería eliminar un draft post creado
    Given I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
    And I wait for 1 seconds
    And I enter email "df.guerrerov1@uniandes.edu.co"
    And I enter password "qwerty1234"
    And I click next
    And I wait for 1 seconds
    And I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
    And I wait for 1 seconds
    And I click on the link with text "Drafts"
    And I wait for 1 seconds
    When I click on the link with text "New post"
    And I wait for 1 seconds
    And I enter post name "New post for deleting"
    And I enter post description "Prueba de descripción de draft post para borrar"
    And I wait for 2 seconds
    And And I click Publish
    And I wait for 2 seconds
    And I click on the link with text " Editor"
    And I wait for 2 seconds
    And I click on the post settings
    And I wait for 2 seconds    
    And I click on Delete post
    And I wait for 2 seconds 
    And the modal with text "Are you sure you want to delete this post?" should exist
    And I wait for 1 seconds
    Then I click on the "Delete" button in the modal footer
    And I wait for 2 seconds
    And the post "New post for deleting" should be deleted
    And I wait for 2 seconds



@user4 @web
  Scenario: Cancelar la eliminacion de un draft post creado
    Given I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
    And I wait for 1 seconds
    And I enter email "df.guerrerov1@uniandes.edu.co"
    And I enter password "qwerty1234"
    And I click next
    And I wait for 1 seconds
    And I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
    And I wait for 1 seconds
    And I click on the link with text "Drafts"
    And I wait for 1 seconds
    When I click on the link with text "New post"
    And I wait for 1 seconds
    And I enter post name "New post for canceling"
    And I enter post description "Prueba de descripción de draft post para cancelar"
    And I wait for 2 seconds
    And And I click Publish
    And I wait for 2 seconds
    And I click on the link with text " Editor"
    And I wait for 2 seconds
    And I click on the post settings
    And I wait for 2 seconds    
    And I click on Delete post
    And I wait for 2 seconds 
    And the modal with text "Are you sure you want to delete this post?" should exist
    And I wait for 1 seconds
    And I click on the "Cancel" button for canceling in the modal footer
    And I wait for 2 seconds
    And the post "New post for deleting" should be deleted
    And I wait for 2 seconds
    And I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/posts?type=draft"
    And I wait for 2 seconds
    Then the post "New post for canceling" should be present in the post list
    And I wait for 2 seconds

  
  @user5 @web
  Scenario: Crear Draft Post y publicarlo y verificarlo en posts Publicados
    Given I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
    And I wait for 1 seconds
    And I enter email "df.guerrerov1@uniandes.edu.co"
    And I enter password "qwerty1234"
    And I click next
    And I wait for 1 seconds
    And I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/dashboard"
    And I wait for 1 seconds
    And I click on the link with text "Drafts"
    And I wait for 1 seconds
    When I click on the link with text "New post"
    And I wait for 1 seconds
    And I enter post name "New post for Publishing"
    And I wait for 1 seconds
    And I enter post description "Prueba de descripción de draft post para publicar"
    And I wait for 2 seconds
    And And I click Publish
    And I wait for 2 seconds
    And I click on the link with text "Continue, final review →"
    And I wait for 2 seconds
    And I click on the link with text "Publish post, right now"
    And I wait for 2 seconds    
    And I navigate to page "https://ghost-grupo-11.onrender.com/ghost/#/posts?type=published"
    And I wait for 2 seconds
    Then the post "New post for Publishing" should be present in the publish post list
    And I wait for 2 seconds


    