import { flatten, prop, compose, map, all, none } from 'ramda'

const exists = k => compose(Boolean, prop(k))

export const propertiesExistInList = (body, properties) => {
  const existsInBody = a => map(exists(a), body)
  const allExist = compose(all(Boolean), flatten, map(existsInBody))

  return allExist(properties)
}

export const propertiesDontExistInList = (body, properties) => {
  const existsInBody = a => map(exists(a), body)
  const noneExists = compose(none(Boolean), flatten, map(existsInBody))

  return noneExists(properties)
}

export const typeOf = (o) => {
  if (o instanceof Array) {
    return 'array'
  }

  if (o === null) {
    return 'null'
  }

  return typeof o
}
