import PagenatedItems from '@/components/PagenatedItems'
import { LogsResponse, ThumbnailsResponse } from '@/type'
import { getBaseUrl } from '@/utils'

type Props = {
  params: {
    page: string
  }
}
export default async function LogPage({ params: { page } }: Props) {
  const logs: LogsResponse = await fetch(`${getBaseUrl()}/api/logs`).then((res) => res.json())
  const thumbs: ThumbnailsResponse = await fetch(`${getBaseUrl()}/api/thumbs`).then((res) => res.json())

  const items = logs
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
      <PagenatedItems items={items} page={parseInt(page) - 1} pageRangeDisplayed={10} />
    </div>
  )
}

export const metadata = {
  title: 'Web Log | wiki',
  description: 'Playground for me'
}
