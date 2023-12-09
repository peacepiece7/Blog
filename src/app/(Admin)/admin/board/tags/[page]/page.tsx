import { Tag, Thumb } from '@/models'
import { PagenatedItems } from '@/components/PagenatedItems'
import { fetcher } from '@/utils/server'

// * 어드민 페이지는 정적으로 생성하지 않습니다.
export const dynamic = 'force-dynamic'
const option: RequestInit = { cache: 'no-cache' }
interface TagsProps {
  params: { page: string }
}
export default async function Tags({ params: { page } }: TagsProps) {
  const [{ data: tags }, { data: thumbs }] = await Promise.all([
    fetcher<Tag[]>('api/tags', option),
    fetcher<Thumb[]>('api/thumbs', option)
  ])

  const items = getItemsAsc(tags, thumbs)

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="mb-20">Admin Tags</h1>
      <PagenatedItems items={items} page={parseInt(page) - 1} itemsPerPage={10} />
    </div>
  )
}

const getItemsAsc = (tags: Tag[], thumbs: Thumb[]) => {
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
