import Link from 'next/link'

export function WikiLink() {
  return (
    <div className="text-right">
      <Link className="inline-block p-8 hover:font-bold transition-all ease-in-out" href="wiki/1">
        {'더 많은 포스트(Wiki) 보러 가기->'}
      </Link>
    </div>
  )
}
