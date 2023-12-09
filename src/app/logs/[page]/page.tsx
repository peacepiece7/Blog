import { API_REVALIDATE_TIME, PAGE_REVALIDATE_TIME } from '@/constants'
import { LOGS_TAG } from '@/constants/tag'
import { Log, Thumb } from '@/models'
import { getLogsFetcher, getThumbsFetcher } from '@/apis/server'
import { notFound } from 'next/navigation'
import { LogPageContainer } from './_containers'

export const dynamic = 'force-static'
export const revalidate = PAGE_REVALIDATE_TIME

export const metadata = {
  title: 'Web Log | wiki',
  description: 'Playground for me'
}
const option = {
  next: {
    revalidate: API_REVALIDATE_TIME,
    tags: [LOGS_TAG]
  }
}
interface LogPageProps {
  params: {
    page: string
  }
}
export default async function LogPage({ params: { page } }: LogPageProps) {
  const [logs, thumbs] = await Promise.all([
    getLogsFetcher<Log[]>('api/logs', option),
    getThumbsFetcher<Thumb[]>('api/thumbs', option)
  ])

  if (!logs || !thumbs) notFound()

  return <LogPageContainer logs={logs} thumbs={thumbs} page={page} />
}
