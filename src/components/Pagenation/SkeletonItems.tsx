'use client'
import { useEffect } from 'react'
import Item from './Item'

interface SkeletonItemsProps {
  items: number
}
export default function SkeletonItems({ items }: SkeletonItemsProps) {
  useEffect(() => {
    if (typeof window == 'undefined') return
    const skeleton = document.getElementById('item-skeleton')
    if (skeleton) {
      skeleton.remove()
    }
  }, [])

  return (
    <ul id="item-skeleton">
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
    </ul>
  )
}
