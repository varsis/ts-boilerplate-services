import { Server } from './server'
import menna from 'menna'

menna.info('Initialize server')

new Server()
  .start()
  .then(() => {
    menna.info('Server started...')
  })
  .catch((err: any) => {
    menna.error(err)
  })
