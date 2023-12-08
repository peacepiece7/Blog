import { deleteContentDataCache } from '@/service/Firebase_fn/storage'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { LOGS_TAG } from '@/constants/tag'

type Context = {
  params: { path: string; folder: string }
}
// * 컨텐츠 삭제
export async function POST(request: Request, ctx: Context) {
  try {
    console.log("API : deleteContentDataCache('%s')", `${ctx.params.folder}/${ctx.params.path}`)

    // * 저장소에서 markdown 파일 삭제
    await deleteContentDataCache(`${ctx.params.folder}/${ctx.params.path}`)

    // * 캐시 삭제
    revalidateTag(LOGS_TAG)
    return NextResponse.json(
      { state: 'success', data: null, message: '컨텐츠가 삭제되었습니다.' },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  } catch (error) {
    console.error('API :', error)
    return NextResponse.json(
      { state: 'failure', data: null, message: '컨텐츠를 삭제하지 못했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}
