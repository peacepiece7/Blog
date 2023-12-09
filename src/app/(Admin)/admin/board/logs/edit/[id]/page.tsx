import { Log, Tag } from '@/models'
import EditLogForm from '@/components/admin/LogEditForm'
import { fetcher } from '@/utils/server'

// * 어드민 페이지는 정적으로 생성하지 않습니다.
export const dynamic = 'force-dynamic'
const option: RequestInit = { cache: 'no-cache' }
interface EditPostProps {
  params: {
    id: string
  }
}
export default async function EditPost({ params: { id } }: EditPostProps) {
  const [{ data: log }, { data: tags }] = await Promise.all([
    fetcher<Log>(`api/log/${id}`, option),
    fetcher<Tag[]>('api/tags', option)
  ])
  const { data: content }: ResponseBase<string> = await fetcher(`api/content?path=${log.storagePath}`, option)

  return (
    <div>
      <h1 className="mb-20">Admin Edit Post</h1>
      <EditLogForm tags={tags} log={log} content={content} />
    </div>
  )
}
