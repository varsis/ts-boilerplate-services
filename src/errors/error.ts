export class BaseError extends Error {
	constructor(
    httpCode: number,
    errorCode: string,
    errorMessage: string,
  ) {
		super(errorMessage)

    // Force set the name to be the class name for debugging!
    this.name = this.constructor.name

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, BaseError.prototype)
	}

  public get httpCode(): number {
    return this.httpCode
  }

  public get errorCode(): string {
    return this.errorCode
  }

  public get errorMessage(): string {
    return this.errorMessage
  }
}

export default BaseError
