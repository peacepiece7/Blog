import React from 'react'
import { PagenationItem } from './Items'
import Link from 'next/link'
import Image from 'next/image'
import { randomBrightColor } from '@/utils'

interface ItemProps {
  item: PagenationItem
}
export default function Item({ item }: ItemProps) {
  return (
    <li className="flex drop-shadow-lg p-4 transition ease-in-out bg-white rounded-xl mt-8 hover:drop-shadow-xl">
      <div className="flex-1 pt-4">
        <Link prefetch={false} href={item.url ? item.url : '/'}>
          {item.svg && (
            <div
              className="w-[4rem] h-[4rem] flex justify-center items-center rounded-md overflow-hidden"
              dangerouslySetInnerHTML={{ __html: item.svg }}
            />
          )}
          {!item.svg && <Image src="/loading.svg" width={125} height={125} alt="default icon" />}
          <h2 className="text-2xl pt-4 m-0">{item.title}</h2>
          {item.tags && item.tags.length !== 0 && (
            <p className="text-end m-0 mt-2">
              Tags :
              {item.tags.map((tag) => {
                const rgb = randomBrightColor(tag)
                return (
                  <Link key={tag} href={`/tags/${tag}/1`}>
                    <span
                      style={{ backgroundColor: rgb }}
                      className="inline-block p-1 ml-1 rounded-md text-white hover:scale-105"
                    >
                      {tag}
                    </span>
                  </Link>
                )
              })}
            </p>
          )}
          {item.createdAt && <p className="text-end m-0 mt-2">{`Created At : ${item.createdAt}`}</p>}
        </Link>
      </div>
    </li>
  )
}
