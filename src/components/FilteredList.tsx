'use client'
import { Log, Thumb } from '@/models'
import Link from 'next/link'
import { randomBrightColor } from '@/utils'

interface FilteredListProps {
  basePath: string
  logs: Log[]
  thumbs: Thumb[]
}
export default function FilteredList({ basePath, logs, thumbs }: FilteredListProps) {
  if (!logs || !thumbs) return <div>loading...</div>

  return (
    <div>
      {logs.map((log) => {
        const thumb = thumbs.find((thumb) => log.thumbnailId === thumb.id)
        return (
          <div key={log.id} className="flex hover:drop-shadow-xl p-4 transition ease-in-out bg-white rounded-xl mt-12">
            <div className="pb-4 flex-1">
              <Link prefetch={false} href={`${basePath}/${log.id}`}>
                <div
                  className="w-[120px] h-[120px] flex justify-center items-center rounded-md overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: thumb?.source ? thumb.source : '' }}
                />
                <h2 className="text-2xl pt-4">{log.title}</h2>
                <p className="text-end pt-4">
                  Tags :
                  {log.tags.map((name) => {
                    const rgb = randomBrightColor(name)
                    return (
                      <span style={{ backgroundColor: rgb }} className="p-1 ml-1 rounded-md text-white" key={name}>
                        {name}
                      </span>
                    )
                  })}
                </p>
                <p className="text-end pt-4">{`Created At : ${log.createdAt}`}</p>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
