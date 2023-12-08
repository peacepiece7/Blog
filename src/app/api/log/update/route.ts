import { LogDocument, Log } from '@/models'
import { NextResponse } from 'next/server'
import { setDocument } from '@/service/firebase/collection'
import { revalidatePath } from 'next/cache'

// * Update Log API
export async function POST(request: Request) {
  try {
    const log: Log = await request.json()
    const { id, ...logData } = log
    await setDocument<LogDocument>('logs', id, logData)
    // * 캐시 삭제
    // revalidateTag(LOGS_TAG)
    revalidatePath('/')
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
