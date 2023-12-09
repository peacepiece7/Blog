import { Pagenation } from '@/components/Pagenation/Pagenation'
import { Log, Thumb } from '@/models'

interface LogPageContainerProps {
  logs: Log[]
  thumbs: Thumb[]
  params: {
    page: string
  }
}
export function WikiPageContainer({ logs, thumbs, params }: LogPageContainerProps) {
  const { page } = params
  const items = getItemsByTag(logs, thumbs, 'Log')

  return (
    <div className="max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12 mt-24">
      <h1 className="mb-4">wiki</h1>
      <Pagenation items={items} page={parseInt(page) - 1} pageRangeDisplayed={10} />
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
