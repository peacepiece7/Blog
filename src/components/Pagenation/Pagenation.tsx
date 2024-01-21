'use client'
import ReactPaginate from 'react-paginate'
import Items, { PagenationItem } from './Items'
import { usePagenation } from '@/hooks/usePagenation'
import './Pagenation.css'
import SkeletonItems from './SkeletonItems'

interface PagenationProps {
  itemsPerPage?: number
  page: number
  items: PagenationItem[]
  baseUrl?: string
  pageRangeDisplayed?: number
}
export const Pagenation = ({
  itemsPerPage = 10,
  page = 0,
  items,
  baseUrl,
  pageRangeDisplayed = 5
}: PagenationProps) => {
  const { curPageItem, pageCnt, onPageChange } = usePagenation({ items, itemsPerPage, page, baseUrl })

  return (
    <>
      <Items items={curPageItem} />
      <SkeletonItems items={1} />
      <div id="pagenation">
        <ReactPaginate
          className="flex cursor-pointer justify-center pt-10"
          breakLabel=".."
          nextLabel=">"
          onPageChange={onPageChange}
          pageRangeDisplayed={pageRangeDisplayed}
          pageCount={pageCnt}
          previousLabel="<"
          forcePage={page}
          renderOnZeroPageCount={null}
          marginPagesDisplayed={1}
        />
      </div>
    </>
  )
}
