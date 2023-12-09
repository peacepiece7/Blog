import { PagenationItem } from '@/components/Pagenation/Items'
import { Pagenation } from '@/components/Pagenation/Pagenation'
import { Log, Thumb } from '@/models'

interface PostsProps {
  logs: Log[]
  thumbs: Thumb[]
  params: { page: string }
}

export default function AdminBoardLogsContainer({ logs, thumbs, params }: PostsProps) {
  const items = getItemsAsc(logs, thumbs)
  return (
    <div className="pl-8 pr-8 max-w-7xl m-auto">
      <h1>Admin Logs</h1>
      <Pagenation items={items} page={parseInt(params.page) - 1} />
    </div>
  )
}

function getItemsAsc(logs: Log[], thumbs: Thumb[]) {
  return logs
    .map((log) => {
      const { id, title, tags, createdAt, thumbnailId } = log
      const thumb = thumbs.find((t) => t.id === thumbnailId)
      return {
        id,
        title,
        svg: thumb?.source,
        tags,
        createdAt,
        url: `/admin/board/logs/edit/${id}`
      }
    })
    .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
}
