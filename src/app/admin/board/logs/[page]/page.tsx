import { Log, Thumb } from '@/models'
import { fetcher } from '@/utils/server'
import { AdminPostsPageContainer } from './_container'

export const dynamic = 'force-dynamic'
const option: RequestInit = { cache: 'no-cache' }
interface PostsProps {
  params: { page: string }
}
export default async function AdminPostsPage({ params }: PostsProps) {
  const [{ data: logs }, { data: thumbs }] = await Promise.all([
    fetcher<Log[]>('api/logs', option),
    fetcher<Thumb[]>('api/thumbs', option)
  ])

  return <AdminPostsPageContainer logs={logs} thumbs={thumbs} params={params} />
}
