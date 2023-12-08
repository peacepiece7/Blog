import { TagsResponse } from '@/type'
import LogAddForm from '@/components/admin/LogAddForm'
// import { getBaseUrl } from '@/utils'
import { getDocsCache } from '@/service/Firebase_fn/collection'

export default async function AddPost() {
  // const tags: TagsResponse = await fetch(`${getBaseUrl()}/api/tags}`, {
  //   cache: 'no-cache'
  // }).then((res) => res.json())
  const tags = (await getDocsCache('tags')) as unknown as TagsResponse

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="mb-20 pl-8">Admin Add Log</h1>
      <LogAddForm tags={tags} />
    </div>
  )
}
