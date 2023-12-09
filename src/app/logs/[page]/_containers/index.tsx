import { Pagenation } from '@/components/Pagenation/Pagenation'
import { Log, Thumb } from '@/models'

interface LogPageContainerProps {
  logs: Log[]
  thumbs: Thumb[]
  page: string
}
export function LogPageContainer({ logs, thumbs, page }: LogPageContainerProps) {
  const items = getPageItems(logs, thumbs)

  return (
    <div className="max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12 mt-24">
      <h1 className="mb-4">Logs</h1>
      <Pagenation items={items} page={parseInt(page) - 1} pageRangeDisplayed={10} />
    </div>
  )
}

function getPageItems(logs: Log[], thumbs: Thumb[]) {
  return logs
    .filter((log) => log.tags.find((tag) => tag === 'Log'))
    .map((log) => {
      const thumb = thumbs.find((thumb) => thumb.id === log.thumbnailId)
      return {
        id: log.id,
        title: log.title,
        svg: thumb?.source ?? undefined,
        tags: log.tags.filter((tag) => tag !== 'Log'),
        createdAt: log.createdAt,
        url: `/log/${log.id}`
      }
    })
    .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
}
