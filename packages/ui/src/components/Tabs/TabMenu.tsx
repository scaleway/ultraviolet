'use client'

import styled from '@emotion/styled'
import { ArrowDownIcon } from '@ultraviolet/icons'
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef } from 'react'
import { Menu } from '../Menu'
import { StyledTabButton } from './Tab'

const ArrowIcon = styled(ArrowDownIcon)``
const StyledMenu = styled(StyledTabButton)`
  ${ArrowIcon} {
    color: inherit;
    margin-left: ${({ theme }) => theme.space['1']};
    transition: 300ms transform ease-out;
  }

  &[aria-expanded='true'] ${ArrowIcon} {
    transform: rotate(-180deg);
  }
`

// This will wrap and give the positioning to the popup div that is added onto the disclosure
const StyledPositioningWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  bottom: 0;
  right: 0;
`

type TabMenuProps = {
  children: ReactNode
  disclosure: ReactNode
  visible?: ComponentProps<typeof Menu>['visible']
  id?: ComponentProps<typeof Menu>['id']
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-disabled'>

export const TabMenu = forwardRef(
  (
    {
      children,
      disclosure,
      visible,
      id,
      disabled,
      className,
      ...props
    }: TabMenuProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <StyledPositioningWrapper>
      <Menu
        visible={visible}
        id={id}
        ref={ref}
        portalTarget={document.body} // We need to attach it to the body to avoid overflow issues
        disclosure={
          <StyledMenu
            role="tab"
            aria-disabled={disabled ?? 'false'}
            disabled={disabled}
            aria-haspopup="menu"
            className={className}
            type="button"
            {...props}
          >
            {disclosure}
            <ArrowIcon />
          </StyledMenu>
        }
      >
        {children}
      </Menu>
    </StyledPositioningWrapper>
  ),
)
