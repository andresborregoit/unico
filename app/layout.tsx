import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const bebasNeue = Bebas_Neue({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-bebas',
})

export const metadata: Metadata = {
  title: 'UNICO | Underground Streetwear',
  description: 'Premium underground streetwear from Buenos Aires. Brutalist fashion for the modern culture.',
  keywords: ['streetwear', 'fashion', 'underground', 'Buenos Aires', 'brutalist', 'hip hop'],
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
