import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // 若没有设置 timeout，则默认为 0，即永不会超时
    if (timeout) {
      request.timeout = timeout
    }

    // Initial a HTTP request, async
    request.open(method.toUpperCase(), url!, true)

    /**
     * @source: https://www.w3school.com.cn/ajax/ajax_xmlhttprequest_onreadystatechange.asp
     * Everytime callback will be called when request.readyState changes:
     *    0: 请求未初始化
     *    1: 服务器连接已建立
     *    2: 请求已接收
     *    3: 请求处理中
     *    4: 请求已完成，且响应已就绪
     * When readyState is 4, set up the response
     */
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      // 发生超时错误和网络错误时，status = 0
      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType === 'text' ? request.responseText : request.response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network error', config, undefined, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    // Set up the request headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // Send a HTTP request
    request.send(data)

    // 处理状态码错误（非 200 状态码）
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            undefined,
            request,
            response
          )
        )
      }
    }
  })
}
