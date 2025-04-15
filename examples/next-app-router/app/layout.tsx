import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { consoleLightTheme } from '@ultraviolet/themes'
import { ThemeRegistry } from '@ultraviolet/ui'
import { GlobalStyles } from './GlobalStyles'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ultraviolet',
  description: 'Design System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry theme={consoleLightTheme}>
          <GlobalStyles />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
