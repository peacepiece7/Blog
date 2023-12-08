import 'server-only'
import { getDocument, getDocuments } from '@/service/firebase/collection'
import { getStorageContent } from '@/service/firebase/storage'

export interface ErrorResponse {
  message: string
}

/**
 * @description fetch API의 에러를 처리하는 함수입니다.
 * Client Component에서 사용해주세요.
 * Server Componenet에서 GET 요청 에러를 임의로 핸들링하면, 빌드 시점에서 에러가 발생할 가능성이 있습니다.
 */
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
    console.error(error)
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
export const fetcher = async (url: string, options?: RequestInit) => {
  let baseUrl = 'http://localhost:3000'
  if (process.env.NEXT_PUBLIC_VERCEL_URL) baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  console.log(`fetcher request : ${baseUrl}/${url}`)
  const res = await fetch(`${baseUrl}/${url}`, options).then((res) => res.json())
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

export const getLogsFetcher = async <T>(url: string, options?: RequestInit) => {
  if (process.env.NODE_BUILD === 'build') {
    return await getDocuments<T>('logs')
  }
  const { data }: { data: T } = await fetcher(url, options)
  return data
}

export const getLogFetcher = async <T>(url: string, id: string, options?: RequestInit) => {
  if (process.env.NODE_BUILD === 'build') {
    return await getDocument<T>('log', id)
  }
  const { data }: { data: T } = await fetcher(`${url}/${id}`, options)
  return data
}

export const getThumbsFetcher = async <T>(url: string, options?: RequestInit) => {
  if (process.env.NODE_BUILD === 'build') {
    return await getDocuments<T>('thumbnails')
  }
  const { data }: { data: T } = await fetcher(url, options)
  return data
}

export const getTagsFetcher = async <T>(url: string, options?: RequestInit) => {
  if (process.env.NODE_BUILD === 'build') {
    return await getDocuments<T>('tags')
  }
  const { data }: { data: T } = await fetcher(url, options)
  return data
}

export const getContentFetcher = async (url: string, storagePath: string, options?: RequestInit) => {
  if (process.env.NODE_BUILD === 'build') {
    return await getStorageContent(storagePath)
  }
  console.log(`${url}/${storagePath}`)
  // * storagePath = 'markdown/<UUID>' 형식으로 데이터가 와야합니다
  const { data }: { data: string } = await fetcher(`${url}?path=${storagePath}`, options)
  return data
}
