import { useState, useEffect } from 'react'

export const useDelayUnmount = (open?: boolean, delayTime?: number) => {
  const [shouldRender, setShouldRender] = useState(open)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    if (open && !shouldRender) {
      setShouldRender(true)
    } else if (!open && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime)
    }
    return () => clearTimeout(timeoutId)
  }, [open, delayTime, shouldRender])

  return shouldRender
}
