import { Tag } from '@/models'
import LogAddForm from '@/components/admin/LogAddForm'
import { errorHandler, fetcher } from '@/utils/api'

export default async function AddPost() {
  const [error, res] = await fetcher<ResponseBase<Tag[]>>('api/tags', {
    cache: 'no-cache'
  })
  if (!res) return errorHandler(error)

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="mb-20 pl-8">Admin Add Log</h1>
      <LogAddForm tags={res.data} />
    </div>
  )
}

// * 어드민 페이지는 모두 정적으로 생성되지 않도록 한다.
export const dynamic = 'force-dynamic'
