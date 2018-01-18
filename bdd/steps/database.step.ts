import { binding, given, then } from 'cucumber-tsflow'
import { omit } from 'ramda'
import { expect } from 'chai'
import { DatabaseSpace } from '../support'
import { CONFIG } from '../../src/cfg'

@binding([DatabaseSpace])
class DatabaseStep {

  private models

  constructor(
    protected databaseSpace: DatabaseSpace,
  ) {
    this.models = {} //this.databaseSpace.connection
  }


  @given(/^the database has a model identified as:$/)
  public async givenModel(data): Promise<void> {
    const { modelName, modelData } = this.getTableData(data)

    await this.models[modelName].create(modelData)
  }

  @then(/^the database should have a model identified as:$/)
  public async thenModel(data): Promise<void> {
    const item = await this.expectOne(data)
    item.to.not.be.null
  }

  @then(/^the database should not have a model identified as:$/)
  public async thenNotModel(data): Promise<void> {
    const item = await this.expectOne(data)
    item.to.be.null
  }

  private async expectOne(data): Promise<any>  {
    const { modelName, modelData } = this.getTableData(data)

    const dbRecord = await this.models[modelName].findOne({ where: modelData })

    return expect(dbRecord)
  }

  private getTableData = (data) => {
    const table = data.hashes()[0]

    const modelName = table.modelName
    const modelData = omit(['modelName'], table)

    return { modelName, modelData }
  }
}

export = DatabaseStep
