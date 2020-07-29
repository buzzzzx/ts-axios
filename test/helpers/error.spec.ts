import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/types'

describe('helpers::error', () => {
  test('should create an Error with message, config, code, request, response, isAxiosError', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }

    const error = createError('Boom!', config, 'SOMETHING', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toEqual('Boom!')
    expect(error.config).toEqual(config)
    expect(error.code).toEqual('SOMETHING')
    expect(error.request).toEqual(request)
    expect(error.response).toEqual(response)
  })
})
