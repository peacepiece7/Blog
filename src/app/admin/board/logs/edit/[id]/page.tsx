import { Log, Tag } from '@/models'
import { fetcher } from '@/utils/server'
import { EditPostPageContainer } from './_container'

export const dynamic = 'force-dynamic'
const option: RequestInit = { cache: 'no-cache' }
interface EditPostProps {
  params: {
    id: string
  }
}
export default async function EditPostPage({ params: { id } }: EditPostProps) {
  const [{ data: log }, { data: tags }] = await Promise.all([
    fetcher<Log>(`api/log/${id}`, option),
    fetcher<Tag[]>('api/tags', option)
  ])
  const { data: content }: ResponseBase<string> = await fetcher(`api/content?path=${log.storagePath}`, option)

  return <EditPostPageContainer log={log} tags={tags} content={content} />
}
