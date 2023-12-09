import { Log, Tag, Thumb } from '@/models'
import TagEditForm from '@/components/admin/TagEditForm'
import { fetcher } from '@/utils/server'

// * 어드민 페이지는 정적으로 생성하지 않습니다.
export const dynamic = 'force-dynamic'

const option: RequestInit = { cache: 'no-cache' }
interface EditTagProps {
  params: {
    tagId: string
  }
}
export default async function EditTag({ params }: EditTagProps) {
  const [{ data: logs }, { data: tag }] = await Promise.all([
    fetcher<Log[]>('api/logs', option),
    fetcher<Tag>(`api/tag/${params.tagId}`, option)
  ])
  const { data: thumb } = await fetcher<Thumb>(`api/thumb?id=${tag.thumbnailId}`, option)

  return (
    <div className="max-w-7xl m-auto">
      <h1>Admin Edit Tag</h1>
      <TagEditForm logs={logs} tag={tag} thumb={thumb} />
    </div>
  )
}
