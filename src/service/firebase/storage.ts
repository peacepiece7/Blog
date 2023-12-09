import 'server-only'
import { init } from './config'
import { getStorage, ref, deleteObject, uploadString, getBytes } from 'firebase/storage'
import { MAX_ARRAY_BUFFER_SIZE } from '@/constants'

export type ContentData = {
  storagePath: string
  content: string
}

const storage = getStorage(init)

export const getStorageContent = async (_ref: string) => {
  const storageRef = ref(storage, _ref)
  const arrayBuffer = await getBytes(storageRef, MAX_ARRAY_BUFFER_SIZE)
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
