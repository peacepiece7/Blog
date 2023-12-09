import { Pagenation } from '@/components/Pagenation/Pagenation'
import { Tag, Thumb } from '@/models'

interface TagsPageContainerProps {
  tags: Tag[]
  thumbs: Thumb[]
  params: {
    page: string
  }
}
export function AdminTagsPageContainer({ tags, thumbs, params: { page } }: TagsPageContainerProps) {
  const items = getItems(tags, thumbs)

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="mb-20">Admin Tags</h1>
      <Pagenation items={items} page={parseInt(page) - 1} itemsPerPage={10} />
    </div>
  )
}

function getItems(tags: Tag[], thumbs: Thumb[]) {
  return tags
    .map((tag) => {
      const { id, name, thumbnailId } = tag
      const thumb = thumbs.find((t) => t.id === thumbnailId)
      return {
        id,
        title: name,
        svg: thumb?.source,
        url: `/admin/board/tags/edit/${id}`
      }
    })
    .sort((a, b) => (a.title > b.title ? 1 : -1))
}
