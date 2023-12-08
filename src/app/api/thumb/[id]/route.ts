import { LOGS_TAG } from '@/constants/tag'
import { deleteDocCache } from '@/service/Firebase_fn/collection'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

interface Context {
  params: { id: string }
}

// * 썸네일 삭제
export async function POST(request: Request, ctx: Context) {
  try {
    if (!ctx.params.id)
      return NextResponse.json(
        { status: 'failure', message: '잘못된 요청입니다.', data: null },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    await deleteDocCache('thumbnails', ctx.params.id)
    revalidateTag(LOGS_TAG)

    return NextResponse.json(
      { state: 'success', data: null, message: '썸네일이 삭제되었습니다.' },
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
      { state: 'failure', data: null, message: '썸네일을 삭제하지 못했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}
