import { Azeret_Mono } from 'next/font/google'

import Header from '@/components/Header'
import './globals.css'
import SWRConfigContext from '@/context/SWRConfigContext'

const AzeretMonoFont = Azeret_Mono({
  subsets: ['latin'],
  variable: '--font-azeret-mono',
  display: 'swap'
})
export const metadata = {
  title: 'Web Log',
  description: 'Playground for me'
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // getDocsPreload('tags', 'logs')
  // Root Layout의 body안에 컴포넌트를 넣지 않으면 Suspense boundary 외부로 인식된다.
  // 그로인해 SSR화면과 CSR Hydration 후 화면을 다르게 그리는 에러가 발생한다.
  // 즉 Root Layout은 body안에 컴포넌트를 넣어야 한다.
  return (
    <html lang="kor" className={`${AzeretMonoFont.className}`}>
      <body>
        <SWRConfigContext>
          <div className="min-h-[100vh]">
            {/* @ts-expect-error Async Server Component */}
            <Header />
            <main>{children}</main>
          </div>
        </SWRConfigContext>
      </body>
    </html>
  )
}
