import { useEffect, useMemo, useState } from 'react'

/**
 * Check if the user prefers a dark color scheme in their system settings
 */
export function usePrefersDarkMode() {
  const supportsMatchMedia = useMemo(() => typeof globalThis.matchMedia === 'function', [])

  const [prefersDarkMode, setPrefersDarkMode] = useState(
    supportsMatchMedia ? globalThis.matchMedia('(prefers-color-scheme: dark)').matches : false,
  )

  useEffect(() => {
    if (!supportsMatchMedia) {
      return () => {
        /* empty */
      }
    }

    const mediaQueryList = globalThis.matchMedia('(prefers-color-scheme: dark)')

    const listener = (event: MediaQueryListEvent) => {
      setPrefersDarkMode(event.matches)
    }

    mediaQueryList.addEventListener('change', listener)
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [supportsMatchMedia])

  return prefersDarkMode
}
