import axios from '../../src/index'

// array
axios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: ['bar', 'baz']
  }
})

// object
axios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// date
const date = new Date()
axios({
  url: '/base/get',
  method: 'get',
  params: {
    date
  }
})

// special string
axios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: '@:$, '
  }
})

// hash
axios({
  url: '/base/get#balabla',
  method: 'get',
  params: {
    foo: 'bar'
  }
})

// url existed params
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
