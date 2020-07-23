import axios, { Canceler } from '../../src/'
import { isCancel } from '../../src/cancel/Cancel'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios
  .get('/cancel/get', {
    cancelToken: source.token
  })
  .catch(e => {
    if (axios.isCancel(e)) {
      console.log('Request canceled:', e.message)
    }
  })

setTimeout(() => {
  source.cancel('operation canceled by the user.')

  setTimeout(() => {
    axios
      .post(
        '/cancel/post',
        {
          a: 1
        },
        {
          cancelToken: source.token
        }
      )
      .catch(e => {
        if (isCancel(e)) {
          console.log('Request canceled:', 'token already be used')
        }
      })
  }, 100)
}, 100)

let cancel: Canceler
axios
  .get('/cancel/get', {
    cancelToken: new CancelToken(canceler => {
      cancel = canceler
    })
  })
  .catch(e => {
    if (axios.isCancel(e)) {
      console.log('Request canceled:', e.message)
    }
  })

setTimeout(() => {
  cancel('another way to cancel request')
}, 1500)
