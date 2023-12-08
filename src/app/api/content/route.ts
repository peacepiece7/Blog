import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'
import { LOGS_TAG } from '@/constants/tag'
import { getStorageContent, updateStorageContent } from '@/service/firebase/storage'

// * 컨텐츠 내용 조회
export async function GET(request: NextRequest) {
  if (!request.url)
    return NextResponse.json(
      { status: 'failure', message: '잘못된 요청입니다.', data: null },
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  const url = new URL(request.url)
  const params = new URLSearchParams(url.searchParams)
  const path = params.get('path')

  if (!path)
    return NextResponse.json(
      { status: 'failure', message: '잘못된 요청입니다.', data: null },
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )

  return getStorageContent(path).then((content) =>
    NextResponse.json(
      {
        status: 'success',
        message: '컨탠츠를 불러왔습니다.',
        data: content
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  )
}

// * 컨텐츠 내용 수정
export async function POST(request: Request) {
  try {
    const { storagePath, content }: UpdateContentRequest = await request.json()
    await updateStorageContent(storagePath, content)
    // * 캐시 삭제
    // revalidateTag(LOGS_TAG)
    revalidatePath('/')

    return NextResponse.json(
      { status: 'success', message: '컨텐츠가 수정되었습니다.', data: null },
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
      { status: 'failure', message: '컨텐츠를 수정하지 못했습니다.', data: null },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}

export type UpdateContentRequest = {
  storagePath: string
  content: string
}

export type AddLogRequest = {
  title: string
  tags: string[]
  createdAt: string
  lastModifiedAt: string
  thumbnailId?: string
  content: string
  fileName: string
}
