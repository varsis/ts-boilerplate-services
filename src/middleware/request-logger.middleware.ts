import * as log from 'menna'
import { isEmpty } from 'lodash'

function skipLoggingThisRequest(req) {
  return req.path.indexOf('/swagger') !== -1 || req.path.indexOf('/docs') !== -1
}

export default (req, res, next) => {
  if (skipLoggingThisRequest(req)) return next()

  const body = !isEmpty(req.body) ? JSON.stringify(req.body) : ''
  log.info(`${req.sessionID || ''} ${req.ip} ${req.method} ${req.originalUrl} ${body}`)

  return next()
}
