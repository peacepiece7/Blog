import AdminLoginForm from './LoginForm'

export default function LoginContainer() {
  return (
    <div>
      <div className="max-w-7xl inset-0 m-auto pr-4 pl-4 mt-48">
        <h1 className="text-5xl">Log-in for admin</h1>
        <AdminLoginForm />
      </div>
    </div>
  )
}
