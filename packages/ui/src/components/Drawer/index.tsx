'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps, RefObject } from 'react'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import type { ModalProps } from '../Modal'
import { Modal } from '../Modal'
import type { ModalState } from '../Modal/types'
import { Separator } from '../Separator'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { DrawerContent } from './DrawerContent'
import type { SizeProp } from './styles.css'
import { drawerStyle } from './styles.css'

type DrawerProps = Pick<
  ComponentProps<typeof Modal>,
  | 'ariaLabel'
  | 'children'
  | 'className'
  | 'data-testid'
  | 'disclosure'
  | 'hideOnClickOutside'
  | 'hideOnEsc'
  | 'id'
  | 'onClose'
  | 'open'
  | 'isClosable'
  | 'style'
> & {
  header?: ModalProps['children']
  size?: SizeProp
  /**
   * Fixed info at the bottom of the
   */
  footer?: ModalProps['children']
  separator?: boolean
  noPadding?: boolean
  push?: RefObject<HTMLDivElement | null> | 'body'
}

export const BaseDrawer = ({
  size = 'medium',
  onClose,
  open = false,
  header,
  footer,
  disclosure,
  children,
  ariaLabel,
  className,
  'data-testid': dataTestId,
  hideOnClickOutside,
  hideOnEsc,
  id,
  isClosable,
  push,
  separator = true,
  noPadding = false,
  style,
}: DrawerProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const onOpenPush = useCallback(() => {
    const targetElement = push === 'body' ? document?.body : push?.current

    if (targetElement && push) {
      targetElement.dataset['drawer'] = size
      if (!targetElement.classList.contains(drawerStyle.contentToPushStyle)) {
        targetElement.classList.add(drawerStyle.contentToPushStyle)
      }
    }
  }, [size, push])

  const onClosePush = useCallback(() => {
    const targetElement = push === 'body' ? document?.body : push?.current

    if (targetElement && push) {
      targetElement.dataset['drawer'] = 'none'
      targetElement.classList.remove(drawerStyle.contentToPushStyle)
    }
  }, [push])

  // Add the push style when the drawer is open by default
  useEffect(() => {
    if (open) {
      onOpenPush()
    }
  }, [onOpenPush, open])

  const computeHeader = (modalProps: ModalState) => {
    if (typeof header === 'string') {
      return (
        <Text
          as="h2"
          className={drawerStyle.header}
          prominence="default"
          sentiment="neutral"
          variant="headingSmallStrong"
        >
          {header}
        </Text>
      )
    }
    if (typeof header === 'function') {
      return (
        <Text
          as="h2"
          className={drawerStyle.header}
          prominence="default"
          sentiment="neutral"
          variant="headingSmallStrong"
        >
          {header(modalProps)}
        </Text>
      )
    }

    return header
  }

  useLayoutEffect(() => {
    const targetElement = push === 'body' ? document?.body : push?.current

    return () => {
      if (targetElement && push) {
        targetElement.classList.remove(drawerStyle.contentToPushStyle)
      }
    }
  }, [open, push, size])

  return (
    <Modal
      ariaLabel={ariaLabel}
      backdropClassName="backdrop-drawer"
      className={cn(
        className,
        drawerStyle.drawer[size],
        drawerStyle.base,
        push ? drawerStyle.push : '',
      )}
      data-size={size}
      data-testid={dataTestId}
      disclosure={disclosure}
      hideOnClickOutside={hideOnClickOutside}
      hideOnEsc={hideOnEsc}
      id={id}
      isClosable={isClosable}
      isDrawer
      onBeforeClose={onClosePush}
      onClose={onClose}
      onOpen={onOpenPush}
      open={open}
      placement="top-right"
      ref={modalRef}
      size={size}
      style={style}
    >
      {modalProps => {
        const content =
          typeof children === 'function' ? children(modalProps) : children

        return (
          <Stack className={drawerStyle.contentWrapper} gap={2}>
            {computeHeader(modalProps)}
            {separator ? <Separator /> : null}
            <div className={drawerStyle.childrenWrapper}>
              {noPadding ? content : <DrawerContent>{content}</DrawerContent>}
            </div>
            <Stack className={drawerStyle.footer}>
              {typeof footer === 'function' ? footer(modalProps) : footer}
            </Stack>
          </Stack>
        )
      }}
    </Modal>
  )
}

export const Drawer = Object.assign(BaseDrawer, {
  Content: DrawerContent,
})
