import PagenatedItems from '@/components/PagenatedItems'
import Profile from '@/components/Profile'
import { LogsResponse, ThumbnailsResponse } from '@/type'
import { getBaseUrl } from '@/utils'

export default async function Home() {
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
        url: `/log/${log.id}`
      }
    })
    .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12">
        <Profile />
        <section className="pt-32 pb-32">
          <h1 className="text-3xl">Latest Logs</h1>
          <PagenatedItems items={items} page={0} baseUrl="/logs" />
        </section>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'
