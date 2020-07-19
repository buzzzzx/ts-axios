import { isPlainObject } from './util'

function normalizeHeaderName(headers: any, key: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== key && name.toLowerCase() === key.toLowerCase()) {
      headers[key] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    if (!key) {
      // next iteration
      return
    }
    key = key.trim().toLowerCase()
    if (value) {
      value = value.trim()
    }

    parsed[key] = value
  })

  return parsed
}
