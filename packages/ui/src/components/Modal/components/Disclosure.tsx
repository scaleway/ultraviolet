'use client'

import type { PropsWithRef } from 'react'
import {
  cloneElement,
  createRef,
  isValidElement,
  useEffect,
  useMemo,
} from 'react'
import type { DisclosureProps } from '../types'

export const Disclosure = ({
  disclosure,
  handleOpen,
  visible,
  handleClose,
  toggle,
  id,
}: DisclosureProps) => {
  const disclosureRef = createRef<HTMLElement>()

  useEffect(() => {
    const element = disclosureRef.current
    element?.addEventListener('click', handleOpen)

    return () => {
      element?.removeEventListener('click', handleOpen)
    }
  }, [handleOpen, disclosureRef])

  const finalDisclosure = useMemo(() => {
    if (typeof disclosure === 'function') {
      return disclosure({
        visible,
        onClose: handleClose,
        toggle,
        onOpen: handleOpen,
        modalId: id,
        hide: handleClose,
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
    ref: disclosureRef,
    'aria-controls': id,
    'aria-haspopup': 'dialog',
  } as unknown as PropsWithRef<typeof disclosure>)
}
