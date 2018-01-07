import { BaseError } from './error'
import * as HttpErrorCodes from 'http-status-codes'

export class UserNotFound extends BaseError {
  constructor() {
    super(HttpErrorCodes.NOT_FOUND, '404.1', 'Ran out of users today, would you like some help?')
  }
}

