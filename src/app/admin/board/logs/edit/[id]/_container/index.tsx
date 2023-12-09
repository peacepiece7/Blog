import { Log, Tag } from '@/models'
import EditLogForm from './LogEditForm'

interface EditPostPageProps {
  log: Log
  tags: Tag[]
  content: string
}
export function EditPostPageContainer({ log, tags, content }: EditPostPageProps) {
  return (
    <div>
      <h1 className="mb-20">Admin Edit Post</h1>
      <EditLogForm tags={tags} log={log} content={content} />
    </div>
  )
}
