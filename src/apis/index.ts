import 'server-only'
import { getDocument, getDocuments } from '@/service/firebase/collection'
import { getStorageContent } from '@/service/firebase/storage'
import { fetcher } from '@/utils/api'

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
