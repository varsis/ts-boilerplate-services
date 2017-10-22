Feature: Checking the API version
    As an API user, I want see what version of the API I'm looking at, so that I can be sure I'm hitting the right one

Scenario: Checking the API version
	Given there is a GET request to /
    When the request is sent to the server
	Then the response should indicate Ok
    And the response body should contain the name and version from the swagger file
