import { Service } from 'ts-express-decorators'
import { IFooCreateRequest, IFooUpdateRequest } from '../../interfaces'
import { FooNotFound } from '../../errors'
import { DatabaseService } from '../database/index'
import { Foo } from '../../database-models/Foo'
import { ModelsFactory } from '../../database-models/factory'

@Service()
export class FooService {

  constructor(
    private models: ModelsFactory,
  ) {}

  public async create(foo: IFooCreateRequest): Promise<Foo> {
    return this.models.Foo.create<Foo>(foo)
  }
  public async update(id: string, fooUpdate: IFooUpdateRequest): Promise<Foo> {
    const foo = await this.get(id)
    return foo.update(fooUpdate)
  }
  public async list(pageNumber: number, pageSize: number): Promise<Foo[]> {
    return this.models.Foo.findAll<Foo>({
      limit: pageSize,
      offset: pageNumber * pageSize,
    })
  }
  public async delete(id: string): Promise<void> {
    return (await this.get(id)).destroy()
  }
  public async get(id: string): Promise<Foo> {
    const foo = await this.models.Foo.findOne<Foo>({ where: { id } })
    if (!foo) throw new FooNotFound()
    return foo
  }
}
