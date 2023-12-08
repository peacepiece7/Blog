'use client' // Error components must be Client Components

import { ErrorResponse } from '@/utils/api'

export default function Error({ error, reset }: { error: ErrorResponse; reset: () => void }) {
  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <h2 className="text-3xl">Something went wrong!</h2>
        <button className="w-30 p-2 text-xl" onClick={() => reset()}>
          Try again
        </button>
        <p className="text-red-400">{error.message}</p>
      </div>
    </div>
  )
}
