Feature: Post Draft Creation in Ghost

  @user1 @web
  Scenario: Create a new draft post with a title and content
    Given the user has logged in to the Ghost Admin
    And I wait for 5 seconds
    When the user navigates to the post editor screen
    And the user enters a title "My New Ghost Post" for the draft post
    And the user enters content "Contenido del borrador del post." for the draft post
    And I wait for 2 seconds
    Then the user should be on the post editor screen
    And I wait for 2 seconds
    When the user clicks the "Publish" button
    And I wait for 2 seconds