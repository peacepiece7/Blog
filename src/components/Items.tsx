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
    <div className="pt-12">
      {items.map((item) => {
        return <Item key={item.id} item={item} />
      })}
    </div>
  )
}
