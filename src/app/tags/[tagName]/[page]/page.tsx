import { PagenationItem } from '@/components/Items'
import { PagenatedItems } from '@/components/PagenatedItems'
import { API_REVALIDATE_TIME, PAGE_REVALIDATE_TIME } from '@/constants'
import { LOGS_TAG } from '@/constants/tag'
import { Log, Thumb } from '@/models'
import { getLogsFetcher, getThumbsFetcher } from '@/apis'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const revalidate = PAGE_REVALIDATE_TIME

interface TagsProps {
  params: {
    tagName: string
    page: string
  }
}

export default async function Tags({ params: { tagName, page } }: TagsProps) {
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

  const itemsFilteredByTag: PagenationItem[] = logs
    .filter((log) => log.tags.includes(tagName))
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
    <div className="max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12 mt-24">
      <h1 className="mb-4">{`${tagName} Logs`}</h1>
      <PagenatedItems items={itemsFilteredByTag} page={parseInt(page) - 1} />
    </div>
  )
}

export async function generateMetadata({ params: { tagName } }: TagsProps) {
  return {
    title: `Web log | ${tagName}`,
    description: `${tagName} logs`
  }
}
