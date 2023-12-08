import { Log, Tag } from '@/models'
import EditLogForm from '@/components/admin/LogEditForm'
import { errorHandler, fetcher } from '@/utils/api'

interface EditPostProps {
  params: {
    id: string
  }
}
export default async function EditPost({ params: { id } }: EditPostProps) {
  const [logError, logRes] = await fetcher<ResponseBase<Log>>(`api/log/${id}`, {
    cache: 'no-cache'
  })
  const [thumbError, tagsRes] = await fetcher<ResponseBase<Tag[]>>(`api/tags`, {
    cache: 'no-cache'
  })
  const [contentError, contentRes] = await fetcher<ResponseBase<string>>(
    `api/content?path=${logRes?.data.storagePath ?? ''}`,
    {
      cache: 'no-cache'
    }
  )

  if (!logRes || !tagsRes || !contentRes) return errorHandler([logError, thumbError, contentError])

  return (
    <div>
      <h1 className="mb-20">Admin Edit Post</h1>
      <EditLogForm tags={tagsRes.data} log={logRes.data} content={contentRes.data} />
    </div>
  )
}

// * 어드민 페이지는 모두 정적으로 생성되지 않도록 한다.
export const dynamic = 'force-dynamic'
