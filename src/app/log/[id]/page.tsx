import ScrollToTop from '@/components/ScrollToTop'
import ViewerCover from '@/components/MdViewerCover'
import { Suspense } from 'react'
import LoadingWithSmile from '@/components/LoadingWithSmile'
import ProgressBar from '@/components/ProgressBar'
import { API_REVALIDATE_TIME, PAGE_REVALIDATE_ITEM } from '@/constants'
import { notFound } from 'next/navigation'
import { getLogCache } from '@/service/preloaders'
import { getContentFetcher, getLogFetcher } from '@/utils/api'
import { Log } from '@/models'
import { LOGS_TAG } from '@/constants/tag'

export const dynamic = 'force-static'
export const revalidate = PAGE_REVALIDATE_ITEM

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
  const logs = await getLogCache(id)

  return {
    title: `Web log | ${logs.title}`,
    description: `${logs.title} 포스팅`,
    keywords: `${logs.tags.join(', ')}`
  }
}
