import { Tag, Thumb } from '@/models'
import { PagenatedItems } from '@/components/PagenatedItems'
import { errorHandler, fetcher } from '@/utils/api'

interface TagsProps {
  params: { page: string }
}
export default async function Tags({ params: { page } }: TagsProps) {
  const [tagsError, tagsRes] = await fetcher<ResponseBase<Tag[]>>('api/tags', {
    cache: 'no-cache'
  })
  const [thumbsError, thumbsRes] = await fetcher<ResponseBase<Thumb[]>>(`api/thumbs`, {
    cache: 'no-cache'
  })
  if (!tagsRes || !thumbsRes) return errorHandler([tagsError, thumbsError])

  const items = tagsRes.data
    .map((tag) => {
      const thumb = thumbsRes.data.find((thumb) => thumb.id === tag.thumbnailId)
      return {
        id: tag.id,
        title: tag.name,
        svg: thumb?.source,
        url: `/admin/board/tags/edit/${tag.id}`,
        createdAt: 'no date'
      }
    })
    .sort((a, b) => (a.title > b.title ? 1 : -1))

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="mb-20">Admin Tags</h1>
      <PagenatedItems items={items} page={parseInt(page) - 1} itemsPerPage={10} />
    </div>
  )
}

// * 어드민 페이지는 모두 정적으로 생성되지 않도록 한다.
export const dynamic = 'force-dynamic'
