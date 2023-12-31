import { NextRequest, NextResponse } from 'next/server'
import { deleteDocument, getDocument } from '@/service/firebase/collection'
import { revalidatePath } from 'next/cache'

type Segments = {
  params: { id: string }
}
// * 로그 조회
export async function GET(_request: NextRequest, { params }: Segments) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { state: 'failure', data: null, message: '존재하지 않는 아이디입니다.' },
        {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }

    return getDocument('logs', params.id).then((data) => {
      return NextResponse.json(
        {
          state: 'success',
          data,
          message: '로그 조회에 성공했습니다.'
        },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    })
  } catch (error) {
    return NextResponse.json(
      { state: 'failure', data: null, message: '로그 조회를 실패했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}

export type DeleteRequest = {
  logId: string
  thumbnailId?: string
  storagePath: string
}

// * 로그 삭제
export async function POST(request: Request, { params }: Segments) {
  try {
    await deleteDocument('logs', params.id)

    // * 캐시 삭제
    // revalidateTag(LOGS_TAG)
    revalidatePath('/')

    return NextResponse.json(
      { state: 'success', data: null, message: '로그가 삭제되었습니다.' },
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
      { state: 'failure', data: null, message: '로그를 삭제하지 못했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}
