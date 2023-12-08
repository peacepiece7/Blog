import { NextResponse } from 'next/server'
import { LogDocument } from '@/models'
import { v1 } from 'uuid'
import { addDocCache } from '@/service/Firebase_fn/collection'
import { uploadContentDataCache } from '@/service/Firebase_fn/storage'
import { revalidateTag } from 'next/cache'
import { LOGS_TAG } from '@/constants/tag'

// * 새로운 로그 추가
export async function POST(request: Request) {
  try {
    const log = (await request.json()) as AddLogRequest
    const fileName = `${log.fileName}-${v1()}.md`

    // * markdown 저장
    await uploadContentDataCache(`markdown/${fileName}`, log.content)

    // * 로그 저장
    const logDoc: LogDocument = {
      createdAt: log.createdAt,
      lastModifiedAt: log.lastModifiedAt,
      storagePath: `markdown/${fileName}`,
      tags: log.tags,
      thumbnailId: log.thumbnailId,
      title: log.title
    }
    await addDocCache<LogDocument>('logs', logDoc)

    // * 캐시 삭제
    revalidateTag(LOGS_TAG)

    return NextResponse.json(
      { state: 'success', data: null, message: '컨텐츠가 추가되었습니다.' },
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
      { state: 'failure', data: null, message: '컨텐츠를 추가하지 못했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
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
