import { deleteDocument, getDocument } from '@/service/firebase/collection'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

type Segments = {
  params: { id: string }
}

// * 태그 조회
export async function GET(_request: NextRequest, { params }: Segments) {
  try {
    if (!params.id)
      return NextResponse.json(
        { state: 'failure', data: null, message: '존재하지 않는 아이디입니다.' },
        { status: 404 }
      )
    return getDocument('tags', params.id).then((data) =>
      NextResponse.json(
        { state: 'success', data, message: '태그 조회에 성공했습니다.' },
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
      { state: 'failure', data: null, message: '태그 조회를 실패했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}

// * 태그 삭제
export async function POST(_request: Request, { params }: Segments) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { status: 'failure', message: '잘못된 요청입니다.', data: null },
        {
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }
    await deleteDocument('tags', params.id)
    // * 캐시 삭제
    // revalidatePath('/')
    return NextResponse.json(
      { state: 'success', data: null, message: '태그가 삭제되었습니다.' },
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
      { state: 'failure', data: null, message: '태그를 삭제하지 못했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}
