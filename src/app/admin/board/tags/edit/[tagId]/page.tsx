import { Log, Tag, Thumb } from '@/models'
import { fetcher } from '@/utils/server'
import { EditTagPageContainer } from './_container'

export const dynamic = 'force-dynamic'
const option: RequestInit = { cache: 'no-cache' }
interface EditTagProps {
  params: {
    tagId: string
  }
}
export default async function EditTagPage({ params }: EditTagProps) {
  const [{ data: logs }, { data: tag }] = await Promise.all([
    fetcher<Log[]>('api/logs', option),
    fetcher<Tag>(`api/tag/${params.tagId}`, option)
  ])
  const { data: thumb } = await fetcher<Thumb>(`api/thumb?id=${tag.thumbnailId}`, option)

  return <EditTagPageContainer logs={logs} tag={tag} thumb={thumb} />
}
