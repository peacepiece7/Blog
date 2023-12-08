import { Log, Tag } from '@/models'
import EditLogForm from '@/components/admin/LogEditForm'
import { fetcher } from '@/utils/api'

// * 어드민 페이지는 정적으로 생성하지 않습니다.
export const dynamic = 'force-dynamic'
interface EditPostProps {
  params: {
    id: string
  }
}
export default async function EditPost({ params: { id } }: EditPostProps) {
  const { data: log }: ResponseBase<Log> = await fetcher(`api/log/${id}`, {
    cache: 'no-cache'
  })
  const { data: tags }: ResponseBase<Tag[]> = await fetcher(`api/tags`, {
    cache: 'no-cache'
  })
  const { data: content }: ResponseBase<string> = await fetcher(`api/content?path=${log.storagePath ?? ''}`, {
    cache: 'no-cache'
  })

  return (
    <div>
      <h1 className="mb-20">Admin Edit Post</h1>
      <EditLogForm tags={tags} log={log} content={content} />
    </div>
  )
}