'use client'

import type { ComponentProps, ReactNode } from 'react'
import type { ModalProps } from '../Modal'
import { Modal } from '../Modal'
import type { ModalState } from '../Modal/types'
import { Separator } from '../Separator'
import { Stack } from '../Stack'
import { Text } from '../Text'
import type { SizeProp } from './styles.css'
import {
  drawer,
  drawerChildrenWrapper,
  drawerContent,
  drawerContentWrapper,
  drawerFooter,
  drawerHeader,
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
> & {
  header?: ModalProps['children']
  size?: SizeProp
  /**
   * Fixed info at the bottom of the
   */
  footer?: ModalProps['children']
  separator?: boolean
  noPadding?: boolean
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
  separator = true,
  noPadding = false,
}: DrawerProps) => {
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

  return (
    <Modal
      ariaLabel={ariaLabel}
      backdropClassName="backdrop-drawer"
      className={`${className ? `${className} ` : ''}${drawer[size]}`}
      data-size={size}
      data-testid={dataTestId}
      disclosure={disclosure}
      hideOnClickOutside={hideOnClickOutside}
      hideOnEsc={hideOnEsc}
      id={id}
      isClosable={isClosable}
      onClose={onClose}
      open={open}
      placement="top-right"
      size={size}
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
