import { Theme, css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, { ComponentProps, FunctionComponent, ReactNode } from 'react'
import Popper from '../Popper'
import Item from './Item'

const bottomStyles = (theme: Theme) => css`
  box-shadow: 0 -1px 5px 3px ${transparentize(0.85, theme.colors.neutral.background)};
  &:after,
  &:before {
    bottom: 100%;
  }
  &:after {
    border-bottom-color: ${theme.colors.primary.background};
  }
  &:before {
    border-bottom-color: rgba(165, 165, 205, 0.4);
  }
`
const topStyles = (theme: Theme) => css`
  box-shadow: 0 1px 5px 3px
    ${transparentize(0.85, theme.colors.neutral.background)};
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

export const arrowPlacements = Object.keys(
  arrowPlacementStyles,
) as ArrowPlacement[]

type AlignStyle = {
  left?: string | null
  right?: string | null
}

const styles = {
  align: (align: AlignStyle) => css`
    &:after,
    &:before {
      left: ${align.left};
      right: ${align.right};
    }
  `,
  menu: (theme: Theme) => css`
    background-color: ${theme.colors.primary.backgroundWeak};
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    color: ${theme.colors.neutral.text};
    border-radius: 4px;
    position: relative;

    &:after,
    &:before {
      border: solid transparent;
      border-width: 9px;
      content: ' ';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: transparent;
    }
    &:before {
      border-color: transparent;
    }
  `,
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
}

type MenuType = FunctionComponent<MenuProps> & { Item: typeof Item }

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
  >
    {({ placement: localPlacement, toggle, visible: isOpen }) =>
      isOpen && (
        <div
          role="menu"
          css={[
            styles.menu,
            hasArrow && arrowPlacementStyles[localPlacement as ArrowPlacement],
            styles.align(align),
          ]}
        >
          {typeof children === 'function'
            ? children({ placement: localPlacement, toggle, visible })
            : children}
        </div>
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
  disclosure: PropTypes.func.isRequired,
  hasArrow: PropTypes.bool,
  modal: PropTypes.bool,
  name: PropTypes.string,
  placement: PropTypes.oneOf<ArrowPlacement>(arrowPlacements),
  visible: PropTypes.bool,
}

Menu.Item = Item

export default Menu
