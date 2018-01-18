import { binding, given, then } from 'cucumber-tsflow'
import { expect } from 'chai'
import { RequestSpace, ResponseSpace } from '../support'
import { Unauthorized } from '../../src/errors'
import { CONFIG } from '../../src/cfg'

@binding([RequestSpace, ResponseSpace])
class AuthStep {

  constructor(
    protected request: RequestSpace,
    protected response: ResponseSpace,
  ) {}

  @given(/^the request is not authenticated$/)
  public givenNotAuthenticated(): void {
    this.request.deleteHeader('Authorization')
  }

  @given(/^the request has the correct API key/)
  public givenAuthenticated(): void {
    this.request.addHeader('Authorization', CONFIG.API_KEY)
  }

  @then(/^an unauthorized error should be returned in the response/)
  public thenAuthenticationError(): void {
    const unauthorized = new Unauthorized()
    expect(this.response.body).to.deep.equal(unauthorized.toJSON())
  }
}

export = AuthStep
