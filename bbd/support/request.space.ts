import { CONFIG } from '../../src/cfg'

export type RequestMethod = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch'

export class RequestSpace {

  private _headers: { [header: string]: string }

  public uri: string
  private _method: RequestMethod
  public body: any
  public query = {}

  constructor() {
    this._headers = {
      Authorization: CONFIG.API_KEY || 'test-api-key',
      'Content-Type': 'application/json',
    }
  }

  public set method(method: RequestMethod) {
    this._method = method
  }

  public get method(): RequestMethod {
    return this._method.toLowerCase() as RequestMethod
  }

  public get headers(): any {
    return this._headers
  }

  public deleteHeader(name: string): void {
    delete this._headers[name]
  }

  public addHeader(name: string, value: any = null): void {
    this._headers[name] = value
  }
}
