import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons/legacy'
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef } from 'react'
import { MenuV2 } from '../MenuV2'
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
  visible?: ComponentProps<typeof MenuV2>['visible']
  id?: ComponentProps<typeof MenuV2>['id']
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
      <MenuV2
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
            <ArrowIcon name="arrow-down" />
          </StyledMenu>
        }
      >
        {children}
      </MenuV2>
    </StyledPositioningWrapper>
  ),
)
