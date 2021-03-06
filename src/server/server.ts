import * as Express from 'express'
import * as Util from 'util'
import * as bodyParser from 'body-parser'
import * as HttpErrorCodes from 'http-status-codes'
import { ServerLoader, ServerSettings, Inject, GlobalAcceptMimesMiddleware } from 'ts-express-decorators'
import * as tv4 from 'tv4'
import 'ts-express-decorators/swagger'
import * as path from 'path'
import * as swagger from 'swagger-express-middleware'
import * as log from 'menna'
import requiredEnvVarsAreMissing from '../cfg/assert'
import * as blocked from 'blocked'
import { CONFIG } from '../cfg'

import { GlobalApiKeyAuthMiddleware } from '../middleware'
import requestLogger from '../middleware/request-logger.middleware'
import * as SEQUELIZE_CONFIG from '../cfg/database'
import { DatabaseService } from '../services/database/index'
import { BaseError } from '../errors/error'
import { InternalServerError } from '../errors'

const rootDir = path.resolve(path.join(__dirname, '../'))

if (process.env.NODE_ENV !== 'test' && requiredEnvVarsAreMissing()) process.exit(1)

// Check if server has been blocked
// tslint:disable-next-line:no-magic-numbers
blocked((ms) => { if (ms > 100) { log.warn(`Node event loop was blocked for ${ms}ms`) } })

@ServerSettings({
  rootDir,
  mount: {
    '/': `${rootDir}/handlers/**/**.${CONFIG.EXTENSION}`,
  },
  port: CONFIG.PORT,
  componentsScan: [
    `${rootDir}/database-models/factory/!(*.spec).${CONFIG.EXTENSION}`,
    `${rootDir}/models/**/!(*.spec).${CONFIG.EXTENSION}`,
    `${rootDir}/interaces/**/!(*.spec).${CONFIG.EXTENSION}`,
    `${rootDir}/middleware/**/!(*.spec).${CONFIG.EXTENSION}`,
    `${rootDir}/services/**/!(*.spec).${CONFIG.EXTENSION}`,
    `${rootDir}/cfg/**/!(*.spec).${CONFIG.EXTENSION}`,
  ],
  httpsPort: false,
  version: CONFIG.VERSION,
  swagger: {
    path: '/docs',
    validate: true,
    spec: {
      securityDefinitions: {
        APIKeyHeader: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
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
      .use(GlobalAcceptMimesMiddleware)
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: false,
      }))
      .use(requestLogger)
      .use(GlobalApiKeyAuthMiddleware)
  }

  $onReady() {
    log.debug('Server initialized')
  }

  public $onError(
    error: any,
    request: Express.Request,
    response: Express.Response,
    next: Function
  ): void {
    log.error(error)

    let responseError: BaseError = new InternalServerError()
    if (error instanceof BaseError) {
      responseError = error
    } else if (error && error.status && error.message) {
      responseError = new BaseError(error.status, `${error.status}.0`, error.message)
    }

    response
      .status(responseError.httpCode)
      .send(responseError.toJSON())
  }

  $onServerInitError(error): any {
    log.error('Server encounter an error =>', error)
  }
}
