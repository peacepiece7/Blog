import 'server-only'
// 랜더링 사이클 내에서만 캐싱
import { init } from './config'

import { addDoc, doc, setDoc, getDoc, collection, getDocs, getFirestore, deleteDoc } from 'firebase/firestore'

const db = getFirestore(init)

export const getDocuments = async <T>(_collection: string) => {
  console.log('getDocuments :', _collection)
  const snapshot = await getDocs(collection(db, _collection))
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T
}

export const getDocument = async <T>(_collection: string, id: string) => {
  console.log('getDocument :', _collection)
  const ref = doc(db, _collection, id)
  const docSnap = await getDoc(ref)
  return { id: docSnap.id, ...docSnap.data() } as T
}

export const addDocument = async <T extends object>(_collection: string, fields: T) => {
  return await addDoc(collection(db, _collection), fields)
}

export const setDocument = async <T extends object>(_collection: string, id: string, data: T) => {
  return await setDoc(doc(db, _collection, id), data)
}

export const deleteDocument = async (_collection: string, id: string) => {
  return await deleteDoc(doc(db, _collection, id))
}
