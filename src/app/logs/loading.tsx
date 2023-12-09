import { PagenationItem } from '@/components/Pagenation/Items'
import { Pagenation } from '@/components/Pagenation/Pagenation'

const items: PagenationItem[] = [
  {
    id: 'loading UI ㅎㅅㅎ',
    title: 'Loading',
    svg: '',
    tags: [],
    createdAt: '',
    url: ''
  }
]

export default function Loading() {
  return (
    <div className="max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12 mt-24">
      <h1 className="mb-4">Logs</h1>
      <Pagenation items={items} page={0} />
    </div>
  )
}
