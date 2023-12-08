import { LogDocument, Log } from '@/models'
import { NextResponse } from 'next/server'
import { setDocCache } from '@/service/Firebase_fn/collection'
import { revalidateTag } from 'next/cache'
import { LOGS_TAG } from '@/constants/tag'

// * Update Log API
export async function POST(request: Request) {
  try {
    const log = (await request.json()) as Log
    const { id, ...logData } = log
    await setDocCache<LogDocument>('logs', id, logData)
    // * 캐시 삭제
    revalidateTag(LOGS_TAG)

    return NextResponse.json(
      { state: 'success', data: null, message: '로그가 수정되었습니다.' },
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
      { state: 'failure', data: null, message: '로그를 수정하지 못했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}
