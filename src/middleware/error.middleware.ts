import { NextFunction as ExpressNext, Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { MiddlewareError, IMiddlewareError, Request, Response, Next, Err } from 'ts-express-decorators'
import * as log from 'menna'
import { BaseError } from '../errors/error'
import { InternalServerError } from '../errors'

@MiddlewareError()
export class GlobalErrorHandlerMiddleware implements IMiddlewareError {

  use(
    @Err() error: any,
    @Request() request: ExpressRequest,
    @Response() response: ExpressResponse,
    @Next() next: ExpressNext
  ): any {
    log.error(error)

    let responseError: BaseError = new InternalServerError()
    if (error instanceof BaseError) {
      responseError = error
    }

    response
      .status(responseError.httpCode)
      .send(responseError.toJSON())
  }
}
