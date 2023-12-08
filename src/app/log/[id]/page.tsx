import ScrollToTop from '@/components/ScrollToTop'
import { Log } from '@/models'
import ViewerCover from '@/components/MdViewerCover'
import { Suspense } from 'react'
import LoadingWithSmile from '@/components/LoadingWithSmile'
import ProgressBar from '@/components/ProgressBar'
import { errorHandler, fetcher } from '@/utils/api'
import { REVALIDATE_DEFAULT_TIME } from '@/constants'
import { LOGS_TAG } from '@/constants/tag'

export const dynamic = 'force-static'
// export const revalidate = REVALIDATE_DEFAULT_TIME

interface WEbLogPageProps {
  params: {
    id: string
  }
}
export default async function WebLogPage({ params: { id } }: WEbLogPageProps) {
  const [logError, logRes] = await fetcher<ResponseBase<Log>>(`api/log/${id}`, {
    next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
  })
  if (!logRes) return errorHandler(logError)

  const [contentError, contentRes] = await fetcher<ResponseBase<string>>(
    `api/content?path=${logRes.data.storagePath}`,
    {
      next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
    }
  )
  if (!contentRes) return errorHandler(contentError)

  return (
    <div className="mb-12">
      <ProgressBar />
      <section className="flex flex-col items-center">
        <h1 className="text-4xl text-center">{logRes.data.title}</h1>
        <Suspense fallback={<LoadingWithSmile />}>
          {/* @ts-expect-error Server Component */}
          <ViewerCover content={contentRes.data} />
        </Suspense>
        <ScrollToTop />
      </section>
    </div>
  )
}

export async function generateMetadata({ params: { id } }: WEbLogPageProps) {
  const [error, res] = await fetcher<ResponseBase<Log>>(`api/log/${id}`, {
    next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
  })

  if (res === null) {
    return {
      title: `Web log | not found`,
      description: `존재하지 않는 포스트입니다.`
    }
  }
  return {
    title: `Web log | ${res.data.title}`,
    description: `${res.data.title} 포스팅`,
    keywords: `${res.data.tags.join(', ')}`
  }
}
