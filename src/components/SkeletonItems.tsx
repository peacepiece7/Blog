'use client'
import { useEffect } from 'react'
import Item from './Item'

type Props = {
  items: number
}
export default function SkeletonItems({ items }: Props) {
  useEffect(() => {
    if (typeof window == 'undefined') return
    const skeleton = document.getElementById('item-skeleton')
    if (skeleton) {
      skeleton.remove()
    }
  }, [])

  return (
    <div id="item-skeleton">
      {Array(items)
        .fill(0)
        .map((_, i) => {
          return (
            <div key={`${_}${i}`}>
              <Item
                item={{
                  id: '',
                  title: 'Loading',
                  svg: '',
                  tags: [],
                  createdAt: '',
                  url: ''
                }}
              />
            </div>
          )
        })}
    </div>
  )
}
