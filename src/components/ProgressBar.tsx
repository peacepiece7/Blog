'use client'
import { useScroll } from '@/hooks/useScroll'
import { paintProgressBar } from '@/utils'
import React, { useEffect } from 'react'

export default function ProgressBar() {
  const scroll = useScroll()

  useEffect(() => {
    paintProgressBar('progress-container', 'progress-bar')
  }, [scroll])

  return (
    <div id="progress-container" className="fixed top-0 bg-slate-100 h-2 w-full z-10 invisible">
      <div id="progress-bar" className="h-2 w-[0%] bg-slate-500" />
    </div>
  )
}
