import { deleteStorageContent } from '@/service/firebase/storage'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

type Segments = {
  params: { path: string; folder: string }
}
// * 컨텐츠 삭제
export async function POST(_request: Request, { params }: Segments) {
  try {
    console.log("API : deleteContentDataCache('%s')", `${params.folder}/${params.path}`)

    // * 저장소에서 markdown 파일 삭제
    await deleteStorageContent(`${params.folder}/${params.path}`)

    // * 캐시 삭제
    // revalidateTag(LOGS_TAG)
    revalidatePath('/')
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
