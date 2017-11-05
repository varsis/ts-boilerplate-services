import { IMiddleware, Middleware, Request, ServerSettingsService } from 'ts-express-decorators'
import { ISwaggerSettings } from 'ts-express-decorators/swagger'
import * as safeCompare from 'safe-compare'
import { Unauthorized } from '../errors'
import { CONFIG } from '../cfg'

@Middleware()
export class GlobalApiKeyAuthMiddleware implements IMiddleware {

  protected swaggerPath
  constructor(
    private serverSettingsService: ServerSettingsService,
  ) {
    this.swaggerPath = this.serverSettingsService.get<ISwaggerSettings>('swagger').path
  }

  public use(@Request() request: Request) {
    if (request.url.indexOf(this.swaggerPath) === 0 || request.url === '/health') {
      return
    }

    if (!safeCompare(request.headers['authorization'], CONFIG.API_KEY)) {
      throw new Unauthorized()
    }
  }
}
