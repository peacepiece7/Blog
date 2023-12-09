'use client'
import { ADMIN_ID_KEY, ADMIN_PASSWORD_KEY } from '@/constants'
import { useState } from 'react'

const isBrowser = typeof window !== 'undefined'

export function useAdmin() {
  const [id, setId] = useState(getCookie(ADMIN_ID_KEY))
  const [password, setPassword] = useState(getCookie(ADMIN_PASSWORD_KEY))

  const setPersistedAdmin = (id: string, password: string) => {
    setCookie(ADMIN_ID_KEY, id)
    setCookie(ADMIN_PASSWORD_KEY, password)
    setId(id)
    setPassword(password)
  }

  return {
    id,
    password,
    setPersistedAdmin
  }
}

/**
 * @description 쿠키를 설정하는 함수입니다.
 */
function setCookie(name: string, value: string) {
  if (!isBrowser) return

  const optionsWithDefaults: cookieOptions = {
    days: 0.041666, // 1 hour
    path: '/'
  }
  const expires = new Date(Date.now() + optionsWithDefaults.days * 864e5).toUTCString()
  document.cookie =
    name + '=' + encodeURIComponent(value) + '; expires=' + expires + stringifyOptions(optionsWithDefaults)
}

/**
 * @description 쿠키를 가져오는 함수입니다.
 */
function getCookie(name: string, initialValue = '') {
  return (
    (isBrowser &&
      document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
      }, '')) ||
    initialValue
  )
}

/**
 * @description  특정 옵션을 쿠키로 직렬화하는 함수입니다.
 */
function stringifyOptions(options: cookieOptions) {
  return Object.keys(options).reduce((acc, key) => {
    if (key === 'path') {
      return `${acc}; ${key}=${options[key]}`
    }
    return acc
  }, '')
}
interface cookieOptions {
  days: number
  path: string
  // domain?: string
  // SameSite?: 'None' | 'Lax' | 'Strict'
  // Secure?: boolean
  // HttpOnly?: boolean
}
