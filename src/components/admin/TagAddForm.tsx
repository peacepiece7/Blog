'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TagAddForm() {
  const [name, setName] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const router = useRouter()

  const addTag = async () => {
    const res: ResponseBase<null> = await fetch('/api/tag', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        thumbnail: thumbnail
      })
    }).then((res) => res.json())

    if (res.state === 'failure') alert(res.message)
    router.push('/admin/board/tags/1')
  }

  return (
    <div>
      <form className="flex flex-col pl-8" onSubmit={addTag}>
        <input
          className="border border-solid border-gray-300 rounded-md p-1 mt-4 w-96 text-2xl"
          type="text"
          placeholder="Enter a tag name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-solid border-gray-300 rounded-md p-1 mt-4 w-96 text-2xl"
          type="text"
          placeholder="Enter a svg icon to svg tag"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold max-w-[150px] py-2 px-4 rounded mt-4 border-none cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
