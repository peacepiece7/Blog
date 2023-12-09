import { Azeret_Mono } from 'next/font/google'
import Header from '@/components/Header'
import './globals.css'

const AzeretMonoFont = Azeret_Mono({
  subsets: ['latin'],
  variable: '--font-azeret-mono',
  display: 'swap'
})
export const metadata = {
  title: 'Web Log',
  description: 'Playground for me'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kor" className={`${AzeretMonoFont.className}`}>
      <body>
        <div className="min-h-[100vh]">
          {/* @ts-ignore */}
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
