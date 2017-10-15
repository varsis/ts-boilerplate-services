import * as Express from 'express'
import * as bodyParser from 'body-parser'
import { ServerLoader, ServerSettings, Inject, GlobalAcceptMimesMiddleware } from 'ts-express-decorators'
import 'ts-express-decorators/swagger'
import * as path from 'path'
import * as log from 'menna'
import requiredEnvVarsAreMissing from '../cfg/assert'
import * as blocked from 'blocked'
import { CONFIG } from '../cfg'

import requestLogger from '../middleware/request-logger.middleware'
import * as SEQUELIZE_CONFIG from '../cfg/database'
import { DatabaseService } from '../services/database/index'

const rootDir = path.resolve(path.join(__dirname, '../'))

if (process.env.NODE_ENV !== 'test' && requiredEnvVarsAreMissing()) process.exit(1)

// Check if server has been blocked
// tslint:disable-next-line:no-magic-numbers
blocked((ms) => { if (ms > 100) { log.warn(`Node event loop was blocked for ${ms}ms`) } })

@ServerSettings({
  rootDir,
  mount: {
    '/': `${rootDir}/handlers/**/**.js`,
  },
  port: CONFIG.PORT,
  componentsScan: [
    `${rootDir}/models/factory/**.js`,
    `${rootDir}/middleware/**/**.js`,
    `${rootDir}/services/**/**.js`,
    `${rootDir}/cfg/**/**.js`,
  ],
  httpsPort: false,
  swagger: {
    path: '/docs',
  },
  acceptMimes: ['application/json'],
})
export class Server extends ServerLoader {

  @Inject()
  async $onInit(): Promise<any> {
    const database = DatabaseService.connect(SEQUELIZE_CONFIG)
    return database.authenticate()
      .then(() => log.debug('DB connected'))
  }

  $onMountingMiddlewares(): void|Promise<any> {
    this
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: false,
      }))
      .use(requestLogger)
  }

  $onReady() {
    log.debug('Server initialized')
  }

  $onServerInitError(error): any {
    log.error('Server encounter an error =>', error)
  }
}
