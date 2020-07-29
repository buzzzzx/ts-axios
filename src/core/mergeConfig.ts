import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

// merge strats
const strats = Object.create(null)

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    // val2 is not PlainObject but other type except empty
    return val2
  } else if (isPlainObject(val1)) {
    // val2 is empty and val1 is PlainObject
    return deepMerge(val1)
  } else {
    // val2 is empty and val1 is not PlainObject
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'data', 'params']
const stratKeysDeepMerge = ['headers', 'auth']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  const config = Object.create(null)

  if (!config2) {
    config2 = {}
  }

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: any): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
