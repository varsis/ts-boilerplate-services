import { binding, given, then } from 'cucumber-tsflow'
import { omit } from 'ramda'
import { expect } from 'chai'
import * as uuidValidate from 'uuid-validate'
import { DatabaseSpace, RequestSpace, ResponseSpace } from '../support'
import { CONFIG } from '../../src/cfg'

@binding([RequestSpace, ResponseSpace, DatabaseSpace])
class FooStep {

  private Foo

  constructor(
    protected requestSpace: RequestSpace,
    protected responseSpace: ResponseSpace,
    protected databaseSpace: DatabaseSpace,
  ) {
    this.Foo = {} as any
  }


  @given(/^there are foos stored in the database with the following:$/)
  public async givenFoos(data): Promise<void> {
    const foos = data.hashes()
    return this.Foo.bulkCreate(foos)
  }

  @given(/^there is a request to get the same foo$/)
  public async givenFoodRequest(): Promise<void> {
    expect(this.responseSpace.body.id).to.be.a('string')
    // tslint-disable-next-line chai-friendly/no-unused-expressions
    expect(uuidValidate(this.responseSpace.body.id)).to.be.true
    const id = this.responseSpace.body.id
    this.requestSpace.method = 'get'
    this.requestSpace.uri = `/foo/${id}`
    this.requestSpace.body = null
  }

  @then(/^the foo should be output in the response$/)
  public async thenFooResponse(): Promise<void> {
    expect(this.responseSpace.body.id).to.exist
    const id = this.responseSpace.body.id

    const foo = await this.Foo.findOne({ where: { id }, raw: true })

    expect(foo).to.exist
    expect(this.responseSpace.body).to.contain.all.keys(foo)
  }
}

export = FooStep
