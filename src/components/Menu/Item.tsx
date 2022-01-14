import { Theme, css } from '@emotion/react'
import PropTypes from 'prop-types'
import { ComponentProps, FunctionComponent } from 'react'
import Button from '../Button'

const variantStyle = {
  danger: (theme: Theme) => css`
    display: inline-block;
    color: ${theme.colors.danger.text};
    &:hover,
    &:focus {
      color: ${theme.colors.danger.textHover};
      svg {
        fill: ${theme.colors.danger.textHover};
      }
    }
    svg {
      fill: ${theme.colors.danger.text};
    }
  `,
  nav: (theme: Theme) => css`
    font-size: 16px;
    line-height: 24px;
    color: ${theme.colors.neutral.textWeak};
    &:hover,
    &:focus {
      color: ${theme.colors.primary.text};
      svg {
        fill: ${theme.colors.primary.text};
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
    color: ${theme.colors.neutral.textDisabled};

    &:hover,
    &:focus {
      color: ${theme.colors.neutral.textHover};
      background-color: ${theme.colors.neutral.backgroundWeak};
      svg {
        fill: ${theme.colors.neutral.textHover};
      }
    }
  `,
  item: (theme: Theme) => css`
    display: block;
    font-size: 14px;
    line-height: 22px;
    font-weight: inherit;
    padding: 4px 8px;
    color: ${theme.colors.neutral.text};
    border: 0;
    border-bottom: 1px solid ${theme.colors.neutral.border};
    cursor: pointer;
    transition: color 300ms;
    min-width: 110px;
    background-color: transparent;
    &:hover,
    &:focus {
      color: ${theme.colors.primary.textHover};
      svg {
        transition: fill 300ms;
        fill: ${theme.colors.primary.textHover};
      }
    }

    &:last-child {
      border-bottom: 0;
      border-radius: 0 0 4px 4px;
    }
  `,
} as const

type VariantItem = keyof typeof variantStyle

type ItemProps = Omit<ComponentProps<typeof Button>, 'variant' | 'innerRef'> & {
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
