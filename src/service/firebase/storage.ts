import 'server-only'
import { cache } from 'react'
import { init } from './config'
import { getStorage, ref, deleteObject, uploadString, getBytes } from 'firebase/storage'

export type ContentData = {
  storagePath: string
  content: string
}

const storage = getStorage(init)

export const getStorageContent = async (_ref: string) => {
  console.info('getContentDataCache :', _ref)
  const storageRef = ref(storage, _ref)
  // * 글자가 짤린다면 maxDownloadSizeBytes를 확인해봅시다.
  const arrayBuffer = await getBytes(storageRef, 1200000)
  const textDecoder = new TextDecoder('utf-8')
  return textDecoder.decode(arrayBuffer)
}

export const updateStorageContent = async (storagePath: string, content: string) => {
  const mountainsRef = ref(storage, storagePath)
  return await uploadString(mountainsRef, content)
}

export const deleteStorageContent = async (storagePath: string) => {
  return await deleteObject(ref(storage, storagePath))
}
