'use client'
import ReactPaginate from 'react-paginate'
import Items, { PagenationItem } from './Items'
import { usePagenation } from '@/hooks/pagenation'
import './PagenatedItems.css'
import SkeletonItems from './SkeletonItems'

type Props = {
  itemsPerPage?: number
  page: number
  items: PagenationItem[]
  baseUrl?: string
}
export default function PagenatedItems({ itemsPerPage = 5, page = 0, items, baseUrl }: Props) {
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
          pageRangeDisplayed={5}
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
