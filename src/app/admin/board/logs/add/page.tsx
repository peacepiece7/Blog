import { Tag } from '@/models'
import { fetcher } from '@/utils/server'
import { AddPostPageContainer } from './_container'

export const dynamic = 'force-dynamic'

export default async function AddPostPage() {
  const { data: tags } = await fetcher<Tag[]>('api/tags', {
    cache: 'no-cache'
  })

  return <AddPostPageContainer tags={tags} />
}
