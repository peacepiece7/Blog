import { Tag, Thumb } from '@/models'
import { PagenatedItems } from '@/components/PagenatedItems'
import { fetcher } from '@/utils/server'

// * 어드민 페이지는 정적으로 생성하지 않습니다.
export const dynamic = 'force-dynamic'
interface TagsProps {
  params: { page: string }
}
export default async function Tags({ params: { page } }: TagsProps) {
  const { data: tags }: ResponseBase<Tag[]> = await fetcher('api/tags', {
    cache: 'no-cache'
  })
  const { data: thumbs }: ResponseBase<Thumb[]> = await fetcher(`api/thumbs`, {
    cache: 'no-cache'
  })

  const items = tags
    .map((tag) => {
      const thumb = thumbs.find((thumb) => thumb.id === tag.thumbnailId)
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
