'use client'
import { useScroll } from '@/hooks/useScroll'

export function ScrollToTop() {
  const [scroll] = useScroll()

  return (
    <div
      className={`fixed bottom-12 right-12 transition-all ease-in-out drop-shadow-2xl rounded-xl hover:scale-110 bg-white
      ${scroll.y > 300 ? ' opacity-100' : '  opacity-0 invisible'}`}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <div className="flex md:w-[50px] md:h-[50px] h-[40px] w-[40px] justify-center items-center cursor-pointer">
        Top
      </div>
    </div>
  )
}
