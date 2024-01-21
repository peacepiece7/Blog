import { JetBrains_Mono } from 'next/font/google'
import Header from '@/components/Header/Header'
import '@/styles/global.css'

const inter = JetBrains_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'Web Log',
  description: 'Playground for me'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kor" className={`${inter.className}`}>
      <body>
        <div id="portal" className="min-h-[100dvh]">
          {/* @ts-ignore */}
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
