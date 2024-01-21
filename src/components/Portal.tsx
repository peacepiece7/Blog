'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
interface ModalProps {
  children: React.ReactNode
}

export function Portal({ children }: ModalProps) {
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
  }, [])

  if (!isMount) return null

  const node = document.getElementById('portal') as HTMLDivElement
  return createPortal(children, node)
}
