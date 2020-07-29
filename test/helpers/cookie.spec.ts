import cookie from '../../src/helpers/cookie'

describe('helpers::cookie', () => {
  test('should read cookies', () => {
    document.cookie = 'foo=bar'
    expect(cookie.read('foo')).toEqual('bar')
  })

  test('should return null if cookie name is not existed', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('bar')).toBeNull()
  })
})
