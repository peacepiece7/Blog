import { getBaseUrl } from '@/utils'
import React from 'react'
import TableOfContent from './TableOfContent'
import MarkdownViewer from './MarkdownViewer'

type Props = {
  path: string
}
export default async function MdViewerCover({ path }: Props) {
  const content: string = await fetch(`${getBaseUrl()}/api/content?path=${path}`).then((res) => res.json())

  return (
    <div className="w-full">
      <TableOfContent content={content} />
      <MarkdownViewer content={content} />
    </div>
  )
}
