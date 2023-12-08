// import { getDocCache } from '@/service/Firebase_fn/collection'
// import { NextRequest, NextResponse } from 'next/server'

// type Context = {
//   params: { id: string }
// }
// export async function GET(_: NextRequest, ctx: Context) {
//   if (!ctx.params.id) return new Response('id가 없습니다.', { status: 404 })
//   return getDocCache('thumbnails', ctx.params.id).then((data) => NextResponse.json(data))
// }
