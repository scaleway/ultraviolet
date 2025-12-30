// oxlint-disable import/no-unassigned-import
import type { Metadata } from 'next'
import './globals.css'
import { ThemeRegistry } from '@ultraviolet/nextjs'
import { consoleLightTheme } from '@ultraviolet/themes'
import type { ReactNode } from 'react'
import '@ultraviolet/fonts/fonts.css'
import '@ultraviolet/ui/styles'
import '@ultraviolet/themes/global'

// oxlint-disable-next-line react/only-export-components
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
