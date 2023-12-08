import Link from 'next/link'

export default function AdminHeader() {
  return (
    <header className="flex justify-end h-[100px] mt-4">
      <Link prefetch={false} className="pr-12" href="/admin/board/logs/1">
        Logs
      </Link>
      <Link prefetch={false} className="pr-12" href="/admin/board/logs/add">
        Add Log
      </Link>
      <Link prefetch={false} className="pr-12" href="/admin/board/tags/1">
        Tags
      </Link>
      <Link prefetch={false} className="pr-12" href="/admin/board/tags/add">
        Add Tag
      </Link>
    </header>
  )
}
