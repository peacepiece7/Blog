import Link from 'next/link'
import TagMenu from '@/components/TagMenu'
import { notFound } from 'next/navigation'
import { getLogsFetcher, getTagsFetcher } from '@/utils/api'
import { Log, Tag } from '@/models'
import { API_REVALIDATE_TIME } from '@/constants'
import { LOGS_TAG } from '@/constants/tag'

export default async function Header() {
  const logs = await getLogsFetcher<Log[]>('api/logs', {
    next: {
      revalidate: API_REVALIDATE_TIME,
      tags: [LOGS_TAG]
    }
  })
  const tags = await getTagsFetcher<Tag[]>('api/tags', {
    next: {
      revalidate: API_REVALIDATE_TIME,
      tags: [LOGS_TAG]
    }
  })

  if (!logs || !tags) notFound()

  return (
    <header id="header" className="border-b-2">
      <div className="flex justify-between pr-4 pl-4">
        <div className="hover:text-red-500 transition-all">
          <Link prefetch={false} href="/">
            <p>PEACE</p>
            <p>PIECE</p>
          </Link>
        </div>
        <nav className="flex items-center">
          <ul className="flex justify-between">
            <li className="pr-4">
              <Link href="/logs/1" prefetch={false} className="hover:text-red-500 transition-all">
                Log
              </Link>
            </li>
            <li className="pr-4">
              <Link href="/wiki/1" prefetch={false} className="hover:text-red-500 transition-all">
                Wiki
              </Link>
            </li>
            <li className="pr-4">
              <TagMenu logs={logs} tags={tags} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
