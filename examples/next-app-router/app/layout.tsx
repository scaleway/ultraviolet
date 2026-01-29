// oxlint-disable import/no-unassigned-import
import '@ultraviolet/fonts/fonts.css'
import '@ultraviolet/ui/styles'
import '@ultraviolet/themes/global'
import './globals.css'
import { ThemeRegistry } from '@ultraviolet/nextjs'
import {
  consoleDarkerTheme,
  consoleDarkTheme,
  consoleLightTheme,
  generateObjectStyleFromTheme,
} from '@ultraviolet/themes'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import type { ReactNode } from 'react'

// oxlint-disable-next-line react/only-export-components
export const metadata: Metadata = {
  description: 'Design System',
  title: 'Ultraviolet',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  // Generate the SSR theme CSS string
  const cookieStore = await cookies()
  const themePreference = cookieStore.get('theme-preference')?.value || 'light'

  const currentTheme =
    {
      light: consoleLightTheme,
      dark: consoleDarkTheme,
      darker: consoleDarkerTheme,
    }[themePreference] ?? consoleLightTheme

  return (
    <html lang="en">
      <head>
        <link
          as="font"
          crossOrigin="anonymous"
          href="https://assets.scaleway.com/fonts/inter/Inter-Medium.woff2"
          rel="preload"
          type="font/woff2"
        />
        <style id="uv-current-theme" rel="preload">
          {generateObjectStyleFromTheme(currentTheme)}
        </style>
      </head>
      <body>
        <ThemeRegistry theme={consoleLightTheme}>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
