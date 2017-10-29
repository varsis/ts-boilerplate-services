import { Server } from './server'
import * as log from 'menna'

log.info('Initialize server')

export const serverInstance = new Server()

export const server = serverInstance
  .start()
  .then(() => {
    log.info('Server started...')
  })
  .catch((err: any) => {
    log.error(err)
  })

