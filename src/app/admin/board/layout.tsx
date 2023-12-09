'use client'
import { redirect } from 'next/navigation'
import { AdminHeader } from '@/components/Header/AdminHeader'
import { SmileLoading } from '@/components/Loading/SmileLoading'
import { useAuth } from '@/hooks/useAuth'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth()

  if (isLoading) return <SmileLoading />
  if (!isAdmin) return redirect('/admin')

  return (
    <div>
      <AdminHeader />
      <div>{children}</div>
    </div>
  )
}
