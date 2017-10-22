Feature: Checking the API health
    As an API user, I want to see whether the API is dying

Scenario: Checking the API health
	Given there is a GET request to /health
  When the request is sent to the server
	Then the response should indicate Ok
