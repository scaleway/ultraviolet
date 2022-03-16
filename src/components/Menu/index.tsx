import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { ComponentProps, FunctionComponent, ReactNode } from 'react'
import Popper from '../Popper'
import Item from './Item'

<<<<<<< HEAD
const bottomStyles = (theme: Theme) => css`
  box-shadow: 0 -1px 5px 3px ${transparentize(0.85, theme.colors.neutral.backgroundStrong)};
  &:after,
  &:before {
    bottom: 100%;
  }
  &:after {
    border-bottom-color: ${theme.colors.primary.borderStrong};
  }
  &:before {
    border-bottom-color: rgba(165, 165, 205, 0.4);
  }
`
const topStyles = (theme: Theme) => css`
  box-shadow: 0 1px 5px 3px
    ${transparentize(0.85, theme.colors.neutral.backgroundStrong)};
  &:after,
  &:before {
    top: 100%;
  }
  &:after {
    border-top-color: ${theme.colors.primary.background};
  }
  &:before {
    border-top-color: rgba(165, 165, 205, 0.4);
  }
`
const endStyles = css`
  &:after {
    margin-left: -9px;
    right: 24px;
  }
  &:before {
    margin-left: -11px;
    right: 24px;
  }
`
const startStyles = css`
  &:after {
    margin-right: -9px;
    left: 24px;
  }
  &:before {
    margin-right: -11px;
    left: 24px;
  }
`

const centerStyles = css`
  &:after,
  &:before {
    left: 50%;
    transform: translateX(-50%);
  }
`

const arrowPlacementStyles = {
  bottom: (theme: Theme) => css`
    ${centerStyles};
    ${bottomStyles(theme)};
  `,
  'bottom-end': (theme: Theme) => css`
    ${endStyles};
    ${bottomStyles(theme)};
  `,
  'bottom-start': (theme: Theme) => css`
    ${startStyles};
    ${bottomStyles(theme)};
  `,
  top: (theme: Theme) => css`
    ${centerStyles};
    ${topStyles(theme)};
  `,
  'top-end': (theme: Theme) => css`
    ${endStyles};
    ${topStyles(theme)};
  `,
  'top-start': (theme: Theme) => css`
    ${startStyles};
    ${topStyles(theme)};
  `,
} as const

type ArrowPlacement = keyof typeof arrowPlacementStyles
=======
type ArrowPlacement =
  | 'bottom'
  | 'bottom-end'
  | 'bottom-start'
  | 'top'
  | 'top-end'
  | 'top-start'
>>>>>>> 7f5c4ff1 (fix: nuke css attribute)
type MenuListProps = {
  align: AlignStyle
  hasArrow: boolean
  placement: ArrowPlacement
}

type AlignStyle = {
  left?: string | null
  right?: string | null
}

interface ChildrenProps {
  placement: ComponentProps<typeof Popper>['placement']
  toggle: () => void
  visible: boolean
}

type MenuProps = Omit<ComponentProps<typeof Popper>, 'children'> & {
  align?: AlignStyle
  ariaLabel?: string
  placement?: ArrowPlacement
  children?: ((props: ChildrenProps) => ReactNode) | ReactNode
  className?: string
}

type MenuType = FunctionComponent<MenuProps> & { Item: typeof Item }

const MenuList = styled.div<MenuListProps>`
  &:after,
  &:before {
    left: ${({ align }) => align.left};
    right: ${({ align }) => align.right};

    border: solid transparent;
    border-width: 9px;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    bottom: ${({ placement }) => (placement.includes('bottom') ? '100%' : '')};
    top: ${({ placement }) => (placement.includes('top') ? '100%' : '')};
    left: ${({ placement }) =>
      !placement.includes('start') && !placement.includes('end') ? '50%' : ''};
    transform: ${({ placement }) =>
      !placement.includes('start') && !placement.includes('end')
        ? 'translateX(-50%)'
        : ''};
  }

  &:after {
    border-color: transparent;
    border-bottom-color: ${({ theme, placement }) =>
      placement.includes('bottom') && theme.colors.primary.borderStrong};
    border-top-color: ${({ theme, placement }) =>
      placement.includes('top') && theme.colors.primary.borderStrong};
    margin-left: ${({ placement }) => placement.includes('end') && '-9px'};
    right: ${({ placement }) => placement.includes('end') && '24px'};
    margin-right: ${({ placement }) => placement.includes('start') && '-9px'};
    left: ${({ placement }) => placement.includes('start') && '24px'};
  }
  &:before {
    border-color: transparent;
    border-bottom-color: ${({ placement }) =>
      placement.includes('bottom') && 'rgba(165, 165, 205, 0.4)'};
    border-top-color: ${({ placement }) =>
      placement.includes('top') && 'rgba(165, 165, 205, 0.4)'};
    margin-left: ${({ placement }) => placement.includes('end') && '-11px'};
    right: ${({ placement }) => placement.includes('end') && '24px'};
    margin-right: ${({ placement }) => placement.includes('start') && '-11px'};
    left: ${({ placement }) => placement.includes('start') && '24px'};
  }
  background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.neutral.text};
  border-radius: 4px;
  position: relative;
  box-shadow: ${({ placement, theme }) =>
    placement.includes('bottom') &&
    '0 -1px 5px 3px' +
      `${transparentize(0.85, theme.colors.neutral.background)}`};
  box-shadow: ${({ placement, theme }) =>
    placement.includes('top') &&
    '0 1px 5px 3px' +
      `${transparentize(0.85, theme.colors.neutral.background)}`};
`

const Menu: MenuType = ({
  align = { left: '50%', right: 'inherit' },
  ariaLabel = 'menu',
  baseId = '',
  children,
  disclosure,
  hasArrow = true,
  modal = false,
  name = 'menu',
  placement = 'bottom',
  visible = false,
  className,
}) => (
  <Popper
    aria-label={ariaLabel}
    baseId={baseId}
    disclosure={disclosure}
    hasArrow={false}
    modal={modal}
    name={name}
    placement={placement}
    visible={visible}
    className={className}
  >
    {({ placement: localPlacement, toggle, visible: isOpen }) =>
      isOpen && (
        <MenuList
          align={align}
          hasArrow={hasArrow}
          placement={placement}
          role="menu"
        >
          {typeof children === 'function'
            ? children({ placement: localPlacement, toggle, visible })
            : children}
        </MenuList>
      )
    }
  </Popper>
)

Menu.propTypes = {
  align: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  ariaLabel: PropTypes.string,
  baseId: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  className: PropTypes.string,
  disclosure: PropTypes.func.isRequired,
  hasArrow: PropTypes.bool,
  modal: PropTypes.bool,
  name: PropTypes.string,
  placement: PropTypes.oneOf([
    'bottom',
    'top',
    'bottom-end',
    'bottom-start',
    'top-end',
    'top-start',
  ]),
  visible: PropTypes.bool,
}

Menu.Item = Item

export default Menu
