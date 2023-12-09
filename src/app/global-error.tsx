'use client' // Error components must be Client Components
export default function Error({ error, reset }: { error: ErrorResponse; reset: () => void }) {
  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <h2 className="text-3xl">잘못된 접근입니다. 🥲</h2>
        <button className="w-30 p-2 text-xl" onClick={() => reset()}>
          다시 시도하기
        </button>
        <p className="text-red-400">{error.message}</p>
      </div>
    </div>
  )
}
