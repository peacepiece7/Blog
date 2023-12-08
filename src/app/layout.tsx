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
