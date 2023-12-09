'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { PagenationItem } from '@/components/Pagenation/Items'

type Props = {
  items: PagenationItem[]
  itemsPerPage: number
  page: number
  baseUrl?: string
}
export function usePagenation({ items, itemsPerPage, page, baseUrl }: Props) {
  const [pageCnt, setPageCnt] = useState(Math.ceil(items.length / itemsPerPage))
  const [curPageItem, setCurPageLogs] = useState<PagenationItem[]>([])
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // * 현제 페이지의 아이템을 설정한다.
    const itemOffset = page * itemsPerPage
    const endOffset = itemOffset + itemsPerPage
    const currentItems = items.slice(itemOffset, endOffset)
    setCurPageLogs(currentItems)
  }, [items, itemsPerPage, page])

  useEffect(() => {
    setPageCnt(Math.ceil(items.length / itemsPerPage))
  }, [items.length, itemsPerPage])

  const onPageChange = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    if (baseUrl) return router.push(`${baseUrl}/${newOffset / itemsPerPage + 1}`)
    router.push(`${pathname.slice(0, pathname.lastIndexOf('/'))}/${newOffset / itemsPerPage + 1}`)
  }

  return { curPageItem, pageCnt, onPageChange }
}
