// 'use client' <- 차이 체크하기
import { SmileLoading } from '@/components/Loading/SmileLoading'
import MdViewerCover from '@/components/PostViewer/MdViewerCover'
import ProgressBar from '@/components/ProgressBar'
import ScrollToTop from '@/components/ScrollToTop'
import { Log } from '@/models'
import { Suspense } from 'react'

interface LogPageContainerProps {
  log: Log
  content: string
}
export function WebLogPageContainer({ log, content }: LogPageContainerProps) {
  return (
    <div className="mb-12">
      <ProgressBar />
      <section className="flex flex-col items-center">
        <h1 className="text-4xl text-center">{log.title}</h1>
        <Suspense fallback={<SmileLoading />}>
          <MdViewerCover content={content} />
        </Suspense>
        <ScrollToTop />
      </section>
    </div>
  )
}
