import { flatten, split, path, isNil } from 'ramda'
import { has, get } from 'lodash'
import { expect } from 'chai'
import { binding, given, then, when } from 'cucumber-tsflow'
import * as statusCodes from 'http-status-codes'
import * as prettyjson from 'prettyjson'
import { ResponseSpace, propertiesExistInList, propertiesDontExistInList, typeOf } from '../support'
import * as log from 'menna'
//import { propertiesExistInList, propertiesDontExistInList, typeOf } from '~/test/support/util'

@binding([ResponseSpace])
class ResponseStep {

  constructor(
    protected responseSpace: ResponseSpace,
  ){}

  @then(/^the response should indicate (\w+)$/)
  public async thenResponseStatus(statusName: string): Promise<any> {
    const code = statusCodes[statusName.toUpperCase()]

    if (this.responseSpace.code === code) {
      return null
    }

    this.outputErrorResponse()
    return Promise.reject(`Expected ${statusName} (code: ${code}), got ${this.responseSpace.code}`)
  }

  @then(/^the response should have a '(.*)' header of '(.*)'$/)
  public async thenResponseHeader(headerName, value): Promise<any> {
    expect(this.responseSpace.response.headers[headerName]).to.equal(value)
  }

  @then(/^the response should have a ([^\\ ]*)$/)
  public async thenResponseHave(propertyName) {
    const bodyObject = this.responseSpace.body

    if (has(bodyObject, propertyName)) {
      return null
    }

    this.outputErrorResponse()
    return Promise.reject(`Expected ${propertyName} in response body`)
  }

  @then(/the response should not have property (.+)/)
  public async thenResponseNotProperty(propertyName) {
      const body = this.responseSpace.body

      if (!(propertyName in body)) {
        return null
      }

      this.outputErrorResponse()
      return Promise.reject(`Expected ${propertyName} not to exist in response body`)
    }

  @then(/the response property (.+) should be falsy/)
  public async thenResponsePropertyFalsy(propertyName) {
      const body = this.responseSpace.body

      if (isNil(body[propertyName])) {
        return null
      }

      this.outputErrorResponse()
      return Promise.reject(`Expected ${propertyName} to be falsy in response body`)
    }

  @then(/the response should have property $propertyName of type `(.+)`/)
  public async thenPropertyResponseType(propertyName, propertyType) {
      const body = this.responseSpace.body

      const exists = (propertyName in body)
      const typeMatches = typeOf(body[propertyName]) === propertyType.toLowerCase()

      if (exists && typeMatches) {
        return null
      }

      this.outputErrorResponse()
      return Promise.reject(`Expected ${propertyName} of type ${propertyType} to exist in response body`)
    }

  @then(/the response should have a (.+) with value `(.+)`/)
  public async thenResponsePropertyWithValue(propertyName, propertyValue) {
      const bodyObject = this.responseSpace.body
      const nestedKeys = split('.', propertyName)
      const value = path(nestedKeys, bodyObject)

      if (String(value) === propertyValue) {
        return null
      }

      this.outputErrorResponse()
      return Promise.reject(`Expected ${propertyName} in response body to have value ${propertyValue},` +
          `but had ${bodyObject[propertyName]}`)
    }

  @then(/^the response should have a (\w+) with length `(\d+)`/)
  public async thenResponsePropertyLength(propertyName, propertyLength) {
      const bodyObject = this.responseSpace.body
    console.log(bodyObject)
      const value = get(bodyObject, propertyName) as any

      if (value.length === Number(propertyLength)) {
        return null
      }

      this.outputErrorResponse()
      return Promise.reject(`Expected ${propertyName} in response body to have value ${propertyLength},` +
          `but had ${bodyObject[propertyName]}`)
    }

  @then(/^the response should be an array of length (\d+)$/)
  public async thenResponseArrayLength(length) {
    const bodyObject = this.responseSpace.body
    const isArray = bodyObject instanceof Array

    if (isArray && bodyObject.length === Number(length)) {
      return null
    }

    this.outputErrorResponse()
    return Promise.reject(`Expected array of length ${length} in response body, got ${bodyObject.length}`)
  }

  @then(/^the response should have an? `(.*)` field that matches the regexp `(.*)`$/)
  public async thenResponseHasWithRegex(propertyName, regexp) {
      const bodyObject = this.responseSpace.body
      const value = get(bodyObject, propertyName) as any

      if (value.match(new RegExp(regexp, 'i'))) {
        return null
      }

      this.outputErrorResponse()
      return Promise.reject(`Expected ${propertyName} in response body to match ${regexp}`)
    }

  @then(/all items in (.+) array should have a `(.+)`/)
  public async thenResponseArrayItemsHaveProp(responsePropertyName, itemPropertyName) {
      const body = this.responseSpace.body
      const list = body[responsePropertyName]
      const properties = [itemPropertyName]

      if (propertiesExistInList(list, properties)) {
        return null
      }

      this.outputErrorResponse()
      return Promise.reject(`Expected all items in response body to have property ${itemPropertyName}`)
    }

  @then(/^all items in the response should have the following properties:$/)
  public async thenAllItemsInArrayHaveProperties(table) {
      const body = this.responseSpace.body
      const properties = flatten(table.raw())

      if (propertiesExistInList(body, properties)) {
        return null
      }

      this.outputErrorResponse()
      return Promise.reject(`Expected all items in response body to have properties ${properties}`)
    }

  @then(/^no items in the response should have the following properties:$/)
  public async thenNoItemsInArrayHaveProperties(table) {
      const body = this.responseSpace.body
      const properties = flatten(table.raw())

      if (propertiesDontExistInList(body, properties)) {
        return null
      }

      this.outputErrorResponse()
      return Promise.reject(`Expected none of the items in response body to have properties ${properties}`)
    }

  private outputErrorResponse() {
    const response = this.responseSpace.response
    const output = `
    Response Code: ${response.statusCode} ${response.statusMessage || ''}
    Headers: ${prettyjson.render(response.headers)}
    Body: ${prettyjson.render(response.body)}`

    log.error(output)
  }

}

export = ResponseSpace
