import type { PropsWithRef } from 'react'
import { cloneElement, createRef, useEffect } from 'react'
import type { DisclosureProps } from './types'

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

  if (typeof disclosure === 'function') {
    const element = disclosure({
      visible,
      onClose: handleClose,
      toggle,
      onOpen: handleOpen,
      modalId: id,
      hide: handleClose,
    })

    return cloneElement(element, {
      ref: disclosureRef,
      'aria-controls': id,
      'aria-haspopup': 'dialog',
    } as unknown as PropsWithRef<typeof disclosure>)
  }

  if (!disclosure) {
    return null
  }

  return cloneElement(disclosure, {
    ref: disclosureRef,
    'aria-controls': id,
    'aria-haspopup': 'dialog',
  } as unknown as PropsWithRef<typeof disclosure>)
}
