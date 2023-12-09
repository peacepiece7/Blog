import { TableOfContent } from './TableOfContent'
import { MarkdownViewer } from './MarkdownViewer'

interface MdViewerCoverProps {
  content: string
}

export function MdViewerCover({ content }: MdViewerCoverProps) {
  return (
    <div className="w-full">
      <TableOfContent content={content} />
      <MarkdownViewer content={content} />
    </div>
  )
}
