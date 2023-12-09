import { Log, Thumb } from '@/models'
import { PagenatedItems } from '@/components/PagenatedItems'
import { fetcher } from '@/utils/server'

// * 어드민 페이지는 정적으로 생성하지 않습니다.
export const dynamic = 'force-dynamic'
const option: RequestInit = { cache: 'no-cache' }
interface PostsProps {
  params: { page: string }
}
export default async function Posts({ params }: PostsProps) {
  const [{ data: logs }, { data: thumbs }] = await Promise.all([
    fetcher<Log[]>('api/logs', option),
    fetcher<Thumb[]>('api/thumbs', option)
  ])

  const items = getItemsAsc(logs, thumbs)

  return (
    <div className="pl-8 pr-8 max-w-7xl m-auto">
      <h1>Admin Logs</h1>
      <PagenatedItems items={items} page={parseInt(params.page) - 1} />
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
