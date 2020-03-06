import { useState, useEffect } from 'react'
import { copy } from '../helpers/clipboard'

export const useCopyToClipboard = (resetStateAfter = 5000) => {
  const [isCopied, setIsCopied] = useState(false)

  const reset = () => setIsCopied(false)

  useEffect(() => {
    let timeout
    if (resetStateAfter > 0 && isCopied) {
      timeout = setTimeout(() => reset(), resetStateAfter)
    }
    return () => timeout && clearTimeout(timeout)
  }, [isCopied, resetStateAfter])

  return [
    isCopied,
    text => {
      const didCopy = copy(text)
      setIsCopied(didCopy)
    },
    reset,
  ]
}
