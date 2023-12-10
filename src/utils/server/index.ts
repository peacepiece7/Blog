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
