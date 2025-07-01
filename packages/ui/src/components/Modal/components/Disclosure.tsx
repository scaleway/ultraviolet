'use client'

import { cloneElement, isValidElement, useEffect, useMemo } from 'react'
import type { DisclosureProps } from '../types'

export const Disclosure = ({
  disclosure,
  handleOpen,
  visible,
  handleClose,
  toggle,
  id,
  ref,
}: DisclosureProps) => {
  useEffect(() => {
    const element = ref.current
    element?.addEventListener('click', handleOpen)

    return () => {
      element?.removeEventListener('click', handleOpen)
    }
  }, [handleOpen, ref])

  const finalDisclosure = useMemo(() => {
    if (typeof disclosure === 'function') {
      return disclosure({
        visible,
        toggle,
        modalId: id,
        close: handleClose,
        show: handleOpen,
      })
    }

    return disclosure
  }, [disclosure, handleOpen, handleClose, id, toggle, visible])

  if (!isValidElement(finalDisclosure)) {
    return null
  }

  return cloneElement(finalDisclosure, {
    ref,
    'aria-controls': id,
    'aria-haspopup': 'dialog',
  } as unknown as typeof disclosure)
}
