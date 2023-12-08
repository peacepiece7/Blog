import TagAddForm from '@/components/admin/TagAddForm'

export default async function AddPost() {
  return (
    <div className="max-w-7xl m-auto">
      <h1 className="mb-20 pl-8">Admin Add Tag</h1>
      <TagAddForm />
    </div>
  )
}

// * 어드민 페이지는 모두 정적으로 생성되지 않도록 한다.
export const dynamic = 'force-dynamic'
