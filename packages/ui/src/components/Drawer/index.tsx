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
  // 1 rem = 16 px
  small: 22.25,
  medium: 49,
  large: 75.5,
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
  if (size === 'small') return css`animation: ${slideIn(22)} linear 150ms;`
  if (size === 'medium') return css`animation: ${slideIn(48)} linear 250ms;`

  return css`animation: ${slideIn(70)} linear 300ms;`
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
}

export const Drawer = ({
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
}: DrawerProps) => {
  const computeHeader = (modalProps: ModalState) => {
    if (typeof header === 'string') {
      return (
        <StyledText
          as="h2"
          variant="headingSmallStrong"
          sentiment="neutral"
          prominence="default"
        >
          {header}
        </StyledText>
      )
    }
    if (typeof header === 'function') {
      return (
        <StyledText
          as="h2"
          variant="headingSmallStrong"
          sentiment="neutral"
          prominence="default"
        >
          {header(modalProps)}
        </StyledText>
      )
    }

    return header
  }

  return (
    <StyledModal
      disclosure={disclosure}
      size={size}
      onClose={onClose}
      open={open}
      ariaLabel={ariaLabel}
      className={className}
      data-testid={dataTestId}
      hideOnClickOutside={hideOnClickOutside}
      hideOnEsc={hideOnEsc}
      id={id}
      data-size={size}
      placement="top-right"
      backdropClassName="backdrop-drawer"
      isClosable={isClosable}
    >
      {modalProps => (
        <CustomStack gap={2}>
          {computeHeader(modalProps)}
          {separator ? <Separator /> : null}
          <ChildrenContainer>
            {typeof children === 'function' ? children(modalProps) : children}
          </ChildrenContainer>
          <Footer>
            {typeof footer === 'function' ? footer(modalProps) : footer}
          </Footer>
        </CustomStack>
      )}
    </StyledModal>
  )
}
