import { css } from '@emotion/react'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import Popper from '../Popper'
import Item from './Item'

const bottomStyles = theme => css`
  box-shadow: 0 -1px 5px 3px ${transparentize(0.85, theme.colors.shadow)};
  &:after,
  &:before {
    bottom: 100%;
  }
  &:after {
    border-bottom-color: ${theme.colors.white};
  }
  &:before {
    border-bottom-color: rgba(165, 165, 205, 0.4);
  }
`
const topStyles = theme => css`
  box-shadow: 0 1px 5px 3px ${transparentize(0.85, theme.colors.shadow)};
  &:after,
  &:before {
    top: 100%;
  }
  &:after {
    border-top-color: ${theme.colors.white};
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
  bottom: theme => css`
    ${centerStyles};
    ${bottomStyles(theme)};
  `,
  'bottom-end': theme => css`
    ${endStyles};
    ${bottomStyles(theme)};
  `,
  'bottom-start': theme => css`
    ${startStyles};
    ${bottomStyles(theme)};
  `,
  top: theme => css`
    ${centerStyles};
    ${topStyles(theme)};
  `,
  'top-end': theme => css`
    ${endStyles};
    ${topStyles(theme)};
  `,
  'top-start': theme => css`
    ${startStyles};
    ${topStyles(theme)};
  `,
}

export const arrowPlacements = Object.keys(arrowPlacementStyles)

const styles = {
  align: align => css`
    &:after,
    &:before {
      left: ${align.left};
      right: ${align.right};
    }
  `,
  menu: theme => css`
    background-color: ${theme.colors.white};
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    color: ${theme.colors.gray550};
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
      border-color: rgba(255, 255, 255, 0);
    }
    &:before {
      border-color: rgba(165, 165, 205, 0);
    }
  `,
}

const Menu = ({
  align,
  baseId,
  children,
  ariaLabel,
  modal,
  hasArrow,
  name,
  placement,
  disclosure,
}) => (
  <Popper
    aria-label={ariaLabel}
    baseId={baseId}
    disclosure={disclosure}
    hasArrow={false}
    modal={modal}
    name={name}
    placement={placement}
  >
    {({ placement: localPlacement }) => (
      <div
        role="menu"
        css={[
          styles.menu,
          hasArrow && arrowPlacementStyles[localPlacement],
          styles.align(align),
        ]}
      >
        {children}
      </div>
    )}
  </Popper>
)

Menu.defaultProps = {
  align: { left: '50%', right: 'inherit' },
  ariaLabel: 'menu',
  baseId: '',
  hasArrow: true,
  modal: false,
  name: 'menu',
  placement: 'bottom',
}

Menu.propTypes = {
  align: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  ariaLabel: PropTypes.string,
  baseId: PropTypes.string,
  children: PropTypes.node.isRequired,
  disclosure: PropTypes.func.isRequired,
  hasArrow: PropTypes.bool,
  modal: PropTypes.bool,
  name: PropTypes.string,
  placement: PropTypes.oneOf(arrowPlacements),
}

Menu.Item = Item

export default Menu
