import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  let parts: string[] = []

  for (let key in params) {
    let val = params[key]

    // value is null or undefined
    if (val === null || typeof val === 'undefined') {
      break
    }

    let valueArr: string[]
    if (Array.isArray(val)) {
      key += '[]'
      valueArr = val
    } else {
      valueArr = [val]
    }

    valueArr.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  }

  let serializedParams = parts.join('&')

  if (serializedParams) {
    // remove hash mark
    let markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    // retain haven params
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
