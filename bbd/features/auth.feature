Feature: API Key Authentication
    As an API user, I want to authenticate with an API key

Background:
  Given there are foos stored in the database with the following:
    | id                                   | bar       |
    | 85f0a397-d54e-413e-a0ba-c38da94a396a | stuff     |

Scenario: Checking an unauthenticated endpoint with no auth header
	Given there is a GET request to /health
  And the request is not authenticated
  When the request is sent to the server
	Then the response should indicate Ok

Scenario: Checking an authenticated endpoint with no auth header
	Given there is a GET request to /foo/85f0a397-d54e-413e-a0ba-c38da94a396a
  And the request is not authenticated
  When the request is sent to the server
  Then the response should indicate Unauthorized
  And an unauthorized error should be returned in the response

Scenario: Calling an authenticated endpoint with the correct auth header
	Given there is a GET request to /foo/85f0a397-d54e-413e-a0ba-c38da94a396a
  And the request has the correct API key
  When the request is sent to the server
	Then the response should indicate Ok
  And the response should have a bar with value `stuff`
