'use client'

import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { ComponentProps } from 'react'
import type { ModalProps } from '../Modal'
import { Modal } from '../Modal'
import type { ModalState } from '../Modal/types'
import { Separator } from '../Separator'
import { Stack } from '../Stack'
import { Text } from '../Text'
// oxlint-disable-next-line import/no-unassigned-import
import './style.css'

export const SIZES = {
  large: 75.5,
  medium: 49,
  // 1 rem = 16 px
  small: 22.25,
}

const slideIn = (translation: number) => keyframes`
  from {
    transform: translateX(${translation}rem);
  }
  to {
    transform: translateX(0);
  }
 `

const slideAnimation = (size: 'small' | 'medium' | 'large') => {
  const translations = {
    large: 70,
    medium: 48,
    small: 21,
  } as const

  const animationDuration = {
    large: 300,
    medium: 250,
    small: 150,
  }
  const animation = slideIn(translations[size])

  return css`animation: ${animation} linear ${animationDuration[size]}ms;`
}

const StyledModal = styled(Modal)`
  margin-right: 0;
  height: 100%;
  border-radius: 0;
  padding: 0;

  &[data-size="small"]{
    width: ${SIZES.small}rem;
    ${slideAnimation('small')}
  }

  &[data-size="medium"]{
    width: ${SIZES.medium}rem;
    ${slideAnimation('medium')}
  }

  &[data-size="large"]{
    width: ${SIZES.large}rem;
    ${slideAnimation('large')}
  }
`
const CustomStack = styled(Stack)`
  height: 100%;
  position: relative;
`

const ChildrenContainer = styled.div`
  overflow-y: auto;
  height: 100%;
`
export const DrawerContent = styled.div`
  padding-inline: ${({ theme }) => theme.space[2]};
`

const StyledText = styled(Text)`
  padding-inline: ${({ theme }) => theme.space[2]};
  padding-top: ${({ theme }) => theme.space[4]};
`

const Footer = styled(Stack)`
  padding: ${({ theme }) => theme.space[2]};
  padding-top: 0;
`

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
  size?: keyof typeof SIZES
  /**
   * Fixed info at the bottom of the
   */
  footer?: ModalProps['children']
  separator?: boolean
  noPadding?: boolean
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
  separator = true,
  noPadding = false,
}: DrawerProps) => {
  const computeHeader = (modalProps: ModalState) => {
    if (typeof header === 'string') {
      return (
        <StyledText
          as="h2"
          prominence="default"
          sentiment="neutral"
          variant="headingSmallStrong"
        >
          {header}
        </StyledText>
      )
    }
    if (typeof header === 'function') {
      return (
        <StyledText
          as="h2"
          prominence="default"
          sentiment="neutral"
          variant="headingSmallStrong"
        >
          {header(modalProps)}
        </StyledText>
      )
    }

    return header
  }

  return (
    <StyledModal
      ariaLabel={ariaLabel}
      backdropClassName="backdrop-drawer"
      className={className}
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
          <CustomStack gap={2}>
            {computeHeader(modalProps)}
            {separator ? <Separator /> : null}
            <ChildrenContainer>
              {noPadding ? content : <DrawerContent>{content}</DrawerContent>}
            </ChildrenContainer>
            <Footer>
              {typeof footer === 'function' ? footer(modalProps) : footer}
            </Footer>
          </CustomStack>
        )
      }}
    </StyledModal>
  )
}

export const Drawer = Object.assign(BaseDrawer, {
  Content: DrawerContent,
})
