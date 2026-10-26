import { useEffect, useState } from 'react'

export const useDelayUnmount = (open?: boolean, delayTime?: number) => {
  const [shouldRender, setShouldRender] = useState(open)

  if (open && !shouldRender) {
    setShouldRender(true)
  }

  useEffect(() => {
    if (!open && shouldRender) {
      const timeoutId = setTimeout(() => setShouldRender(false), delayTime)

      return () => clearTimeout(timeoutId)
    }

    return undefined
  }, [open, delayTime, shouldRender])

  return shouldRender
}
