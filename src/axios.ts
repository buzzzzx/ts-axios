import { AxiosRequestConfig, AxiosPromise, AxiosResponse, AxiosIntance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosIntance {
  const context = new Axios()
  // bind the context
  const instance = Axios.prototype.request.bind(context)

  // instance will be a function and also an object which has
  // all methods in context
  extend(instance, context)
  return instance as AxiosIntance
}

const axios = createInstance()

export default axios
