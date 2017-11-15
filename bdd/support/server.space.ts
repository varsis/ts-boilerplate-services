import { serverInstance } from '../../src/app'

export class ServerSpace {

  public server

  constructor() {
    this.server = serverInstance.expressApp
  }

  start(): Promise<void> {
    return Promise.resolve()
  }
}
