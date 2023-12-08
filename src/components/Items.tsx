'use client'
import Item from './Item'

export type PagenationItem = {
  id: string
  title: string
  svg?: string
  tags?: string[]
  createdAt?: string
  url?: string
}

type Props = {
  items: PagenationItem[]
}

export default function Items({ items }: Props) {
  return (
    <div className="pt-12">
      {items.map((item) => {
        return <Item key={item.id} item={item} />
      })}
    </div>
  )
}
