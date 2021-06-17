import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import React from 'react'
import Button from '../Button'

const styles = {
  borderless: css`
    border: 0;
  `,
  danger: theme => css`
    color: ${theme.colors.red};
    display: inline-block;
    &:hover,
    &:focus {
      color: ${theme.colors.darkRed};
      svg {
        fill: ${theme.colors.darkRed};
      }
    }
    svg {
      fill: ${theme.colors.red};
    }
  `,
  disabled: theme => css`
    cursor: not-allowed;
    color: ${theme.colors.gray350};

    &:hover,
    &:focus {
      color: ${theme.colors.gray350};
      background-color: ${theme.colors.white};
      svg {
        fill: ${theme.colors.gray550};
      }
    }
  `,
  item: theme => css`
    display: block;
    font-size: 14px;
    line-height: 22px;
    font-weight: inherit;
    padding: 4px 8px;
    color: ${theme.colors.gray700};
    border: 0;
    border-bottom: 1px solid ${theme.colors.gray100};
    cursor: pointer;
    transition: color 300ms;
    min-width: 110px;
    background-color: ${theme.colors.transparent};
    &:hover,
    &:focus {
      color: ${theme.colors.primary};
      svg {
        transition: fill 300ms;
        fill: ${theme.colors.primary};
      }
    }

    &:last-child {
      border-bottom: 0;
      border-radius: 0 0 4px 4px;
    }
  `,

  nav: theme => css`
    font-size: 16px;
    line-height: 24px;
    color: ${theme.colors.gray550};
    &:hover,
    &:focus {
      color: ${theme.colors.primary};
      svg {
        fill: ${theme.colors.primary};
      }
    }
  `,
}

const Item = ({ borderless, disabled, onClick, variant, ...props }) => (
  <Button
    variant="transparent"
    role="menuitem"
    onClick={onClick}
    {...props}
    css={[
      styles.item,
      styles[disabled ? 'disabled' : variant],
      borderless && styles.borderless,
    ]}
  />
)

Item.propTypes = {
  borderless: PropTypes.bool,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['danger', 'nav']),
}

Item.defaultProps = {
  borderless: false,
  disabled: false,
  onClick: undefined,
  variant: undefined,
}

export default Item
