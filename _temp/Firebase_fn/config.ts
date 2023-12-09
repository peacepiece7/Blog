import 'server-only'

import { initializeApp } from 'firebase/app'
import dotenv from 'dotenv'

dotenv.config()

const fetchFirebaseConfig = () => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  }

  if (process.env.NODE_BUILD === 'build') {
    console.log('NODE_BUILD 출력 확인')
  } else {
    console.log('NODE_BUILD가 출력되지 않습니다.')
  }

  console.log('is single ton instance?')
  return firebaseConfig
}

let i = 0
export const init = initializeApp(fetchFirebaseConfig())
// export const store = getFirestore(init)
// export const analytics = getAnalytics(init)

// * 필요해지면 기능 구현합시당
// export const githubProvider = new firebase.auth.GithubAuthProvider()
// export const firebaseAuth = firebase.auth()
