export class BaseError extends Error {
  constructor(
    private _httpCode: number,
    private _errorCode: string,
    private _errorMessage: string,
  ) {
    super(_errorMessage)

    // Force set the name to be the class name for debugging!
    this.name = this.constructor.name

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BaseError.prototype)
  }

  public get httpCode(): number {
    return this._httpCode
  }

  public get errorCode(): string {
    return this._errorCode
  }

  public get errorMessage(): string {
    return this._errorMessage
  }

  public toJSON(): {
    errorCode: string
    errorMessage: string
  } {
    return {
      errorCode: this._errorCode,
      errorMessage: this._errorMessage,
    }
  }
}

export default BaseError
