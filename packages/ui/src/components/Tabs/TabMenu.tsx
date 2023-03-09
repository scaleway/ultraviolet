import styled from '@emotion/styled'
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef } from 'react'
import { Icon } from '../Icon'
import { Menu } from '../Menu'
import { StyledTabButton } from './Tab'

const ArrowIcon = styled(Icon)``
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

type TabMenuProps = {
  children: ReactNode
  disclosure: ReactNode
  visible?: ComponentProps<typeof Menu>['visible']
  id?: ComponentProps<typeof Menu>['id']
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-disabled'>

export const TabMenu = forwardRef(
  (
    { children, disclosure, visible, id, disabled, ...props }: TabMenuProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <Menu
      visible={visible}
      id={id}
      ref={ref}
      disclosure={
        <StyledMenu
          role="tab"
          aria-disabled={disabled ?? 'false'}
          disabled={disabled}
          aria-haspopup="menu"
          {...props}
        >
          {disclosure}
          <ArrowIcon name="arrow-down" />
        </StyledMenu>
      }
    >
      {children}
    </Menu>
  ),
)
