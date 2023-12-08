import { TagsResponse, ThumbnailsResponse } from '@/type'
import { getBaseUrl } from '@/utils'
import PagenatedItems from '@/components/PagenatedItems'

type Props = {
  params: { page: string }
}
export default async function Tags({ params: { page } }: Props) {
  const tags: TagsResponse = await fetch(`${getBaseUrl()}/api/tags`).then((res) => res.json())
  const thumbs: ThumbnailsResponse = await fetch(`${getBaseUrl()}/api/thumbs`).then((res) => res.json())

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
