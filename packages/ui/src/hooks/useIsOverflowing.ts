import { useEffect, useState } from 'react'

type UseIsOverflowingOptions = {
  callback?: (hasOverflow: boolean) => void
  enabled?: boolean
}

/**
 * Check if the element has overflow based on the clientWidth and scrollWidth of the element.
 */
export const useIsOverflowing = ({ callback, enabled = true }: UseIsOverflowingOptions = {}) => {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    if (!enabled || !element || typeof ResizeObserver === 'undefined') {
      return
    }

    const handleResize = () => {
      const hasOverflow = element.scrollWidth > element.clientWidth

      setIsOverflowing(hasOverflow)
      if (callback) {
        callback(hasOverflow)
      }
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [element, callback, enabled])

  return [setElement, isOverflowing] as const
}
