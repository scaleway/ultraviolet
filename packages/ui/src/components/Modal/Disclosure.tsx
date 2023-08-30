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
    const handleClick = () => {
      handleOpen()
    }

    element?.addEventListener('click', handleClick)

    return () => {
      element?.removeEventListener('click', handleClick)
    }
  }, [handleOpen, disclosureRef])

  if (typeof disclosure === 'function') {
    return disclosure({
      visible,
      onClose: handleClose,
      toggle,
      onOpen: handleOpen,
      modalId: id,
    })
  }

  if (isValidElement(disclosure)) {
    return cloneElement(disclosure, {
      ...disclosure.props,
      ref: disclosureRef,
    } as unknown as PropsWithRef<typeof disclosure>)
  }

  return null
}
