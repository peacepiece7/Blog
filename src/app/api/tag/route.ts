import { NextResponse } from 'next/server'
import { Tag, ThumbnailDocument } from '@/models'
import { addDocument } from '@/service/firebase/collection'
import { revalidatePath, revalidateTag } from 'next/cache'
import { LOGS_TAG } from '@/constants/tag'

// * Add Tag API
export async function POST(request: Request) {
  try {
    const tag: AddTagsRequest = await request.json()

    // * 썸네일 저장
    const res = await addDocument<ThumbnailDocument>('thumbnails', {
      name: `${tag.name}_logo`,
      source: tag.thumbnail
    })
    const thumbId = res.id

    // * 태그 저장
    await addDocument<Omit<Tag, 'id'>>('tags', {
      name: tag.name,
      thumbnailId: thumbId
    })
    // * 캐시 삭제
    // revalidateTag(LOGS_TAG)
    // revalidatePath('/')
    return NextResponse.json({ state: 'success', data: null, message: '태그가 추가되었습니다.' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', data: null, meessage: '태그를 추가하지 못했습니다.' }, { status: 500 })
  }
}

export type AddTagsRequest = {
  id: string
  name: string
  thumbnail: string
}
