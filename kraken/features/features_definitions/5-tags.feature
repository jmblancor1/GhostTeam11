Feature: Tags
 
@user1 @web
Scenario: Crear un tag exitosamente
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I take a screenshot in createTag
  And I enter password "<PASSWORD>"
  And I take a screenshot in createTag
  And I click next
  And I take a screenshot in createTag
  And I wait for 1 seconds
  And I navigate to page "<URL_DASHBOARD>"
  And I take a screenshot in createTag
  And I wait for 5 seconds
  And I click on the link with text "Tags"
  And I navigate to page "<URL_TAGS>"
  And I take a screenshot in createTag
  And I wait for 1 seconds
  When I click on the link with text "New tag"
  And I take a screenshot in createTag
  And I wait for 1 seconds
  And I enter tag name "Nuevo Tag"
  And I take a screenshot in createTag
  And I enter "523444" into the input field with name "accent-color"
  And I take a screenshot in createTag
  And I enter "nuevo-tag" into the input field with name "slug"
  And I take a screenshot in createTag
  And I enter description "Esta es la descripción para mi nuevo tag"
  And I take a screenshot in createTag
  Then I click on the link with text "Save"
  And I take a screenshot in createTag
  And I wait for 3 seconds
  And I click on the link with text "Tags"
  And I navigate to page "<URL_TAGS>"
  And I take a screenshot in createTag
  And I wait for 2 seconds
  Then the tag "Nuevo Tag" should be present in the tag list
  And I take a screenshot in createTag
  And I wait for 2 seconds

@user2 @web
Scenario: Eliminar un tag exitosamente
  Given I navigate to page "<URL_SIGN_IN>"
  And I wait for 1 seconds
  And I enter email "<USERNAME>"
  And I take a screenshot in deleteTag
  And I enter password "<PASSWORD>"
  And I take a screenshot in deleteTag
  And I click next
  And I take a screenshot in deleteTag
  And I wait for 1 seconds
  And I navigate to page "<URL_DASHBOARD>"
  And I take a screenshot in deleteTag
  And I wait for 5 seconds
  And I click on the link with text "Tags"
  And I navigate to page "<URL_TAGS>"
  And I take a screenshot in deleteTag
  And I wait for 1 seconds
  And I click on the link with text "New tag"
  And I take a screenshot in deleteTag
  And I wait for 1 seconds
  And I enter tag name "Nuevo Tag a eliminar"
  And I take a screenshot in deleteTag
  And I enter "f1f4f3" into the input field with name "accent-color"
  And I take a screenshot in deleteTag
  And I enter "nuevo-tag-eliminar" into the input field with name "slug"
  And I take a screenshot in deleteTag
  And I enter description "Esta es la descripción para mi nuevo tag que será eliminado"
  And I take a screenshot in deleteTag
  And I click on the link with text "Save"
  And I take a screenshot in deleteTag
  And I wait for 3 seconds
  And I click on the link with text "Tags"
  And I take a screenshot in deleteTag
  And I navigate to page "<URL_TAGS>"
  And I take a screenshot in deleteTag
  And I wait for 2 seconds
  And the tag "Nuevo Tag a eliminar" should be present in the tag list
  And I take a screenshot in deleteTag
  And I wait for 5 seconds
  When I click on the link with text "Delete tag"
  And I take a screenshot in deleteTag
  And I wait for 2 seconds
  And the modal with text "Are you sure you want to delete this tag?" should exist
  And I take a screenshot in deleteTag
  And I wait for 1 seconds
  Then I click on the "Delete" button in the modal footer
  And I take a screenshot in deleteTag
  And I wait for 4 seconds
  And the tag "Nuevo Tag a eliminar" should be deleted
  And I take a screenshot in deleteTag
  And I wait for 2 seconds


