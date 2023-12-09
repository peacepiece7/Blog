import ScrollToTop from '@/components/ScrollToTop'
import ViewerCover from '@/components/MdViewerCover'
import { Suspense } from 'react'
import LoadingWithSmile from '@/components/LoadingWithSmile'
import ProgressBar from '@/components/ProgressBar'
import { API_REVALIDATE_TIME, PAGE_REVALIDATE_TIME } from '@/constants'
import { notFound } from 'next/navigation'
import { getContentFetcher, getLogFetcher } from '@/apis/server'
import { Log } from '@/models'
import { LOGS_TAG } from '@/constants/tag'

export const dynamic = 'force-static'
export const revalidate = PAGE_REVALIDATE_TIME
interface WEbLogPageProps {
  params: {
    id: string
  }
}
export default async function WebLogPage({ params: { id } }: WEbLogPageProps) {
  const log = await getLogFetcher<Log>('api/log', id, {
    next: {
      revalidate: API_REVALIDATE_TIME,
      tags: [LOGS_TAG]
    }
  })
  const content = await getContentFetcher('api/content', log.storagePath, {
    next: {
      revalidate: API_REVALIDATE_TIME,
      tags: [LOGS_TAG]
    }
  })

  if (!log || !content) notFound()

  return (
    <div className="mb-12">
      <ProgressBar />
      <section className="flex flex-col items-center">
        <h1 className="text-4xl text-center">{log.title}</h1>
        <Suspense fallback={<LoadingWithSmile />}>
          {/* @ts-ignore */}
          <ViewerCover content={content} />
        </Suspense>
        <ScrollToTop />
      </section>
    </div>
  )
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
