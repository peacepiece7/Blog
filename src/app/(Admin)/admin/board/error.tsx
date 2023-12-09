'use client'

/**
 * 관리자만 볼 수 있느 페이지입니다.
 */
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error)
  return (
    <div>
      <h2>로그를 확인해주세요!</h2>
      <p className="text-red-500 p-2">{error.message}</p>
      <button onClick={() => reset()}>다시 시도하기</button>
    </div>
  )
}
