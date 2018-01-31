import { before, binding, after } from 'cucumber-tsflow'
import { setDefaultTimeout } from 'cucumber'
import { ServerSpace } from './server.space'
import * as request from 'request-promise'
import { CONFIG } from '../../src/cfg'

@binding([ServerSpace])
class ServerSupport {

  constructor(
    protected serverSpace: ServerSpace,
  ){}

  @before()
  public async beforeAllServer(): Promise<any> {
    await this.serverSpace.start()
  }
}

export = ServerSupport
