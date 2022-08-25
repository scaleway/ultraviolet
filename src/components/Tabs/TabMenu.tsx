import styled from '@emotion/styled'
import { ComponentProps, ReactNode } from 'react'
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
} & ComponentProps<'button'>
const TabMenu = ({
  children,
  disclosure,
  className,
  style,
  visible,
  baseId,
  ...props
}: TabMenuProps) => (
  <li className={className} style={style}>
    <Menu
      visible={visible}
      baseId={baseId}
      disclosure={
        <StyledMenu role="listitem" {...props}>
          {disclosure}
          <ArrowIcon name="arrow-down" />
        </StyledMenu>
      }
    >
      {children}
    </Menu>
  </li>
)

export default TabMenu
