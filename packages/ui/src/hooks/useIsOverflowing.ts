import type { MutableRefObject } from 'react'
import { useEffect, useState } from 'react'

/**
 * This hook checks if the element has overflow based on the offsetWidth and scrollWidth of the element.
 */
export const useIsOverflowing = (
  ref: MutableRefObject<HTMLElement | HTMLDivElement | undefined | null>,
  callback?: (hasOverflow: boolean) => void,
) => {
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) {
        return
      }

      const element = ref.current

      const hasOverflow = element.clientWidth < element.scrollWidth
      setIsOverflowing(hasOverflow)
      if (callback) {
        callback(hasOverflow)
      }
    }

    // This will add the function into the browser event queue after the DOM is painted
    // which is needed to get the correct offsetWidth and scrollWidth
    const timeout = setTimeout(() => handleResize(), 0)

    // Listen for resize events
    window.addEventListener('resize', handleResize)

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout)
    }
  }, [ref, callback])

  return isOverflowing
}
