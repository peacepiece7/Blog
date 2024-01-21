import { WikiLink } from '@/components/Link/WikiLink'
import { Pagenation } from '@/components/Pagenation/Pagenation'
import { Profile } from '@/components/Profile/Profile'
import { Log, Thumb } from '@/models'
import Link from 'next/link'

interface HomeContainerProps {
  logs: Log[]
  thumbs: Thumb[]
}
export function HomeContainer({ logs, thumbs }: HomeContainerProps) {
  const items = getLogItems(logs, thumbs)
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12">
        <Profile />
        <section className="pt-32 pb-32">
          <h1 className="text-3xl">Latest Logs</h1>
          <Pagenation items={items} page={0} baseUrl="/logs" pageRangeDisplayed={10} />
        </section>
        <div />
        <WikiLink />
      </div>
    </div>
  )
}

function getLogItems(logs: Log[], thumbs: Thumb[]) {
  return logs
    .filter((log) => log.tags.find((tag) => tag === 'Log'))
    .map((log) => {
      const thumb = thumbs.find((thumb) => thumb.id === log.thumbnailId)
      const tags = log.tags.filter((tag) => tag !== 'Log')
      return {
        id: log.id,
        title: log.title,
        svg: thumb?.source ?? undefined,
        tags: tags,
        createdAt: log.createdAt,
        url: `/log/${log.id}`
      }
    })
    .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
}
