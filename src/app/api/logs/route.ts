import { NextResponse } from 'next/server'
import { getDocsCache } from '@/service/Firebase_fn/collection'

export async function GET() {
  return getDocsCache('logs').then((data) => NextResponse.json(data))
}
