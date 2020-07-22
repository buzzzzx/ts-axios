import axios, { AxiosTransformer } from '../../src/'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test: '321'
//   }
// })
//   .then(res => {
//     console.log(res.data)
//   })
//   .catch(error => {
//     console.log(error)
//   })

// axios({
//   transformRequest: [
//     function(data: any): any {
//       return qs.stringify(data)
//     },
//     ...(axios.defaults.transformRequest as AxiosTransformer[])
//   ],
//   transformResponse: [
//     ...(axios.defaults.transformResponse as AxiosTransformer[]),
//     function(data: any): any {
//       if (typeof data === 'object') {
//         data.b = 2
//       }

//       return data
//     }
//   ],

//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   }
// })
//   .then(res => {
//     console.log(res.data)
//   })
//   .catch(error => {
//     console.log(error)
//   })

const instance = axios.create({
  transformRequest: [
    function(data: any): any {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function(data: any): any {
      if (typeof data === 'object') {
        data.b = 2
      }

      return data
    }
  ]
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 2
  }
})
  .then(res => {
    console.log(res.data)
  })
  .catch(error => {
    console.log(error)
  })
