export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'head'
  | 'HEAD'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
