import type { Metadata } from 'next'
// oxlint-disable-next-line import/no-unassigned-import
import './globals.css'
import { ThemeRegistry } from '@ultraviolet/nextjs'
import { consoleLightTheme } from '@ultraviolet/themes'
import type { ReactNode } from 'react'
import '@ultraviolet/fonts/fonts.css'
import '@ultraviolet/ui/styles'
import '@ultraviolet/themes/global'

export const metadata: Metadata = {
  description: 'Design System',
  title: 'Ultraviolet',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry theme={consoleLightTheme}>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
