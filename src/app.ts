import { Server } from './server'
import * as log from 'menna'

log.info('Initialize server')

new Server()
  .start()
  .then(() => {
    log.info('Server started...')
  })
  .catch((err: any) => {
    log.error(err)
  })
