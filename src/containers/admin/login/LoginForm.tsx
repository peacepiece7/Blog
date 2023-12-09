'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/hooks/useAdmin'

export default function LoginForm() {
  const router = useRouter()
  const { setPersistedAdmin } = useAdmin()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPersistedAdmin(name, password)
    // 접근 권한은 어드민 페이지 layout에서 확인합니다.
    router.push('/admin/board/logs/1')
  }

  return (
    <form className="flex flex-col max-w-2xl ml-12" onSubmit={onSubmit}>
      <input
        className="h-12 mt-24"
        type="text"
        placeholder="Enter a admin user name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="mt-4 h-12"
        type="password"
        placeholder="Enter a password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-auto"
        type="submit"
        value="submit"
      />
    </form>
  )
}
