import styled from '@emotion/styled'
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef } from 'react'
import Icon from '../Icon'
import Menu from '../Menu'
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
  baseId?: ComponentProps<typeof Menu>['baseId']
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-disabled'>

const TabMenu = forwardRef(
  (
    { children, disclosure, visible, baseId, disabled, ...props }: TabMenuProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <Menu
      visible={visible}
      baseId={baseId}
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

export default TabMenu
