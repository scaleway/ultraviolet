import type { PropsWithRef } from 'react'
import { cloneElement, createRef, isValidElement, useEffect } from 'react'
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
    return disclosure({
      visible,
      onClose: handleClose,
      toggle,
      onOpen: handleOpen,
      modalId: id,
      hide: handleClose,
    })
  }

  if (isValidElement(disclosure)) {
    return cloneElement(disclosure, {
      ...disclosure.props,
      ref: disclosureRef,
      'aria-controls': id,
      'aria-haspopup': 'dialog',
    } as unknown as PropsWithRef<typeof disclosure>)
  }

  return null
}
