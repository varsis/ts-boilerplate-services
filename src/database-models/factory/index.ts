import { Service } from 'ts-express-decorators'
import { Foo } from '../Foo'

@Service()
export class ModelsFactory {
  public get Foo(): typeof Foo {
    return Foo
  }
}

