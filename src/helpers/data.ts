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
