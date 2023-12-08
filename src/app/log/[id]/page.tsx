import ScrollToTop from '@/components/ScrollToTop'
import { getBaseUrl } from '@/utils'
import { LogResponse } from '@/type'
import ViewerCover from '@/components/MdViewerCover'
import { Suspense } from 'react'
import LoadingWithSmile from '@/components/LoadingWithSmile'

type Props = {
  params: {
    id: string
  }
}
export default async function WebLogPage({ params: { id } }: Props) {
  const log: LogResponse = await fetch(`${getBaseUrl()}/api/log/${id}`).then((res) => res.json())

  return (
    <div className="mb-12">
      <section className="flex flex-col items-center">
        <h1 className="text-4xl text-center">{log?.title}</h1>
        <Suspense fallback={<LoadingWithSmile />}>
          {/* @ts-expect-error Server Component */}
          <ViewerCover path={log.storagePath} />
        </Suspense>
        <ScrollToTop />
      </section>
    </div>
  )
}

export async function generateMetadata({ params: { id } }: Props) {
  const log: LogResponse = await fetch(`${getBaseUrl()}/api/log/${id}`).then((res) => res.json())

  return {
    title: `Web log | ${log.title}`,
    description: `${log.title} 포스팅`,
    keywords: `${log.tags.join(', ')}`
  }
}
