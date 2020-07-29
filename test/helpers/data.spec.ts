import { transformRequest, transformResponse } from '../../src/helpers/data'

describe('helpers::data', () => {
  describe('transformRequest', () => {
    test('should transform data to string if data is a PlainObject', () => {
      const data = { a: 1, b: 2 }
      const expected = '{"a":1,"b":2}'
      expect(transformRequest(data)).toEqual(expected)
    })

    test('should do nothing if data is not a PlainObject', () => {
      const data = new URLSearchParams('a=b')
      expect(transformRequest(data)).toEqual(data)
    })
  })

  describe('transformResponse', () => {
    test('should transform data to Object if data is a JSON string', () => {
      const a = '{"a": 1}'
      expect(transformResponse(a)).toEqual({ a: 1 })
    })

    test('should do nothing if data is a string not a JSON string', () => {
      const a = '{a: 1}'
      expect(transformResponse(a)).toEqual(a)
    })

    test('should do nothing if data is not a string', () => {
      const a = { a: 2 }
      const b = null
      const c = undefined
      expect(transformResponse(a)).toBe(a)
      expect(transformResponse(b)).toBeUndefined()
      expect(transformResponse(c)).toBeUndefined()
    })
  })
})
