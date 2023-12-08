'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // * 관리자 인증 로직 (localstorage에 저장된 'weblogId', 'weblogPassword' 검사한다.)
  useEffect(() => {
    setIsLoading(true)
    const id = localStorage.getItem('weblogId')
    const password = localStorage.getItem('weblogPassword')
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAdmin) router.push('/')
        setIsAdmin(data.isAdmin)
      })
      .catch(() => router.push('/'))
      .finally(() => setIsLoading(false))
  }, [router, pathname])

  return { isAdmin, isLoading }
}
