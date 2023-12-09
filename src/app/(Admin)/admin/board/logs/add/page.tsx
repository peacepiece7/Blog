import { Tag } from '@/models'
import LogAddForm from '@/components/admin/LogAddForm'
import { fetcher } from '@/utils/api'

// * 어드민 페이지는 정적으로 생성하지 않습니다.
export const dynamic = 'force-dynamic'

export default async function AddPost() {
  const { data: tags }: ResponseBase<Tag[]> = await fetcher('api/tags', {
    cache: 'no-cache'
  })

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="mb-20 pl-8">Admin Add Log</h1>
      <LogAddForm tags={tags} />
    </div>
  )
}
