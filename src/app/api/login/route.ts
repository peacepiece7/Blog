import { NextResponse } from 'next/server'

// * 로그인 요청
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = body.id
    const password = body.password

    if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { state: 'success', isAdmin: true, message: '관리자 로그인에 성공했습니다.' },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }
    return NextResponse.json(
      { state: 'failure', isAdmin: false, message: '관리자 로그인에 실패했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { isAdmin: false, state: 'failure', message: '관리자 로그인에 실패했습니다.' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
}
