import { NextResponse } from 'next/server'
import { getDocsCache } from '@/service/Firebase_fn/collection'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    return getDocsCache('logs').then((data) =>
      NextResponse.json(
        { status: 'success', data, message: '로그 조회에 성공했습니다.' },
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
      { status: 'failure', data: null, message: '로그 조회에 실패했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}
