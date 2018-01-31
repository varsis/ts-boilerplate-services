Feature: Getting the Swagger API Specs
    As an API user, I want to see how to use the API

Scenario: Checking the documentation endpoint redirect
	Given there is a GET request to /docs
    When the request is sent to the server
	Then the response should indicate Moved_Permanently
    And the response should have a `content-type` header of `text/html; charset=UTF-8`

Scenario: Checking the documentation endpoint
	Given there is a GET request to /docs/
    When the request is sent to the server
	Then the response should indicate Ok

Scenario: Checking the Swagger JSON
	Given there is a GET request to /docs/swagger.json
    When the request is sent to the server
	Then the response should indicate Ok
    And the response should have a `content-type` header of `application/json; charset=utf-8`
