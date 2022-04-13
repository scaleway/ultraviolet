import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ComponentProps } from 'react'
import Button from '../Button'

const variantStyle = {
  danger: (theme: Theme) => css`
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

type VariantItem = keyof typeof variantStyle

type ItemProps = Omit<ComponentProps<typeof Button>, 'variant' | 'innerRef'> & {
  borderless?: boolean
  variant?: VariantItem
}

const StyledButton = styled(Button)<{ borderless: boolean }>`
  display: inline-block;
  font-size: 14px;
  line-height: 22px;
  font-weight: inherit;
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.neutral.text};
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  cursor: pointer;
  transition: color 300ms;
  min-width: 110px;
  background-color: transparent;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primary.textHover};
    svg {
      transition: fill 300ms;
      fill: ${({ theme }) => theme.colors.primary.textHover};
    }
  }

  &:last-child {
    border-bottom: 0;
    border-radius: 0 0 4px 4px;
  }

  ${({ borderless }) => (borderless ? `border: 0;` : '')}

  ${({ disabled, theme }) =>
    disabled
      ? `
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
  `
      : ''}
`

const Item = ({
  borderless = false,
  disabled = false,
  onClick,
  variant,
  ...props
}: ItemProps) => (
  <StyledButton
    variant="transparent"
    role="menuitem"
    disabled={disabled}
    borderless={borderless}
    onClick={onClick}
    {...props}
    css={variant && variantStyle[variant]}
  />
)

Item.propTypes = {
  borderless: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['danger', 'nav']),
}

export default Item
