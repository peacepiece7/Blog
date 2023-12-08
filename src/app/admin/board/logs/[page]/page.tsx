import { Log, Thumb } from '@/models'
import { PagenatedItems } from '@/components/PagenatedItems'
import { errorHandler, fetcher } from '@/utils/api'

interface PostsProps {
  params: { page: string }
}
export default async function Posts({ params }: PostsProps) {
  const [logError, logsRes] = await fetcher<ResponseBase<Log[]>>('api/logs', {
    cache: 'no-cache'
  })
  const [thumbError, thumbsRes] = await fetcher<ResponseBase<Thumb[]>>(`api/thumbs`, {
    cache: 'no-cache'
  })
  if (!logsRes || !thumbsRes) return errorHandler([logError, thumbError])

  const items = logsRes.data
    .map((log) => {
      const thumb = thumbsRes.data.find((thumb) => thumb.id === log.thumbnailId)
      return {
        id: log.id,
        title: log.title,
        svg: thumb?.source ?? undefined,
        tags: log.tags,
        createdAt: log.createdAt,
        url: `/admin/board/logs/edit/${log.id}`
      }
    })
    .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))

  return (
    <div className="pl-8 pr-8 max-w-7xl m-auto">
      <h1>Admin Logs</h1>
      <PagenatedItems items={items} page={parseInt(params.page) - 1} />
    </div>
  )
}

// * 어드민 페이지는 모두 정적으로 생성되지 않도록 한다.
export const dynamic = 'force-dynamic'
