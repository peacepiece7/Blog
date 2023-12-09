import TagEditForm from './TagEditForm'
import { Log, Tag, Thumb } from '@/models'

interface EditTagPageContainerProps {
  logs: Log[]
  tag: Tag
  thumb: Thumb
}
export function EditTagPageContainer({ logs, tag, thumb }: EditTagPageContainerProps) {
  return (
    <div className="max-w-7xl m-auto">
      <h1>Admin Edit Tag</h1>
      <TagEditForm logs={logs} tag={tag} thumb={thumb} />
    </div>
  )
}
