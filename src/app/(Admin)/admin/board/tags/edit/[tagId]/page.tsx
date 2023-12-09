import { Log, Tag, Thumb } from '@/models'
import TagEditForm from '@/components/admin/TagEditForm'
import { fetcher } from '@/utils/api'

// * 어드민 페이지는 정적으로 생성하지 않습니다.
export const dynamic = 'force-dynamic'

interface EditTagProps {
  params: {
    tagId: string
  }
}
export default async function EditTag({ params }: EditTagProps) {
  const { data: logs }: ResponseBase<Log[]> = await fetcher(`api/logs`, {
    cache: 'no-cache'
  })
  const { data: tag }: ResponseBase<Tag> = await fetcher(`api/tag/${params.tagId}`, {
    cache: 'no-cache'
  })
  const { data: thumb }: ResponseBase<Thumb> = await fetcher(`api/thumb?id=${tag.thumbnailId ?? ''}`, {
    cache: 'no-cache'
  })
  return (
    <div className="max-w-7xl m-auto">
      <h1>Admin Edit Tag</h1>
      <TagEditForm logs={logs} tag={tag} thumb={thumb} />
    </div>
  )
}
