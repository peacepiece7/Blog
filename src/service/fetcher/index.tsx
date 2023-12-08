import 'server-only'
import { getDocsCache } from '../Firebase_fn/collection'
import { getContentDataCache } from '../Firebase_fn/storage'

type CollectionName = 'logs' | 'tags' | 'thumbnails'
type Collections = CollectionName[]

export const getFetcher = async (...collections: Collections) => {
  // 개발 모드에서는 데이터 caching
  if (process.env.NODE_ENV === 'development') {
    const apis = collections.map((collection) => fetch(`http://localhost:3000/api/get/${collection}`))
    return Promise.all(apis.map((api) => api.then((res) => res.json())))
  }

  // 배포 모드에서는 데이터 caching을 하지 않음 (왜냐하면 SSG로 동작하기 때문에)
  const apis = collections.map((collection) => getDocsCache(collection))
  return Promise.all(apis)
}
export const getContentFetcher = async (productId: string) => {
  if (process.env.NODE_ENV === 'development') {
    const response = await fetch(`http://localhost:3000/api/get/content?productId=${productId}`)
    return response.json()
  }

  return getContentDataCache(productId)
}
