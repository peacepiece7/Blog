import { API_REVALIDATE_TIME, PAGE_REVALIDATE_TIME } from '@/constants'
import { LOGS_TAG } from '@/constants/tag'
import { Log, Thumb } from '@/models'
import { getLogsFetcher, getThumbsFetcher } from '@/apis/server'
import { notFound } from 'next/navigation'
import { TagsPageContainer } from './_container'

export const dynamic = 'force-static'
export const revalidate = PAGE_REVALIDATE_TIME
const option = {
  next: {
    revalidate: API_REVALIDATE_TIME,
    tags: [LOGS_TAG]
  }
}
interface TagsProps {
  params: {
    tagName: string
    page: string
  }
}
export default async function TagsPage({ params }: TagsProps) {
  const [logs, thumbs] = await Promise.all([
    getLogsFetcher<Log[]>('api/logs', option),
    getThumbsFetcher<Thumb[]>('api/thumbs', option)
  ])

  if (!logs || !thumbs) notFound()

  return <TagsPageContainer logs={logs} thumbs={thumbs} params={params} />
}

export async function generateMetadata({ params: { tagName } }: TagsProps) {
  return {
    title: `Web log | ${tagName}`,
    description: `${tagName} logs`
  }
}
