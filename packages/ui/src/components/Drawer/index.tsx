'use client'

import { cn } from '@ultraviolet/utils'
import type { ComponentProps, ReactNode, RefObject } from 'react'
import { useCallback, useLayoutEffect, useRef } from 'react'
import type { ModalProps } from '../Modal'
import { Modal } from '../Modal'
import type { ModalState } from '../Modal/types'
import { Separator } from '../Separator'
import { Stack } from '../Stack'
import { Text } from '../Text'
import type { SizeProp } from './styles.css'
import {
  contentToPushStyle,
  drawer,
  drawerBase,
  drawerChildrenWrapper,
  drawerContent,
  drawerContentWrapper,
  drawerFooter,
  drawerHeader,
  drawerPush,
} from './styles.css'

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

export const DrawerContent = ({ children }: { children: ReactNode }) => (
  <div className={drawerContent}>{children}</div>
)

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
      if (!targetElement.classList.contains(contentToPushStyle)) {
        targetElement.classList.add(contentToPushStyle)
      }
    }
  }, [size, push])

  const onClosePush = useCallback(() => {
    const targetElement = push === 'body' ? document?.body : push?.current

    if (targetElement && push) {
      targetElement.dataset['drawer'] = 'none'
      targetElement.classList.remove(contentToPushStyle)
    }
  }, [push])

  // Add the push style when the drawer is open by default
  useLayoutEffect(() => {
    if (modalRef.current) {
      onOpenPush()
    }
  }, [onOpenPush, onClosePush])

  const computeHeader = (modalProps: ModalState) => {
    if (typeof header === 'string') {
      return (
        <Text
          as="h2"
          className={drawerHeader}
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
          className={drawerHeader}
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
        targetElement.classList.remove(contentToPushStyle)
      }
    }
  }, [open, push, size])

  return (
    <Modal
      ariaLabel={ariaLabel}
      backdropClassName="backdrop-drawer"
      className={cn(
        className,
        drawer[size],
        drawerBase,
        push ? drawerPush : '',
      )}
      data-size={size}
      data-testid={dataTestId}
      disclosure={disclosure}
      hideOnClickOutside={hideOnClickOutside}
      hideOnEsc={hideOnEsc}
      id={id}
      isClosable={isClosable}
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
          <Stack className={drawerContentWrapper} gap={2}>
            {computeHeader(modalProps)}
            {separator ? <Separator /> : null}
            <div className={drawerChildrenWrapper}>
              {noPadding ? content : <DrawerContent>{content}</DrawerContent>}
            </div>
            <Stack className={drawerFooter}>
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
