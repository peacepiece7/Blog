import { NextResponse } from 'next/server'
import { getDocsCache } from '@/service/Firebase_fn/collection'

export async function GET() {
  return getDocsCache('tags').then((data) => NextResponse.json(data))
}
