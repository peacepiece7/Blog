import { Log, Tag, Thumb } from '@/models'
import TagEditForm from '@/components/admin/TagEditForm'
import { errorHandler, fetcher } from '@/utils/api'

interface EditTagProps {
  params: {
    tagId: string
  }
}
export default async function EditTag({ params }: EditTagProps) {
  const [logsError, logsRes] = await fetcher<ResponseBase<Log[]>>(`api/logs`, {
    cache: 'no-cache'
  })
  const [tagError, tagRes] = await fetcher<ResponseBase<Tag>>(`api/tag/${params.tagId}`, {
    cache: 'no-cache'
  })
  const [thumbError, thumbRes] = await fetcher<ResponseBase<Thumb>>(`api/thumb?id=${tagRes?.data.thumbnailId ?? ''}`, {
    cache: 'no-cache'
  })
  if (!logsRes || !thumbRes || !tagRes) return errorHandler([logsError, tagError, thumbError])
  return (
    <div className="max-w-7xl m-auto">
      <h1>Admin Edit Tag</h1>
      <TagEditForm logs={logsRes.data} tag={tagRes.data} thumb={thumbRes.data} />
    </div>
  )
}

// * 어드민 페이지는 모두 정적으로 생성되지 않도록 한다.
export const dynamic = 'force-dynamic'
