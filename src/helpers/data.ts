import { isPlainObject } from './util'

/**
 * @source: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
 * @param data
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

export function transformResponse(data: any): any {
  if (!data) {
    return
  }

  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }

  return data
}
