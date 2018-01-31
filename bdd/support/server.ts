import { before, binding, after } from 'cucumber-tsflow'
import { setDefaultTimeout } from 'cucumber'
import { ServerSpace } from './server.space'
import * as request from 'request-promise'
import { CONFIG } from '../../src/cfg'

const tryHealth = async (timeout = 5000) => {
  try {
    await request.get(`http://localhost:${CONFIG.PORT}/health`)
  } catch (e) {
      console.log('WAITING ....\n\n\n\\n\n')
    setTimeout(() => tryHealth(timeout), timeout)
  }
}

@binding([ServerSpace])
class ServerSupport {

  constructor(
    protected serverSpace: ServerSpace,
  ){}

  @before()
  public async beforeAllServer(): Promise<any> {
    await this.serverSpace.start()
    await tryHealth()
  }
}

export = ServerSupport
