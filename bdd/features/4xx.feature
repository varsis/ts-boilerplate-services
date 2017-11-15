Feature: Validating HTTP requests
    As an API user, I need to know if there is a problem with my request

Scenario: An unknown url is requested
    Given there is a GET request to /shall-we-go-to-flat-iron
    When the request is sent to the server
    Then the response should indicate NOT_FOUND
