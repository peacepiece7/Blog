import { PagenatedItems } from '@/components/PagenatedItems'
import { Profile } from '@/components/Profile'
import { API_REVALIDATE_TIME, PAGE_REVALIDATE_TIME } from '@/constants'
import { LOGS_TAG } from '@/constants/tag'
import { Log, Thumb } from '@/models'
import { getLogsFetcher, getThumbsFetcher } from '@/apis/server'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const revalidate = PAGE_REVALIDATE_TIME

export default async function Home() {
  const [logs, thumbs] = await Promise.all([
    getLogsFetcher<Log[]>('api/logs', {
      next: {
        revalidate: API_REVALIDATE_TIME,
        tags: [LOGS_TAG]
      }
    }),
    getThumbsFetcher<Thumb[]>('api/thumbs', {
      next: {
        revalidate: API_REVALIDATE_TIME,
        tags: [LOGS_TAG]
      }
    })
  ])

  if (!logs || !thumbs) notFound()

  const items = logs
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

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12">
        <Profile />
        <section className="pt-32 pb-32">
          <h1 className="text-3xl">Latest Logs</h1>
          <PagenatedItems items={items!} page={0} baseUrl="/logs" pageRangeDisplayed={10} />
        </section>
        <div />
        <div className="text-right">
          <Link className="inline-block p-8 hover:font-bold transition-all ease-in-out" href="wiki/1">
            {'더 많은 포스트(Wiki) 보러 가기->'}
          </Link>
        </div>
      </div>
    </div>
  )
}
