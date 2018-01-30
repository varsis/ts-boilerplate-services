import { Server } from '../../src/server'

import { serverInstance, server } from '../../src/app'

export class ServerSpace {

  public express

  constructor() {
    this.express = serverInstance.expressApp
  }

  public async start(): Promise<Server | void> {
    return server
  }

}
