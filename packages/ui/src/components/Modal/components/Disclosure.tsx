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
  }, [handleOpen, ref, disclosure])

  const finalDisclosure = useMemo(() => {
    if (typeof disclosure === 'function') {
      return disclosure({
        close: handleClose,
        modalId: id,
        show: handleOpen,
        toggle,
        visible,
      })
    }

    return disclosure
  }, [disclosure, handleOpen, handleClose, id, toggle, visible])

  if (!isValidElement(finalDisclosure)) {
    return null
  }

  return cloneElement(finalDisclosure, {
    'aria-controls': id,
    'aria-haspopup': 'dialog',
    ref,
  } as unknown as typeof disclosure)
}
