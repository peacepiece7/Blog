'use client'
import { Portal } from '../Portal'

interface DrawerProps {
  children: React.ReactNode
  onClose: VoidFunction
  open: boolean
}

export function Drawer({ children, onClose, open }: DrawerProps) {
  return (
    <Portal>
      <div
        className={`fixed top-0 z-50 ${open ? 'w-full h-full' : 'w-0'} bg-[rgba(0,0,0,0.1)]`}
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
      >
        <div
          className={`max-h-full bg-white z-20 border-black border-solid transition-all overflow-scroll
        ${open ? 'w-[400px] border-[1px]' : 'border-0 w-0'}`}
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}
