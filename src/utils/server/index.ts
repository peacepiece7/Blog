import 'server-only'

/**
 * @description fetch API wrapper입니다.
 * @param url 경로를 시작할 때 '/' 를 뺴고 입력해주세요.
 */
export const fetcher = async <T>(url: string, options?: RequestInit) => {
  let baseUrl = 'http://localhost:3000'
  if (process.env.NEXT_PUBLIC_VERCEL_URL) baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  console.log(`fetcher request : ${baseUrl}/${url}`)
  const res: ResponseBase<T> = await fetch(`${baseUrl}/${url}`, options).then((res) => res.json())
  return res
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
