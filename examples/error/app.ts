import axios, { AxiosError } from '../../src/index'

// wrong url: 404
axios({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

// randomly success(200) or get status error: 500
axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

// test for network error
// set chrome offline
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
}, 7000)

// timeout error
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.code)
    console.log(e.config)
    console.log(e.request)
    console.log(e.isAxiosError)
  })
