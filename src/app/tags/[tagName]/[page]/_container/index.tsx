import { Pagenation } from '@/components/Pagenation/Pagenation'
import { Log, Thumb } from '@/models'

interface TagsPageProps {
  logs: Log[]
  thumbs: Thumb[]
  params: {
    tagName: string
    page: string
  }
}
export function TagsPageContainer({ logs, thumbs, params }: TagsPageProps) {
  const { tagName, page } = params

  const items = getItemsByTag(logs, thumbs, tagName)

  return (
    <div className="max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12 mt-24">
      <h1 className="mb-4">{`${tagName} Logs`}</h1>
      <Pagenation items={items} page={parseInt(page) - 1} />
    </div>
  )
}

function getItemsByTag(logs: Log[], thumbs: Thumb[], tagName: string) {
  return logs
    .filter((log) => log.tags.includes(tagName))
    .map((log) => {
      const thumb = thumbs.find((thumb) => thumb.id === log.thumbnailId)
      return {
        id: log.id,
        title: log.title,
        svg: thumb?.source ?? undefined,
        tags: log.tags,
        createdAt: log.createdAt,
        url: `/log/${log.id}`
      }
    })
    .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
}
