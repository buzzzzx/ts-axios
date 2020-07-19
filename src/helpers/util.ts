const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

/**
 * check the value is whether a plain(normal) object,
 * which is [object Object].
 * E.g. if value is an ArrayBuffer object, output will
 * be [object ArrayBuffer].
 * @param val
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
