import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps, Ref, forwardRef } from 'react'
import Button from '../Button'

const variantStyle = {
  danger: (theme: Theme) => `
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
  nav: (theme: Theme) => `
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

const StyledButton = styled(Button, {
  shouldForwardProp: prop => !['borderless', 'itemVariant'].includes(prop),
})<{
  borderless?: boolean
  disabled?: boolean
  itemVariant?: keyof typeof variantStyle
}>`
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

  ${({ itemVariant, theme }) =>
    itemVariant ? variantStyle[itemVariant]?.(theme) : null}

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
      : null}

  ${({ borderless }) => (borderless ? `border: 0;` : null)}
`

type VariantItem = keyof typeof variantStyle

type ItemProps = Omit<ComponentProps<typeof Button>, 'variant' | 'innerRef'> & {
  borderless?: boolean
  variant?: VariantItem
}

const Item = forwardRef(
  (
    {
      borderless = false,
      disabled = false,
      onClick,
      variant: itemVariant,
      href,
      ...props
    }: ItemProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <StyledButton
      ref={ref}
      variant="transparent"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      href={href}
      as={href ? 'a' : undefined}
      borderless={borderless}
      itemVariant={itemVariant}
      {...props}
    />
  ),
)

export default Item
