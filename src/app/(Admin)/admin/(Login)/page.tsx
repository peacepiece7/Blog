import AdminLoginForm from '@/app/(Admin)/admin/(Login)/_components/LoginForm'

// * 어드민 페이지는 정적으로 생성하지 않습니다.
export const dynamic = 'force-dynamic'

export default function Login() {
  return (
    <div>
      <div className="max-w-7xl inset-0 m-auto pr-4 pl-4 mt-48">
        <h1 className="text-5xl">Log-in for admin</h1>
        <AdminLoginForm />
      </div>
    </div>
  )
}
