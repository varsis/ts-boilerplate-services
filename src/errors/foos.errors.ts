import { BaseError } from './error'
import * as HttpErrorCodes from 'http-status-codes'

export class FooNotFound extends BaseError {
  constructor() {
    super(HttpErrorCodes.NOT_FOUND, '404.1', 'Ran out of foos today, would you like some bars?')
  }
}

