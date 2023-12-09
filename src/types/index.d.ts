declare type ResponseState = 'success' | 'failure'
declare interface ErrorResponse {
  message: string
}
declare interface ResponseBase<T> {
  state: ResponseState
  data: T
  message?: string
}
