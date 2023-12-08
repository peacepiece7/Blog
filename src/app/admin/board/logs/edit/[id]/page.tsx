import { LogResponse, TagsResponse } from '@/type'
import { Suspense } from 'react'
import EditLogForm from '@/components/admin/LogEditForm'
import { getBaseUrl } from '@/utils'

type Props = {
  params: {
    id: string
  }
}
export default async function EditPost({ params: { id } }: Props) {
  const log: LogResponse = await fetch(`${getBaseUrl()}/api/log/${id}`).then((res) => res.json())
  const tags: TagsResponse = await fetch(`${getBaseUrl()}/api/tags`).then((res) => res.json())
  const content: string = await fetch(`${getBaseUrl()}/api/content?path=${log.storagePath}`).then((res) => res.json())

  return (
    <div>
      <h1 className="mb-20">Admin Edit Post</h1>
      <EditLogForm tags={tags} log={log} content={content} />
    </div>
  )
}
