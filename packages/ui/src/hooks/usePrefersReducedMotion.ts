import { useEffect, useState } from 'react'

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    typeof window === 'undefined' ? true : !window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches)
    }

    mediaQueryList.addEventListener('change', listener)
    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [])

  return prefersReducedMotion
}
