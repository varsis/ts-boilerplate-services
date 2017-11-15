import { before, binding, after } from "cucumber-tsflow"
import { ServerSpace } from './server.space'

@binding([ServerSpace])
class ServerSupport {

  constructor(
    protected serverSpace: ServerSpace,
  ){}

  @before()
  public async beforeAllServer(): Promise<void> {
    return this.serverSpace.start()
  }
}

export = ServerSupport
