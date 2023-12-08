import Link from 'next/link'
import TagMenu from '@/components/TagMenu'
import type { Log, Tag } from '@/models'
import { REVALIDATE_DEFAULT_TIME } from '@/constants'
import { errorHandler, fetcher } from '@/utils/api'
import { LOGS_TAG } from '@/constants/tag'

export default async function Header() {
  const [logsError, logsRes] = await fetcher<ResponseBase<Log[]>>(`api/logs`, {
    next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
  })
  const [tagsError, tagsRes] = await fetcher<ResponseBase<Tag[]>>(`api/tags`, {
    next: { revalidate: REVALIDATE_DEFAULT_TIME, tags: [LOGS_TAG] }
  })

  if (!logsRes || !tagsRes) return errorHandler([logsError, tagsError])

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
              <TagMenu logs={logsRes.data} tags={tagsRes.data} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
