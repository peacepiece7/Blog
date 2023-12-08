'use client'
import { redirect } from 'next/navigation'
import AdminHeader from '@/components/admin/AdminHeader'
import { useAdmin } from '@/hooks/admin'
import LoadingWithSmile from '@/components/LoadingWithSmile'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAdmin()

  if (isLoading) return <LoadingWithSmile />
  if (!isAdmin) return redirect('/')

  return (
    <div>
      <AdminHeader />
      <div>{children}</div>
    </div>
  )
}
