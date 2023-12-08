import { Thumb } from '@/models'
import { getDocCache } from '@/service/Firebase_fn/collection'
import { NextResponse } from 'next/server'
import { setDocCache } from '@/service/Firebase_fn/collection'
import { revalidateTag } from 'next/cache'
import { LOGS_TAG } from '@/constants/tag'

// * 썸네일 조회
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const params = new URLSearchParams(url.searchParams)
    const id = params.get('id')
    if (!id)
      return NextResponse.json(
        { status: 'failure', message: '잘못된 요청입니다.', data: null },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )

    return getDocCache('thumbnails', id).then((data) =>
      NextResponse.json(
        { state: 'success', data, message: '썸네일 조회에 성공했습니다.' },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { state: 'failure', data: null, message: '썸네일 조회를 실패했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}

// * 썸네일 업데이트
export async function POST(request: Request) {
  try {
    const thumb: Thumb = await request.json()
    const { id, ...thumbData } = thumb
    await setDocCache<Omit<Thumb, 'id'>>('thumbnails', id, thumbData)
    revalidateTag(LOGS_TAG)

    return NextResponse.json(
      { state: 'success', data: null, message: '썸네일이 수정되었습니다.' },
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
      { state: 'failure', data: null, message: '썸네일을 수정하지 못했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}
