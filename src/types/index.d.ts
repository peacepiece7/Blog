declare type ResponseState = 'success' | 'failure'
declare interface ResponseBase<T> {
  state: ResponseState
  data: T
  message: string
}
