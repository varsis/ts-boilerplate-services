import { Service } from 'ts-express-decorators'
import { FooCreateRequest, FooUpdateRequest } from '../../interfaces'
import { FooNotFound } from '../../errors'
import { DatabaseService } from '../database/index'
import { Foo } from '../../models/Foo'
import { ModelsFactory } from '../../models/factory'

@Service()
export class FooService {

  constructor(
    private models: ModelsFactory,
  ) {}

  public async create(foo: FooCreateRequest): Promise<Foo> {
    return this.models.Foo.create<Foo>(foo)
  }
  public async update(id: string, fooUpdate: FooUpdateRequest): Promise<Foo> {
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
