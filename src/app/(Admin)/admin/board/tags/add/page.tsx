import TagAddForm from '@/components/admin/TagAddForm'

// * 어드민 페이지는 정적으로 생성하지 않습니다.
export const dynamic = 'force-dynamic'

export default async function AddPost() {
  return (
    <div className="max-w-7xl m-auto">
      <h1 className="mb-20 pl-8">Admin Add Tag</h1>
      <TagAddForm />
    </div>
  )
}
