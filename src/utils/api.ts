export interface ErrorResponse {
  message: string
}

export async function to<T>(promise: Promise<Response | T>): Promise<[ErrorResponse | null, T | null]> {
  try {
    const res = await promise
    if (res instanceof Response) {
      const data = await res.json()
      const result: [null, T] = [null, data]
      return result
    }
    const result: [null, T] = [null, res]
    return result
  } catch (error: unknown) {
    process.env.NODE_ENV === 'development' && console.error(error)
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      return [{ message: error.message }, null]
    }
    return [{ message: '알 수 없는 에러가 발생했습니다.' }, null]
  }
}

/**
 * @description fetch API wrapper입니다.
 * @param url 경로를 시작할 때 '/' 를 뺴고 입력해주세요.
 */
export const fetcher = <T>(url: string, options?: RequestInit) => {
  let baseUrl = 'http://127.0.0.1:3000'
  if (process.env.NODE_ENV === 'production') {
    if (process.env.VERCEL_URL) baseUrl = `https://${process.env.VERCEL_URL}`
  }

  return to<T>(fetch(`${baseUrl}/${url}`, options))
}

/**
 * @description error 배열중 제일 먼저 입력한 에러만 Throw하는 핸들러입니다. 에러가 발생하면 error.tsx로 에러 메세지를 전달합니다.
 */
export const errorHandler = (error?: (ErrorResponse | null)[] | ErrorResponse | null) => {
  if (Array.isArray(error)) {
    for (let err of error) {
      if (typeof err?.message === 'string') {
        console.error('ERROR HANDLER :', err)
        throw new Error(err.message)
      }
    }
  } else {
    console.error(error)
    if (typeof error?.message === 'string') {
      throw new Error(error.message)
    }
  }
  throw new Error('알 수 없는 에러가 발생했습니다.')
}
