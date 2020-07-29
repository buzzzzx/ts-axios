import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/util'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()

    // Initial a HTTP request, async
    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    // Send a HTTP request
    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      // 若没有设置 timeout，则默认为 0，即永不会超时
      if (timeout) {
        request.timeout = timeout
      }
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
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
        reject(createError('Network Error', config, undefined, request))
      }

      request.ontimeout = function handleTimeout() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
      }

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders() {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // add xsrf token to headers
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      // Set up the request headers
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel() {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    // 处理状态码错误（非 200 状态码）
    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
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
