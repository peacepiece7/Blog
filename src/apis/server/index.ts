import 'server-only'
import { getDocument, getDocuments } from '@/service/firebase/collection'
import { getStorageContent } from '@/service/firebase/storage'
import { fetcher } from '@/utils/server'

export const getLogsFetcher = async <T>(url: string, options?: RequestInit) => {
  if (process.env.NODE_BUILD === 'build') {
    return await getDocuments<T>('logs')
  }
  const { data } = await fetcher<T>(url, options)
  return data
}

export const getLogFetcher = async <T>(url: string, id: string, options?: RequestInit) => {
  if (process.env.NODE_BUILD === 'build') {
    return await getDocument<T>('log', id)
  }
  const { data } = await fetcher<T>(`${url}/${id}`, options)
  return data
}

export const getThumbsFetcher = async <T>(url: string, options?: RequestInit) => {
  if (process.env.NODE_BUILD === 'build') {
    return await getDocuments<T>('thumbnails')
  }
  const { data } = await fetcher<T>(url, options)
  return data
}

export const getTagsFetcher = async <T>(url: string, options?: RequestInit) => {
  if (process.env.NODE_BUILD === 'build') {
    return await getDocuments<T>('tags')
  }
  const { data } = await fetcher<T>(url, options)
  return data
}

export const getContentFetcher = async (url: string, storagePath: string, options?: RequestInit) => {
  if (process.env.NODE_BUILD === 'build') {
    return await getStorageContent(storagePath)
  }
  const { data }: { data: string } = await fetcher(`${url}?path=${storagePath}`, options)
  return data
}
