import { useEffect, useState } from 'react'

// copy copies a text to the user clipboard.
export function copy(text) {
  let success = false
  const { body } = document

  if (body) {
    // add the text to a hidden node
    const node = document.createElement('span')
    node.textContent = text
    node.style.opacity = '0'
    node.style.position = 'absolute'
    node.style.whiteSpace = 'pre-wrap'
    body.appendChild(node)

    // select the text
    const selection = window.getSelection()
    selection.removeAllRanges()
    const range = document.createRange()
    range.selectNodeContents(node)
    selection.addRange(range)

    // attempt to copy
    try {
      document.execCommand('copy')
      success = true
    } catch (e) {
      // Nothing
    }

    // remove selection and node
    selection.removeAllRanges()
    body.removeChild(node)
  }

  return success
}

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
