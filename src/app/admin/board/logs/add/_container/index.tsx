import { Tag } from '@/models'
import LogAddForm from './LogAddForm'

interface AddPostPageContainerProps {
  tags: Tag[]
}
export function AddPostPageContainer({ tags }: AddPostPageContainerProps) {
  return (
    <div className="max-w-7xl m-auto">
      <h1 className="mb-20 pl-8">Admin Add Log</h1>
      <LogAddForm tags={tags} />
    </div>
  )
}
