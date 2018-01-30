import { expect } from 'chai'
import * as supertest from 'supertest'
import { mergeAll } from 'ramda'
import { binding, given, then, when } from 'cucumber-tsflow'
import * as uuidValidate from 'uuid-validate'
import { RequestSpace, ResponseSpace, ServerSpace } from '../support'
import { CONFIG } from '../../src/cfg'

@binding([RequestSpace, ResponseSpace, ServerSpace])
class RequestStep {

  constructor(
    protected requestSpace: RequestSpace,
    protected responseSpace: ResponseSpace,
    protected serverSpace: ServerSpace,
  ) {}


  @given(/^there is a (\w+) request to (.*)$/)
  public async givenRequest(requestMethod, uri): Promise<void> {
    this.requestSpace.uri = uri
    this.requestSpace.method = requestMethod
  }

  @given(/^the request has the following query arguments:$/)
  public async givenRequestQuery(data): Promise<void> {
    this.requestSpace.query = mergeAll([{}, this.requestSpace.query, data.hashes()])
  }

  @given(/^the request has the following properties:$/)
  public async givenRequestBody(data): Promise<void> {
    this.requestSpace.body = Object.assign({}, this.responseSpace.body, data.hashes()[0])
  }

  @when(/^the request is sent to the server$/)
  public async whenRequestIsSent(): Promise<void> {
    const uri = this.requestSpace.uri
    const method = this.requestSpace.method
    const body = this.requestSpace.body
    const query = this.requestSpace.query
    const headers = this.requestSpace.headers

    const app = await this.serverSpace.express
    const test = supertest(app)
    let request = test[method](uri)

    Object.keys(headers).forEach(
      header => request = request.set(header, headers[header])
    )

    if (body && Object.keys(body).length) {
      request = request.send(body)
    }
    const res = await request

    this.responseSpace.set(res)
  }

  private requestWithOptions(request: RequestSpace) {

  }
}

export = RequestStep
