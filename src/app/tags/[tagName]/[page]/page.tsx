import PagenatedItems from '@/components/PagenatedItems'
import { LogsResponse, ThumbnailsResponse } from '@/type'
import { getBaseUrl } from '@/utils'

type Props = {
  params: {
    tagName: string
    page: string
  }
}
export default async function Tags({ params: { tagName, page } }: Props) {
  const logs: LogsResponse = await fetch(`${getBaseUrl()}/api/logs`).then((res) => res.json())
  const thumbs: ThumbnailsResponse = await fetch(`${getBaseUrl()}/api/thumbs`).then((res) => res.json())
  const filteredItems = logs
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
      <h1>{`${tagName} Logs`}</h1>
      <PagenatedItems items={filteredItems} page={parseInt(page) - 1} />
    </div>
  )
}

export async function generateMetadata({ params: { tagName } }: Props) {
  return {
    title: `Web log | ${tagName}`,
    description: `${tagName} logs`
  }
}
