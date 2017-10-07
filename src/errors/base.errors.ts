import { BaseError } from './error'
import * as HttpErrorCodes from 'http-status-codes'

export class InternalServerError extends BaseError {
  constructor() {
    super(HttpErrorCodes.INTERNAL_SERVER_ERROR, '500.1', 'Internal server error')
  }
}

export class DatabaseConnectionFail extends BaseError {
  constructor() {
    super(HttpErrorCodes.INTERNAL_SERVER_ERROR, '500.2', 'Invalid Request (unspecified reason)')
  }
}

export class Unauthorized extends BaseError {
  constructor() {
    super(HttpErrorCodes.UNAUTHORIZED, '401.1', 'Unauthorized')
  }
}

export class BadRequest extends BaseError {
  constructor() {
    super(HttpErrorCodes.BAD_REQUEST, '400.1', 'Invalid Request (unspecified reason)')
  }
}

export class RequiredFieldMissing extends BaseError {
  constructor() {
    super(HttpErrorCodes.BAD_REQUEST, '400.2', 'Required field missing.')
  }
}

export class UniqueConstraintViolation extends BaseError {
  constructor() {
    super(HttpErrorCodes.BAD_REQUEST, '400.3', 'Unique constraint violation.')
  }
}

