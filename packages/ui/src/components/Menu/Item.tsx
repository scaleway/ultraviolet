import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import type { MouseEventHandler, ReactNode, Ref } from 'react'
import { forwardRef } from 'react'
import { Tooltip } from '../Tooltip'

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
    font-size: ${theme.typography.body.fontSize};
    line-height: ${theme.typography.body.lineHeight};
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

const StyledItem = styled('button', {
  shouldForwardProp: prop => !['borderless', 'itemVariant'].includes(prop),
})<{
  borderless?: boolean
  disabled?: boolean
  itemVariant?: keyof typeof variantStyle
}>`
  display: inline-block;
  font-size: ${({ theme }) => theme.typography.bodySmall.fontSize};
  line-height: ${({ theme }) => theme.typography.bodySmall.lineHeight};
  font-weight: inherit;
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  color: ${({ theme }) => theme.colors.neutral.text};
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.border};
  cursor: pointer;
  transition: color 300ms;
  min-width: 110px;
  background-color: transparent;
  border-radius: ${({ theme }) => theme.radii.none};
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
    border-radius: 0 0
      ${({ theme }) => ` ${theme.radii.default} ${theme.radii.default}`};
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
const StyledLinkItem = styled(StyledItem)`
  text-decoration: none;
`.withComponent('a')

type VariantItem = keyof typeof variantStyle

type ItemProps = {
  href?: string | undefined
  disabled?: boolean | undefined
  /**
   * @deprecated : wrap Menu.Item with a Tooltip
   */
  tooltip?: string | undefined
  className?: string | undefined
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  borderless?: boolean
  variant?: VariantItem
}

const Item = forwardRef<HTMLElement, ItemProps>(
  (
    {
      borderless = false,
      disabled = false,
      onClick,
      variant: itemVariant,
      href,
      children,
      tooltip,
      className,
    },
    ref,
  ) => {
    if (href) {
      return (
        <Tooltip text={tooltip}>
          <StyledLinkItem
            href={href}
            // @ts-expect-error: somehow refuse cast HTMLAnchorElement
            ref={ref}
            role="menuitem"
            disabled={disabled}
            itemVariant={itemVariant}
            className={className}
          >
            {children}
          </StyledLinkItem>
        </Tooltip>
      )
    }

    return (
      <Tooltip text={tooltip}>
        <StyledItem
          type="button"
          ref={ref as Ref<HTMLButtonElement>}
          role="menuitem"
          disabled={disabled}
          onClick={onClick}
          borderless={borderless}
          itemVariant={itemVariant}
          className={className}
        >
          {children}
        </StyledItem>
      </Tooltip>
    )
  },
)

export default Item
