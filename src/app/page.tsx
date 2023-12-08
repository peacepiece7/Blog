import { PagenatedItems } from '@/components/PagenatedItems'
import { Profile } from '@/components/Profile'
import { REVALIDATE_DEFAULT_TIME } from '@/constants'
import { LOGS_TAG } from '@/constants/tag'
import { Log, Thumb } from '@/models'
import { errorHandler, fetcher } from '@/utils/api'
import Link from 'next/link'

export const dynamic = 'force-dynamic' // 배포시 에러 발생으로 임시 SSR 조치
// export const revalidate = REVALIDATE_DEFAULT_TIME

export default async function Home() {
  const [logError, logRes] = await fetcher<ResponseBase<Log[]>>('api/logs', {
    next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
  })
  const [thumbError, thumbsRes] = await fetcher<ResponseBase<Thumb[]>>('api/thumbs', {
    next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
  })

  if (!logRes || !thumbsRes) return errorHandler([logError, thumbError])

  const items = logRes?.data
    .filter((log) => log.tags.find((tag) => tag === 'Log'))
    .map((log) => {
      const thumb = thumbsRes?.data.find((thumb) => thumb.id === log.thumbnailId)
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
