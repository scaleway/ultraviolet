'use client'

import createCache from '@emotion/cache'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import { useServerInsertedHTML } from 'next/navigation'
import type { ComponentProps, ReactNode } from 'react'
import { useState } from 'react'

type ThemeRegistryProps = {
  children: ReactNode
  theme: ComponentProps<typeof ThemeProvider>['theme']
}

/**
 * ThemeRegistry is a component that provides a theme to its children.
 * This solution is provided to work with Next.js app router.
 */
export const ThemeRegistry = ({ children, theme }: ThemeRegistryProps) => {
  const [{ cache, flush }] = useState(() => {
    const localCache = createCache({ key: 'uv' })
    localCache.compat = true
    const prevInsert = localCache.insert
    let inserted: string[] = []
    localCache.insert = (...args) => {
      const serialized = args[1]
      if (localCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }

      return prevInsert(...args)
    }
    const localFlush = () => {
      const prevInserted = inserted
      inserted = []

      return prevInserted
    }

    return { cache: localCache, flush: localFlush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  )
}
