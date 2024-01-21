'use client'
import Item from './Item'

export interface PagenationItem {
  id: string
  title: string
  svg?: string
  tags?: string[]
  createdAt?: string
  url?: string
}

interface ItemsProps {
  items: PagenationItem[]
}

export default function Items({ items }: ItemsProps) {
  return (
    <ul id="postList" className="max-w-5xl p-0 pt-12 m-auto">
      {items.map((item) => {
        return <Item key={item.id} item={item} />
      })}
    </ul>
  )
}
