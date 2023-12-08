import { getContentDataCache } from '@/service/Firebase_fn/storage'
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url'
import { NextRequest, NextResponse } from 'next/server'

type Context = {
  query: { path: string }
}
export async function GET(request: NextRequest, ctx: Context) {
  if (!request.url) return new Response('INVALID REQEUST ', { status: 400 })
  const url = new URL(request.url)
  const params = new URLSearchParams(url.searchParams)
  const path = params.get('path')

  if (!path) return new Response('PATH IS NOT DEFINED', { status: 400 })

  return getContentDataCache(path).then((content) => NextResponse.json(content))
}
