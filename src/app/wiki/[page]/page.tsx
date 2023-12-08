import { PagenationItem } from '@/components/Items'
import { PagenatedItems } from '@/components/PagenatedItems'
import { REVALIDATE_DEFAULT_TIME } from '@/constants'
import { LOGS_TAG } from '@/constants/tag'
import { Log, Thumb } from '@/models'
import { errorHandler, fetcher } from '@/utils/api'

// HACK : dynamic import
export const dynamic = 'force-static'
// export const revalidate = REVALIDATE_DEFAULT_TIME

interface LogPageProps {
  params: {
    page: string
  }
}
export default async function LogPage({ params: { page } }: LogPageProps) {
  const [logError, logRes] = await fetcher<ResponseBase<Log[]>>('api/logs', {
    next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
  })
  const [thumbError, thumbsRes] = await fetcher<ResponseBase<Thumb[]>>(`api/thumbs`, {
    next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
  })

  if (!logRes || !thumbsRes) return errorHandler([logError, thumbError])

  const wikiItems: PagenationItem[] = logRes.data
    .filter((log) => !log.tags.find((tag) => tag === 'Log'))
    .map((log) => {
      const thumb = thumbsRes.data.find((thumb) => thumb.id === log.thumbnailId)
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
