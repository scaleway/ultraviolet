import { useState, useEffect } from 'react'

export const useDelayUnmount = (open?: boolean, delayTime?: number) => {
  const [shouldRender, setShouldRender] = useState(open)

  useEffect(() => {
    if (open && !shouldRender) {
      setShouldRender(true)

      return undefined
    }
    if (!open && shouldRender) {
      const timeoutId = setTimeout(() => setShouldRender(false), delayTime)

      return () => clearTimeout(timeoutId)
    }

    return undefined
  }, [open, delayTime, shouldRender])

  return shouldRender
}
