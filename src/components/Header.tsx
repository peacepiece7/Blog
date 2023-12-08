import Link from 'next/link'
import TagMenu from '@/components/TagMenu'
export default async function Header() {
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
              <Link href="/wiki/1" prefetch={false} className="hover:text-red-500 transition-all">
                Wiki
              </Link>
            </li>
            <li className="pr-4">
              <TagMenu />
            </li>
            {/* <li className="pr-4">
              <Link href="/logs/1" prefetch={false} className="hover:text-red-500 transition-all">
                Log
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  )
}
