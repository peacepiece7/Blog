import { PagenationItem } from '@/components/Items'
import PagenatedItems from '@/components/PagenatedItems'
import React from 'react'

export default function Loading() {
  // * items가 정의되어 있기 때문에 PagenatedItems의 SkeletonItems를 Loading 상태 화면에 출력할 수 있음! (useEffect가 있지만 똑똑하게 먼저 UI를 랜더링 함)
  // * PagenatedItems가 streaming SSR로 동작함 그래서 내부 컴포넌트가 hooks를 사용함에도 미리 만들어진 HTML을 출력함
  const items: PagenationItem[] = [
    {
      id: '',
      title: 'Loading',
      svg: '',
      tags: [],
      createdAt: '',
      url: ''
    }
  ]
  return (
    <div className="max-w-7xl inset-0 m-auto pl-5 pr-5 mb-12 mt-24">
      <h1 className="mb-4">Logs</h1>
      <PagenatedItems items={items} page={0} />
    </div>
  )
}
