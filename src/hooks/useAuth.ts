'use client'
import { useEffect, useState } from 'react'
import { useAdmin } from './useAdmin'
import { to } from '@/utils'

export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { id, password, setPersistedAdmin } = useAdmin()

  useEffect(() => {
    if (isAdmin) return
    to<LoginResponse>(fetch('/api/login', { method: 'POST', body: JSON.stringify({ id, password }) })) //
      .then(([response, _error]) => {
        if (response?.data.isAdmin) setIsAdmin(true)
        setIsLoading(false)
      })
  }, [])

  return {
    isAdmin,
    isLoading,
    setPersistedAdmin
  }
}

interface LoginResponse {
  message: string
  isAdmin: boolean
}
