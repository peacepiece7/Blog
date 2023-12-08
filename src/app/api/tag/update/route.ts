import { Tag } from '@/models'
import { NextResponse } from 'next/server'
import { setDocument } from '@/service/firebase/collection'
import { revalidatePath, revalidateTag } from 'next/cache'
import { LOGS_TAG } from '@/constants/tag'

// * Update Tag API
export async function POST(request: Request) {
  try {
    const tag: Tag = await request.json()
    const { id, ...tagData } = tag
    await setDocument<Omit<Tag, 'id'>>('tags', id, tagData)
    // * 캐시 삭제
    // revalidateTag(LOGS_TAG)
    revalidatePath('/')
    return NextResponse.json(
      { state: 'success', data: null, message: '태그가 수정되었습니다.' },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { state: 'failure', data: null, message: '태그를 수정하지 못했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}
