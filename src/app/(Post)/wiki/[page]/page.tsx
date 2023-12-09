import { PagenationItem } from '@/components/Items'
import { PagenatedItems } from '@/components/PagenatedItems'
import { API_REVALIDATE_TIME, PAGE_REVALIDATE_TIME } from '@/constants'
import { LOGS_TAG } from '@/constants/tag'
import { Log, Thumb } from '@/models'
import { getLogsFetcher, getThumbsFetcher } from '@/apis/server'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const revalidate = PAGE_REVALIDATE_TIME

interface LogPageProps {
  params: {
    page: string
  }
}

export default async function LogPage({ params: { page } }: LogPageProps) {
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

  const wikiItems: PagenationItem[] = logs
    .filter((log) => !log.tags.find((tag) => tag === 'Log'))
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

  return (
    <div className="max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12 mt-24">
      <h1 className="mb-4">wiki</h1>
      <PagenatedItems items={wikiItems} page={parseInt(page) - 1} pageRangeDisplayed={10} />
    </div>
  )
}

export const metadata = {
  title: 'Web Log | wiki',
  description: 'web log wiki'
}
