import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // Initial a HTTP request, async
    request.open(method.toUpperCase(), url, true)

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

      resolve(response)
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
  })
}
