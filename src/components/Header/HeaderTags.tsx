'use client'
import { Log, Tag } from '@/models'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface HeaderTagsProps {
  logs: Log[]
  tags: Tag[]
}
export function HeaderTags({ logs, tags }: HeaderTagsProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.id === 'tagBtn') return
      setIsOpen(false)
    })
  }, [])

  const tagList = tags?.map((tag) => {
    let cnt = 0
    logs?.forEach((log) => {
      log.tags.includes(tag.name) && cnt++
    })
    return {
      ...tag,
      cnt
    }
  })

  const openMenu = () => setIsOpen(!isOpen)

  return (
    <div>
      <p id="tagBtn" onClick={openMenu} className="cursor-pointer m-0 hover:text-red-500 transition-all">
        Tag
      </p>
      {/* PORTAL로 보낼까? */}
      <div
        id="tagMenu"
        className={`absolute top-[70px] right-0 bg-white z-20 border-black border-solid transition-all overflow-hidden
        ${isOpen ? 'w-[400px] border-[1px]' : 'border-0 w-0'}`}
      >
        <ul className="p-0">
          {tagList &&
            tagList
              .sort((a, b) => {
                if (a.cnt === b.cnt) {
                  return a.name < b.name ? -1 : 1
                }
                return b.cnt - a.cnt
              })
              .map((tag) => {
                return (
                  <Link prefetch={false} className="block w-full" href={`/tags/${tag.name}/1`} key={tag.id}>
                    <li className="mt-4 pl-12 p-4 text-left rounded-md hover:text-red-500 transition-all">
                      <span>{tag.name}</span>
                      <span className="pl-4 text-gray-400">{`(${tag.cnt})`}</span>
                    </li>
                  </Link>
                )
              })}
        </ul>
      </div>
    </div>
  )
}
