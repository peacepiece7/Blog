import { Tag, Thumb } from '@/models'
import { fetcher } from '@/utils/server'
import { AdminTagsPageContainer } from './_container'

export const dynamic = 'force-dynamic'
const option: RequestInit = { cache: 'no-cache' }
interface TagsProps {
  params: { page: string }
}
export default async function AdminTagsPage({ params }: TagsProps) {
  const [{ data: tags }, { data: thumbs }] = await Promise.all([
    fetcher<Tag[]>('api/tags', option),
    fetcher<Thumb[]>('api/thumbs', option)
  ])
  return <AdminTagsPageContainer tags={tags} thumbs={thumbs} params={params} />
}
