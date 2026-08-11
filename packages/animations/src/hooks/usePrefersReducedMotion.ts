import { useEffect, useMemo, useState } from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'

/**
 * Check if the user has enabled reduced motion in their system settings.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const prefersReducedMotion = usePrefersReducedMotion()
 *
 *   return (
 *     <div style={{ animation: prefersReducedMotion ? 'none' : 'slideIn 1s' }}>
 *       Content
 *     </div>
 *   )
 * }
 * ```
 */
export function usePrefersReducedMotion() {
  const supportsMatchMedia = useMemo(() => typeof window !== 'undefined' && typeof window.matchMedia === 'function', [])

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    supportsMatchMedia ? !window.matchMedia(QUERY).matches : true,
  )

  useEffect(() => {
    if (!supportsMatchMedia) {
      return
    }

    const mediaQueryList = window.matchMedia(QUERY)

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches)
    }

    mediaQueryList.addEventListener('change', listener)
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [supportsMatchMedia])

  return prefersReducedMotion
}
