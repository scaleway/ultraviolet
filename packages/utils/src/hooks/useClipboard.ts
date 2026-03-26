import { useState, useEffect, useRef, useCallback } from 'react'

type IOptions =
  | {
      /**
       * Reset the status after a certain number of milliseconds. This is useful
       * for showing a temporary success message.
       */
      successDuration?: number
      onError?: (error: unknown) => void
    }
  | undefined

export function useClipboard(
  text: string,
  options?: IOptions,
): [boolean, () => Promise<void>] {
  const [isCopied, setIsCopied] = useState(false)
  const successDuration = options && options.successDuration

  const paramsRef = useRef({ text, options })

  useEffect(() => {
    let id: number | undefined
    if (isCopied && successDuration) {
      id = setTimeout(() => {
        setIsCopied(false)
      }, successDuration)
    }
    return () => {
      clearTimeout(id)
    }
  }, [isCopied, successDuration])

  const setInternalIsCopied = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(paramsRef.current?.text)
      setIsCopied(true)
    } catch (error: unknown) {
      paramsRef.current?.options?.onError?.(error)
      setIsCopied(false)
    }
  }, [])

  return [isCopied, setInternalIsCopied]
}
