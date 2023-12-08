import { LogsResponse, TagResponse, ThumbnailResponse } from '@/type'
import TagEditForm from '@/components/admin/TagEditForm'
import { getBaseUrl } from '@/utils'

type Props = {
  params: {
    tagId: string
  }
}
export default async function EditTag({ params }: Props) {
  const logs: LogsResponse = await fetch(`${getBaseUrl()}/api/logs`).then((res) => res.json())
  const tag: TagResponse = await fetch(`${getBaseUrl()}/api/tag/${params.tagId}`).then((res) => res.json())
  const thumb: ThumbnailResponse = await fetch(`${getBaseUrl()}/api/thumb/${tag.thumbnailId}`).then((res) => res.json())

  return (
    <div className="max-w-7xl m-auto">
      <h1>Admin Edit Tag</h1>
      <TagEditForm logs={logs} tag={tag} thumb={thumb} />
    </div>
  )
}
