Feature: Post Drafts en Ghost

  @user1 @web
  Scenario: debería crear y luego editar un borrador de post
    Given I navigate to page "<URL_DASHBOARD>"
    And I wait for 1 seconds
    And I enter email "df.guerrerov1@uniandes.edu.co"
    And I enter password "qwerty1234"
    And I take a screenshot in createPost
    And I click next
    And I wait for 1 seconds
    And I navigate to page "<URL_DASHBOARD>"
    And I wait for 1 seconds
    And I click on the link with text "Drafts"
    And I wait for 1 seconds
    And I take a screenshot in createPost
    When I click on the link with text "New post"
    And I wait for 1 seconds
    And I enter post name "New post"
    And I enter post description "Una buena alimentación es buena para la salud"
    And I wait for 2 seconds
    And I take a screenshot in createPost
    And I click on the link with text "Publish"
    And I wait for 2 seconds
    And I take a screenshot in createPost
    And I click on the link with text " Editor"
    And I wait for 2 seconds
    And I take a screenshot in createPost
    And I enter post name "New post Edited"
    And I enter post description "Una buena alimentación es buena para la salud en general"
    And I wait for 2 seconds
    And I take a screenshot in createPost
    And I click on the link with text "Publish"
    And I wait for 2 seconds
    And I take a screenshot in createPost
    And I navigate to page "<URL_POST_DRAFTS>"
    And I wait for 2 seconds
    And I take a screenshot in createPost
    Then the post "New post Edited" should be present in the post list
    And I wait for 2 seconds  
    

  @user2 @web
  Scenario: debería crear un draft post sin descripción
    Given I navigate to page "<URL_DASHBOARD>"
    And I wait for 1 seconds
    And I enter email "df.guerrerov1@uniandes.edu.co"
    And I enter password "qwerty1234"
    And I take a screenshot in createPostNeg
    And I click next
    And I wait for 1 seconds
    And I navigate to page "<URL_DASHBOARD>"
    And I wait for 1 seconds
    And I click on the link with text "Drafts"
    And I wait for 1 seconds
    And I take a screenshot in createPostNeg
    When I click on the link with text "New post"
    And I wait for 1 seconds
    And I enter post name "New post borrador"
    And I wait for 1 seconds
    And I enter post description " "
    And I take a screenshot in createPostNeg
    And I wait for 2 seconds
    And And I click Publish
    And I wait for 1 seconds
    And I take a screenshot in createPostNeg
    And I navigate to page "<URL_POST_DRAFTS>"
    And I wait for 2 seconds
    And I take a screenshot in createPostNeg
    Then the post "New post borrador" should be present in the post list
    And I wait for 2 seconds  
    

  @user3 @web
  Scenario: debería eliminar un draft post creado
    Given I navigate to page "<URL_DASHBOARD>"
    And I wait for 1 seconds
    And I enter email "df.guerrerov1@uniandes.edu.co"
    And I enter password "qwerty1234"
    And I take a screenshot in deletePost
    And I click next
    And I wait for 1 seconds
    And I take a screenshot in deletePost
    And I navigate to page "<URL_DASHBOARD>"
    And I wait for 1 seconds
    And I click on the link with text "Drafts"
    And I wait for 1 seconds
    And I take a screenshot in deletePost
    When I click on the link with text "New post"
    And I wait for 1 seconds
    And I enter post name "New post for deleting"
    And I enter post description "Prueba de descripción de draft post para borrar"
    And I wait for 2 seconds
    And I take a screenshot in deletePost
    And And I click Publish
    And I wait for 2 seconds
    And I take a screenshot in deletePost
    And I click on the link with text " Editor"
    And I wait for 2 seconds
    And I take a screenshot in deletePost
    And I click on the post settings
    And I wait for 2 seconds   
    And I take a screenshot in deletePost 
    And I click on Delete post
    And I wait for 2 seconds 
    And I take a screenshot in deletePost
    And the modal with text "Are you sure you want to delete this post?" should exist
    And I wait for 1 seconds
    And I take a screenshot in deletePost
    Then I click on the "Delete" button in the modal footer
    And I wait for 2 seconds
    And I take a screenshot in deletePost
    And the post "New post for deleting" should be deleted
    And I wait for 2 seconds
    And I take a screenshot in deletePost



@user4 @web
  Scenario: Cancelar la eliminacion de un draft post creado
    Given I navigate to page "<URL_DASHBOARD>"
    And I wait for 1 seconds
    And I enter email "df.guerrerov1@uniandes.edu.co"
    And I enter password "qwerty1234"
    And I click next
    And I wait for 1 seconds
    And I take a screenshot in cancelDeletePost
    And I navigate to page "<URL_DASHBOARD>"
    And I wait for 1 seconds
    And I click on the link with text "Drafts"
    And I wait for 1 seconds
    And I take a screenshot in cancelDeletePost
    When I click on the link with text "New post"
    And I wait for 1 seconds
    And I enter post name "New post for canceling"
    And I enter post description "Prueba de descripción de draft post para cancelar"
    And I wait for 2 seconds
    And I take a screenshot in cancelDeletePost
    And And I click Publish
    And I wait for 2 seconds
    And I take a screenshot in cancelDeletePost
    And I click on the link with text " Editor"
    And I wait for 2 seconds
    And I take a screenshot in cancelDeletePost
    And I click on the post settings
    And I wait for 2 seconds  
    And I take a screenshot in cancelDeletePost  
    And I click on Delete post
    And I wait for 2 seconds 
    And I take a screenshot in cancelDeletePost
    And the modal with text "Are you sure you want to delete this post?" should exist
    And I wait for 1 seconds
    And I take a screenshot in cancelDeletePost
    And I click on the "Cancel" button for canceling in the modal footer
    And I wait for 2 seconds
    And I take a screenshot in cancelDeletePost
    And the post "New post for deleting" should be deleted
    And I wait for 2 seconds
    And I take a screenshot in cancelDeletePost
    And I navigate to page "<URL_POST_DRAFTS>"
    And I wait for 2 seconds
    And I take a screenshot in cancelDeletePost
    Then the post "New post for canceling" should be present in the post list
    And I wait for 2 seconds

  
  @user5 @web
  Scenario: Crear Draft Post y publicarlo y verificarlo en posts Publicados
    Given I navigate to page "<URL_DASHBOARD>"
    And I wait for 1 seconds
    And I enter email "df.guerrerov1@uniandes.edu.co"
    And I enter password "qwerty1234"
    And I take a screenshot in publishPost
    And I click next
    And I wait for 1 seconds
    And I navigate to page "<URL_DASHBOARD>"
    And I wait for 1 seconds
    And I click on the link with text "Drafts"
    And I wait for 1 seconds
    And I take a screenshot in publishPost
    When I click on the link with text "New post"
    And I wait for 1 seconds
    And I enter post name "New post for Publishing"
    And I wait for 1 seconds
    And I enter post description "Prueba de descripción de draft post para publicar"
    And I wait for 2 seconds
    And I take a screenshot in publishPost
    And And I click Publish
    And I wait for 2 seconds
    And I take a screenshot in publishPost
    And I click on the link with text "Continue, final review →"
    And I wait for 2 seconds
    And I take a screenshot in publishPost
    And I click on the link with text "Publish post, right now"
    And I wait for 2 seconds   
    And I take a screenshot in publishPost 
    And I navigate to page "<URL_POSTS_PUBLISH>"
    And I wait for 2 seconds
    And I take a screenshot in publishPost
    Then the post "New post for Publishing" should be present in the publish post list
    And I wait for 2 seconds
  