'use client'
import { Log, Tag } from '@/models'
import { useState } from 'react'
import Link from 'next/link'
import { Drawer } from '../Drawer'

interface HeaderTagsProps {
  logs: Log[]
  tags: Tag[]
}
export function HeaderTags({ logs, tags }: HeaderTagsProps) {
  const [isOpen, setIsOpen] = useState(false)

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
      <Drawer open={isOpen} onClose={openMenu}>
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
                  <Link
                    prefetch={process.env.NODE_ENV === 'production'}
                    className="block w-full"
                    href={`/tags/${tag.name}/1`}
                    key={tag.id}
                  >
                    <li className="mt-4 pl-4 p-2 text-left rounded-md hover:text-red-500 transition-all" key={tag.id}>
                      <span>{tag.name}</span>
                      <span className="pl-4 text-gray-400">{`(${tag.cnt})`}</span>
                    </li>
                  </Link>
                )
              })}
        </ul>
      </Drawer>
    </div>
  )
}
