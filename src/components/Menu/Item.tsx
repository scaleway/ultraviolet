import { Theme, css } from '@emotion/react'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'
import Button, { ButtonProps } from '../Button'

const variantStyle = {
  danger: (theme: Theme) => css`
    display: inline-block;
    color: ${theme.colors.red};
    &:hover,
    &:focus {
      color: ${theme.colors.crimson};
      svg {
        fill: ${theme.colors.crimson};
      }
    }
    svg {
      fill: ${theme.colors.red};
    }
  `,
  nav: (theme: Theme) => css`
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
} as const

const styles = {
  borderless: css`
    border: 0;
  `,
  disabled: (theme: Theme) => css`
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
  item: (theme: Theme) => css`
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
} as const

type VariantItem = keyof typeof variantStyle

type ItemProps = Omit<ButtonProps, 'variant' | 'innerRef'> & {
  borderless?: boolean
  variant?: VariantItem
}

const Item: FunctionComponent<ItemProps> = ({
  borderless = false,
  disabled = false,
  onClick,
  variant,
  ...props
}) => (
  <Button
    variant="transparent"
    role="menuitem"
    disabled={disabled}
    onClick={onClick}
    {...props}
    css={[
      styles.item,
      variant && variantStyle[variant],
      disabled && styles.disabled,
      borderless && styles.borderless,
    ]}
  />
)

Item.propTypes = {
  borderless: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['danger', 'nav']),
}

export default Item
