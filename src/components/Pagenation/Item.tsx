import { PagenationItem } from './Items'
import Link from 'next/link'
import Image from 'next/image'
import { randomBrightColor } from '@/utils'

interface ItemProps {
  item: PagenationItem
}
export default function Item({ item }: ItemProps) {
  return (
    <div className="flex hover:drop-shadow-xl p-4 transition ease-in-out bg-white rounded-xl mt-12">
      <div className="pb-4 flex-1">
        <Link prefetch={false} href={item.url ? item.url : '/'}>
          {item.svg && (
            <div
              className="w-[120px] h-[120px] flex justify-center items-center rounded-md overflow-hidden"
              dangerouslySetInnerHTML={{ __html: item.svg }}
            />
          )}
          {!item.svg && <Image src="/loading.svg" width={125} height={125} alt="default icon" />}
          <h2 className="text-3xl pt-4">{item.title}</h2>
          {item.tags && item.tags.length !== 0 && (
            <p className="text-end pt-4">
              Tags :
              {item.tags.map((tag) => {
                const rgb = randomBrightColor(tag)
                return (
                  <span style={{ backgroundColor: rgb }} className="p-1 ml-1 rounded-md text-white" key={tag}>
                    {tag}
                  </span>
                )
              })}
            </p>
          )}
          {item.createdAt && <p className="text-end pt-4">{`Created At : ${item.createdAt}`}</p>}
        </Link>
      </div>
    </div>
  )
}
