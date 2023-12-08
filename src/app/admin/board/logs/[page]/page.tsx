import { LogsResponse, ThumbnailsResponse } from '@/type'
import { getBaseUrl } from '@/utils'
import PagenatedItems from '@/components/PagenatedItems'

type Props = {
  params: { page: string }
}
export default async function Posts({ params }: Props) {
  const logs: LogsResponse = await fetch(`${getBaseUrl()}/api/logs`).then((res) => res.json())
  const thumbs: ThumbnailsResponse = await fetch(`${getBaseUrl()}/api/thumbs`).then((res) => res.json())
  const items = logs
    .map((log) => {
      const thumb = thumbs.find((thumb) => thumb.id === log.thumbnailId)
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
