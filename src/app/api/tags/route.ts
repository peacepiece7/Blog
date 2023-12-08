import { NextResponse } from 'next/server'
import { getDocuments } from '@/service/firebase/collection'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return getDocuments('tags').then((data) =>
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
