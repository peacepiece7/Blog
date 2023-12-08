'use client'
import { Log, Tag } from '@/models'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { randomBrightColor } from '@/utils'
import { DATE_FORMAT } from '@/constants'
import MarkdownViewer from '../MarkdownViewer'
import { errorHandler, fetcher } from '@/utils/api'

interface LogEditFormProps {
  log: Log
  tags: Tag[]
  content: string
}
export default function LogEditForm({ log, content: contentProp, tags: tagsProp }: LogEditFormProps) {
  const [content, setContent] = useState(contentProp)
  const [tags, setTags] = useState(log.tags)
  const [title, setTitle] = useState(log.title)
  const router = useRouter()

  useEffect(() => {
    // * tab키를 누르면 2칸 들여쓰기가 되도록 합니다.
    document.getElementById('textbox')?.addEventListener('keydown', function (e: KeyboardEvent) {
      if (e.key == 'Tab') {
        e.preventDefault()
        const target = e.target as HTMLTextAreaElement
        var start = target.selectionStart
        var end = target.selectionEnd
        // set textarea value to: text before caret + tab + text after caret
        target.value = target.value.substring(0, start) + '  ' + target.value.substring(end)
        // put caret at right position again
        target.selectionStart = target.selectionEnd + 1
        target.selectionEnd = start + 2
      }
    })
  }, [])

  async function updateLog() {
    const textarea = document.querySelector('.weblog-textarea') as HTMLTextAreaElement
    if (contentProp !== content) {
      const [contentError] = await fetcher<ResponseBase<null>>('api/content', {
        method: 'POST',
        body: JSON.stringify({
          storagePath: log.storagePath,
          content: textarea.value
        })
      })
      if (contentError) return errorHandler(contentError)
    }
    if (title !== log.title || JSON.stringify(tags) !== JSON.stringify(log.tags) || contentProp !== content) {
      const curLog: Log = {
        ...log,
        title: title,
        tags: tags,
        lastModifiedAt: dayjs().format(DATE_FORMAT)
      }
      const [logError] = await fetcher('api/log/update', {
        method: 'POST',
        body: JSON.stringify(curLog)
      })
      if (logError) return errorHandler(logError)
    }

    router.push('/admin/board/logs/1')
  }

  function removeTag(e: React.MouseEvent<HTMLButtonElement>) {
    const targetTag = (e.target as HTMLButtonElement).textContent
    setTags((prev) => prev.filter((tag) => tag !== targetTag))
  }

  function addTag(e: React.ChangeEvent<HTMLSelectElement>) {
    const targetTag = (e.target as HTMLSelectElement).value
    if (targetTag === '') return
    setTags((prev) => (prev.includes(targetTag) ? prev : [...prev, targetTag]))
  }

  async function deleteLog() {
    const trigger = prompt('Are you sure you want to delete this post?\nso, type "delete"')
    if (trigger !== 'delete') return
    const [logError] = await fetcher(`api/log/${log.id}`, {
      method: 'POST'
    })
    if (logError) return errorHandler(logError)

    const [contentError] = await fetcher(`api/content/${log.storagePath}`, {
      method: 'POST'
    })
    if (contentError) {
      return errorHandler(contentError)
    }

    // * ISR은 invalidate한 요청을 반환하고 refetch하기때문에, 캐시를 삭제해도
    // * 첫 이동은 새로운 데이터를 가져오지 못합니다.
    router.push('/admin/board/logs/1')
  }

  return (
    <div className="flex">
      <div className="min-w-[700px] flex-1 mr-12 ml-12">
        <div className="flex">
          <input
            className="border border-solid border-gray-300 rounded-md w-96 text-2xl"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ml-4 border-none cursor-pointer"
            onClick={() => setTitle(log.title)}
          >
            Reset
          </button>
        </div>
        <div className="pb-5 pr-5 text-end">
          {tags.map((name) => {
            const rgb = randomBrightColor(name)
            return (
              <button
                onClick={removeTag}
                style={{ backgroundColor: rgb }}
                className="p-1 ml-1 rounded-md cursor-pointer border-none text-white"
                key={name}
              >
                {name}
              </button>
            )
          })}
          <select name="tag" onChange={addTag} className="ml-5">
            <option value="">Add Tag</option>
            {tagsProp
              .sort((a, b) => {
                return a.name > b.name ? 1 : -1
              })
              .map((tag) => {
                return (
                  <option key={tag.name} value={tag.name}>
                    {tag.name}
                  </option>
                )
              })}
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 border-none cursor-pointer"
            onClick={() => setTags(log.tags)}
          >
            Reset
          </button>
        </div>
        <div className="mt-4 mb-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-none cursor-pointer"
            onClick={() => setContent(contentProp)}
          >
            Reset Content
          </button>
        </div>
        <textarea
          id="textbox"
          className="w-full h-[1200px] weblog-textarea"
          value={content as string}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="text-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-auto border-none cursor-pointer"
            onClick={updateLog}
          >
            Update Post
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-12 border-none cursor-pointer"
            onClick={deleteLog}
          >
            Delete Post
          </button>
        </div>
      </div>
      <MarkdownViewer content={content} />
    </div>
  )
}
