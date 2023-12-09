// 서버에서만 발생하도록 보장할 수 있습니다 .
import 'server-only'
import { cache } from 'react'
import { getDocument, getDocuments } from '../../src/service/firebase/collection'
import { Log, Tag, Thumb } from '@/models'
import { getStorageContent } from '../../src/service/firebase/storage'

export const getLogsCache = cache(async () => await getDocuments<Log[]>('logs'))
export const getLogCache = cache(async (id: string) => await getDocument<Log>('logs', id))
export const getThumbsCache = cache(async () => await getDocuments<Thumb[]>('thumbnails'))
export const getTagsCache = cache(async () => await getDocuments<Tag[]>('tags'))
export const getContentCache = cache(async (id: string) => await getStorageContent(id))
