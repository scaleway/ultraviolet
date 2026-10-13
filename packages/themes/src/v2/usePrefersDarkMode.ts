import { useEffect, useState } from 'react'

/**
 * Check if the user prefers a dark color scheme in their system settings
 */
export function usePrefersDarkMode() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false)

  useEffect(() => {
    if (typeof globalThis.matchMedia !== 'function') {
      return () => {
        /* empty */
      }
    }

    const mediaQueryList = globalThis.matchMedia('(prefers-color-scheme: dark)')
    // oxlint-disable-next-line react/set-state-in-effect
    setPrefersDarkMode(mediaQueryList.matches)

    const listener = (event: MediaQueryListEvent) => {
      setPrefersDarkMode(event.matches)
    }

    mediaQueryList.addEventListener('change', listener)
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [])

  return prefersDarkMode
}
