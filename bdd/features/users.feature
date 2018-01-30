Feature: CRUD actions on /user

Background:
    Given the database has a model identified as:
    | modelName | sequentialId | id                                   | firstName | lastName |
    | User      | 1            | 1eef75ed-4e11-4976-87e3-a334afed072d | Chris     | Test     |
   And the database has a model identified as:
    | modelName | sequentialId | id                                   | firstName | lastName |
    | User      | 2            | 3a332193-93bb-446e-8330-2ac303e4d11b | Test      | TestLast |

  @include
Scenario: I can list all the users
    Given there is a GET request to /user
    When the request is sent to the server
    Then the response should indicate Ok
    And the response should have a data with length `2`
    And all items in data array should have a `id`
    And all items in data array should have a `sequentialId`
    And all items in data array should have a `firstName`
    And all items in data array should have a `lastName`

Scenario: I can create a user
    Given there is a POST request to /user
    Given the request has the following properties:
        | firstName  | lastName   |
        | createUser | lastCreate |
    When the request is sent to the server
    Then the response should indicate Created
    And the foo should be output in the response
    And the database should have a model identified as:
        | modelName | firstName  | lastName   |
        | User      | createUser | lastCreate |

Scenario: I can update a user
    Given there is a PATCH request to /user/1eef75ed-4e11-4976-87e3-a334afed072d
    Given the request has the following properties:
        | firstName        |
        | updatedFirstName |
    When the request is sent to the server
    Then the response should indicate Ok
    And the foo should be output in the response
    And the database should have a model identified as:
        | modelName | firstName        |
        | User      | updatedFirstName |

# Scenario: I can get a user I just created
#     Given there is a POST request to /user
#     Given the request has the following properties:
#       | firstName | lastName |
#       | newFirst  | newLast  |
#     When the request is sent to the server
#     Then the response should indicate Created
#     Given there is a request to get the same foo
#     When the request is sent to the server
#     Then the response should indicate Ok
#     And the foo should be output in the response

Scenario: I can delete a User
    Given there is a DELETE request to /user/3a332193-93bb-446e-8330-2ac303e4d11b
    When the request is sent to the server
    Then the response should indicate No_content
    And the database should not have a model identified as:
        | modelName | id                                   |
        | User      | 3a332193-93bb-446e-8330-2ac303e4d11b |

Scenario: I can't get a user that doesn't exist
    Given there is a GET request to /user/a933ae64-0aa9-45a5-85fc-d161fb05363b
    When the request is sent to the server
    Then the response should indicate Not_found
    And the response should have a errorCode with value `404.1`

Scenario: I can't delete a user that doesn't exist
    Given there is a DELETE request to /user/c21dec10-e578-476d-908f-bed4c9ce172f
    When the request is sent to the server
    Then the response should indicate Not_found
    And the response should have a errorCode with value `404.1`
