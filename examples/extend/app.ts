import axios from '../../src/index'

// function
axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

// function overload
axios('/extend/post', {
  method: 'post',
  data: {
    msg: 'hello'
  }
})

// object
axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})
axios.get('/extend/get')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.options('/extend/options')

axios.post('/extend/post', {
  msg: 'post'
})

axios.put('/extend/put', {
  msg: 'put'
})

axios.patch('/extend/patch', {
  msg: 'patch'
})

// test customize response data
interface ResponseData<T> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

async function getUser<T>() {
  try {
    const res = await axios<ResponseData<T>>('/extend/user')
    return res.data
  } catch (err) {
    console.log(err)
  }
}

async function test() {
  const data = await getUser<User>()
  if (data) {
    console.log(data.result.name, data.result.age)
  }
}

test()
