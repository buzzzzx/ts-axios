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

// post data and handle response
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

// post data and handle response(json type)
axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

// post data with headers
axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;charset=UTF-8'
  },
  data: {
    a: 1,
    b: 2
  }
})

// post data with special data type
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})

// Int32Array
const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})
