import * as Express from 'express'
import * as HttpStatusCodes from 'http-status-codes'
import { Controller, Get, Res } from 'ts-express-decorators'
import { DatabaseService } from '../../services/database'

interface HealthResponse {
  database: boolean
  server: boolean
}

@Controller('/health')
export class HealthHandler {

  constructor(private databaseService: DatabaseService){}

  @Get('/')
  public async health(
    @Res() response: Express.Response,
  ): Promise<HealthResponse> {
    let database = true
    try {
      await this.databaseService.instance().authenticate()
    } catch {
      database = false
      response.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR
    }

    return {
      database,
      server: true,
    }
  }
}
