Feature: CRUD actions on /foo

Background:
    # You can also put database values in test/data/fake-database.json!
    Given there are foos stored in the database with the following:
    | id                                   | bar   |
    | 99697d9b-2697-4826-b48c-7f0129e13b21 | B@1   |
    | 859c9114-1eda-421a-aa84-188b63abe94c | stuff |

Scenario: I can list all the foos
    Given there is a GET request to /foo
    When the request is sent to the server
    Then the response should indicate Ok
    And the response should be an array of length 3

Scenario: I can create a foo
    Given there is a POST request to /foo
    Given the request has the following properties:
        | bar           |
        | All Bar One   |
    When the request is sent to the server
    Then the response should indicate Created
    And the foo should be output in the response
    And the database should have a model identified as:
        | modelName | bar         |
        | Foo       | All Bar One |

Scenario: I can update a foo
    Given there is a PATCH request to /foo/99697d9b-2697-4826-b48c-7f0129e13b21
    Given the request has the following properties:
        | bar           |
        | All Bar Two   |
    When the request is sent to the server
    Then the response should indicate Ok
    And the foo should be output in the response
    And the database should have a model identified as:
        | modelName | bar         |
        | Foo       | All Bar Two |

Scenario: I can get a foo I just created
    Given there is a POST request to /foo
    Given the request has the following properties:
      | bar           |
      | All Bar One   |
    When the request is sent to the server
    Then the response should indicate Created
    Given there is a request to get the same foo
    When the request is sent to the server
    Then the response should indicate Ok
    And the foo should be output in the response

Scenario: I can delete a foo
    Given there is a GET request to /foo
    When the request is sent to the server
    Then the response should indicate Ok
    And the response should be an array of length 3
    Given there is a DELETE request to /foo/99697d9b-2697-4826-b48c-7f0129e13b21
    When the request is sent to the server
    Then the response should indicate Ok
    And the database should not have a model identified as:
        | modelName | id                                   |
        | Foo       | 99697d9b-2697-4826-b48c-7f0129e13b21 |

Scenario: I can't get a foo that doesn't exist
    Given there is a GET request to /foo/a933ae64-0aa9-45a5-85fc-d161fb05363b
    When the request is sent to the server
    Then the response should indicate Not_found
    And the response should have a errorCode with value `404.1`

Scenario: I can't delete a foo that doesn't exist
    Given there is a DELETE request to /foo/c21dec10-e578-476d-908f-bed4c9ce172f
    When the request is sent to the server
    Then the response should indicate Not_found
    And the response should have a errorCode with value `404.1`
