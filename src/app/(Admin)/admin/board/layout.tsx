'use client'
import { redirect } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import LoadingWithSmile from '@/components/LoadingWithSmile'
import { useAuth } from '@/hooks/useAuth'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth()

  if (isLoading) return <LoadingWithSmile />
  if (!isAdmin) return redirect('/admin')

  return (
    <div>
      <AdminHeader />
      <div>{children}</div>
    </div>
  )
}
