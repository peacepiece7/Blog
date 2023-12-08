import { NextResponse } from 'next/server'
import { addDocument } from '@/service/firebase/collection'
import { revalidatePath } from 'next/cache'

export type AddTagReqeust = {
  id: string
  name: string
  thumbnail: string
}

// * 태그 추가
export async function POST(request: Request) {
  try {
    const tag: AddTagReqeust = await request.json()
    // * 썸네일 저장
    const res = await addDocument('thumbnails', {
      name: `${tag.name}_logo`,
      source: tag.thumbnail
    })
    await addDocument('tags', {
      name: tag.name,
      thumbnailId: res.id
    })
    // * 캐시 삭제
    // revalidateTag(LOGS_TAG)
    revalidatePath('/')
    return NextResponse.json({ state: 'success', data: null, message: '태그가 추가되었습니다.' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ state: 'failure', data: null, meessage: '태그를 추가하지 못했습니다.' }, { status: 500 })
  }
}
