import { binding, given, then } from 'cucumber-tsflow'
import { omit } from 'ramda'
import { expect } from 'chai'
import { getRepository } from 'typeorm'
import { DatabaseSpace } from '../support'
import { CONFIG } from '../../src/cfg'

@binding([DatabaseSpace])
class DatabaseStep {

  constructor(
    private databaseSpace: DatabaseSpace,
  ){}

  @given(/^the database has a model identified as:$/)
  public async givenModel(data): Promise<void> {
    const { modelName, modelData } = this.getTableData(data)

    const connection = await this.databaseSpace.connection
    const repo = connection.getRepository(modelName)
    const item = repo.create(modelData)
    await repo.save(item)
  }

  @then(/^the database should have a model identified as:$/)
  public async thenModel(data): Promise<void> {
    const item = await this.expectOne(data)
    item.to.not.be.null
  }

  @then(/^the database should not have a model identified as:$/)
  public async thenNotModel(data): Promise<void> {
    const item = await this.expectOne(data)
    item.to.be.undefined
  }

  private async expectOne(data): Promise<any>  {
    const { modelName, modelData } = this.getTableData(data)

    const connection = await this.databaseSpace.connection
    const dbRecord = await connection.getRepository(modelName).findOne({ where: modelData })

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
