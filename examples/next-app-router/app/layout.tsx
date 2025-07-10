import type { Metadata } from 'next'
import './globals.css'
import { ThemeRegistry } from '@ultraviolet/nextjs'
import { consoleLightTheme } from '@ultraviolet/themes'
import { ReactNode } from 'react'
import { GlobalStyles } from './GlobalStyles'

export const metadata: Metadata = {
  title: 'Ultraviolet',
  description: 'Design System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry theme={consoleLightTheme}>
          <GlobalStyles />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
