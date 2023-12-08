import 'server-only'
import { getDocsCache } from '../Firebase_fn/collection'
import { getContentDataCache } from '../Firebase_fn/storage'

type CollectionName = 'logs' | 'tags' | 'thumbnails'
type Collections = CollectionName[]

export const getFetcher = async (...collections: Collections) => {
  if (process.env.NODE_ENV === 'development') {
    const apis = collections.map((collection) => fetch(`http://127.0.0.1:3000/api/get/${collection}`))
    return Promise.all(apis.map((api) => api.then((res) => res.json())))
  }

  const apis = collections.map((collection) => getDocsCache(collection))
  return Promise.all(apis)
}
export const getContentFetcher = async (productId: string) => {
  if (process.env.NODE_ENV === 'development') {
    const response = await fetch(`http://127.0.0.1:3000/api/get/content?productId=${productId}`)
    return response.json()
  }
  return getContentDataCache(productId)
}
