'use client'
import { Log, Tag, Thumb } from '@/models'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface TagEditFormProps {
  tag: Tag
  thumb: Thumb
  logs: Log[]
}

export default function TagEditForm({ logs, tag: tagProp, thumb: thumbProp }: TagEditFormProps) {
  const [tagName, setTagName] = useState(tagProp.name)
  const [source, setSource] = useState(thumbProp.source)
  const router = useRouter()

  // TODO : 트렌젝션으로 변경해야함
  async function updateTag() {
    const requests = []
    // * 태그 이름이 변경되면 태그 이름과 로그를 업데이트 합니다.
    if (tagName !== tagProp.name) {
      const tag: Tag = {
        ...tagProp,
        name: tagName
      }
      requests.push(
        fetch('api/tag/update', {
          method: 'POST',
          body: JSON.stringify(tag)
        })
      )
      logs.forEach((log) => {
        const isExist = log.tags.find((tag) => tag === tagProp.name)
        if (!isExist) return
        log.tags = log.tags.map((tag) => (tag === tagProp.name ? tagName : tag))
        requests.push(
          fetch('api/log/update', {
            method: 'POST',
            body: JSON.stringify(log)
          })
        )
      })
    }
    // * 썸네일이 변경되면 업데이트 합니다.
    if (source !== thumbProp.source) {
      const thumb: Thumb = {
        ...thumbProp,
        source
      }
      requests.push(
        fetch('/api/thumb', {
          method: 'POST',
          body: JSON.stringify(thumb)
        })
      )
    }
    await Promise.all(requests)
    router.push('/admin/board/tags/1')
  }
  async function deleteTag() {
    const trigger = prompt('If you want to delete this tag, type "delete"')
    if (trigger !== 'delete') return
    const requests = [
      fetch(`/api/tag?id=${tagProp.id}`, {
        method: 'POST'
      }),
      fetch(`/api/thumb?id=${thumbProp.id}`, {
        method: 'POST'
      })
    ]
    logs.forEach((log) => {
      const isExist = log.tags.find((tag) => tag === tagProp.name)
      if (!isExist) return
      log.tags = log.tags.filter((tag) => tag !== tagProp.name)
      requests.push(
        fetch('/api/log/update', {
          method: 'POST',
          body: JSON.stringify(log)
        })
      )
    })
    await Promise.all(requests)
    router.push('/admin/board/tags/1')
  }

  const resetTagName = () => setTagName(tagProp.name)
  const resetSource = () => setSource(thumbProp.source)

  return (
    <div className="mb-12">
      <p className="text-red-500">
        문서 구조상 태그를 변경, 삭제하는 작업은 상당한 비용이 듭니다. 신중하게 결정 해주세요!
      </p>
      <div className="flex pt-12">
        <input
          className="border border-solid border-gray-300 rounded-md w-96 text-2xl"
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ml-4 border-none cursor-pointer"
          onClick={resetTagName}
        >
          Reset Tag Name
        </button>
      </div>
      <div className="flex pt-12">
        <input
          className="border border-solid border-gray-300 rounded-md w-96 text-2xl"
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded ml-4 border-none cursor-pointer"
          onClick={resetSource}
        >
          Reset Source
        </button>
      </div>

      <div className="text-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-auto border-none cursor-pointer"
          onClick={updateTag}
        >
          Update Post
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded max-w-[125px] h-[45px] mt-4 ml-12 border-none cursor-pointer"
          onClick={deleteTag}
        >
          Delete Post
        </button>
      </div>
    </div>
  )
}
