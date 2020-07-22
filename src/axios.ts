import { AxiosRequestConfig, AxiosStatic, AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(initConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(initConfig)
  // bind the context
  const instance = Axios.prototype.request.bind(context)

  // instance will be a function and also an object which has
  // all methods in context
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

// function compatibility
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
