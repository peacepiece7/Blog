import { PagenationItem } from '@/components/Items'
import { PagenatedItems } from '@/components/PagenatedItems'
import { REVALIDATE_DEFAULT_TIME } from '@/constants'
import { LOGS_TAG } from '@/constants/tag'
import { Log, Thumb } from '@/models'
import { errorHandler, fetcher } from '@/utils/api'

// export const revalidate = REVALIDATE_DEFAULT_TIME
export const dynamic = 'force-static'
interface TagsProps {
  params: {
    tagName: string
    page: string
  }
}
export default async function Tags({ params: { tagName, page } }: TagsProps) {
  const [logError, logRes] = await fetcher<ResponseBase<Log[]>>('api/logs', {
    next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
  })
  const [thumbError, thumbsRes] = await fetcher<ResponseBase<Thumb[]>>(`api/thumbs`, {
    next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
  })

  if (!logRes || !thumbsRes) return errorHandler([logError, thumbError])

  const itemsFilteredByTag: PagenationItem[] = logRes.data
    .filter((log) => log.tags.includes(tagName))
    .map((log) => {
      const thumb = thumbsRes.data.find((thumb) => thumb.id === log.thumbnailId)
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
