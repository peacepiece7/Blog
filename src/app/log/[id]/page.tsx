import { API_REVALIDATE_TIME, PAGE_REVALIDATE_TIME } from '@/constants'
import { notFound } from 'next/navigation'
import { getContentFetcher, getLogFetcher } from '@/apis/server'
import { Log } from '@/models'
import { LOGS_TAG } from '@/constants/tag'
import { WebLogPageContainer } from './_containers'

export const dynamic = 'force-static'
export const revalidate = PAGE_REVALIDATE_TIME
const option: RequestInit = {
  next: {
    revalidate: API_REVALIDATE_TIME,
    tags: [LOGS_TAG]
  }
}
interface WEbLogPageProps {
  params: {
    id: string
  }
}
export default async function WebLogPage({ params: { id } }: WEbLogPageProps) {
  const log = await getLogFetcher<Log>('api/log', id, option)
  const content = await getContentFetcher('api/content', log.storagePath, option)

  if (!log || !content) notFound()

  return <WebLogPageContainer log={log} content={content} />
}

export async function generateMetadata({ params: { id } }: WEbLogPageProps) {
  const log = await getLogFetcher<Log>('api/log', id, {
    next: {
      revalidate: API_REVALIDATE_TIME,
      tags: [LOGS_TAG]
    }
  })
  return {
    title: `Web log | ${log.title}`,
    description: `${log.title} 포스팅`,
    keywords: `${log.tags.join(', ')}`
  }
}
