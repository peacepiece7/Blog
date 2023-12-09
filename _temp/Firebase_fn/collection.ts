import 'server-only'
// 랜더링 사이클 내에서만 캐싱
import { init } from './config'

import { addDoc, doc, setDoc, getDoc, collection, getDocs, getFirestore, deleteDoc } from 'firebase/firestore'

const db = getFirestore(init)

export const getDocsCache = async (_collection: string) => {
  console.log('getDocsCache가 호출됨')
  const snapshot = await getDocs(collection(db, _collection))
  const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return docs
}

export const getDocCache = async <T>(_collection: string, id: string) => {
  const ref = doc(db, _collection, id)
  const docSnap = await getDoc(ref)
  return { id: docSnap.id, ...docSnap.data() } as T
}

export const addDocCache = async <T extends object>(_collection: string, fields: T) => {
  const docRef = await addDoc(collection(db, _collection), fields)
  return docRef
}

export const setDocCache = async <T extends object>(_collection: string, id: string, data: T) => {
  await setDoc(doc(db, _collection, id), data)
}

export const deleteDocCache = async (_collection: string, id: string) => {
  if (!_collection || !id) throw new Error('컬렉션과 아이디가 입력되지 않았습니다.')
  await deleteDoc(doc(db, _collection, id))
}
