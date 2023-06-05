import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import type { MouseEventHandler, ReactNode, Ref } from 'react'
import { forwardRef } from 'react'
import { Tooltip } from '../Tooltip'

type MenuItemSentiment = 'neutral' | 'danger'

const itemCoreStyle = ({
  theme,
  borderless,
  sentiment,
  disabled,
}: {
  theme: Theme
  borderless: boolean
  sentiment: MenuItemSentiment
  disabled: boolean
}) => `
  display: inline-block;
  font-size: ${theme.typography.bodySmall.fontSize};
  line-height: ${theme.typography.bodySmall.lineHeight};
  font-weight: inherit;
  padding: ${`${theme.space['0.5']} ${theme.space['1']}`};
  border: none;
  ${
    borderless ? '' : `border-bottom: 1px solid ${theme.colors.neutral.border};`
  }
  cursor: pointer;
  min-width: 110px;

  color: ${theme.colors[sentiment][disabled ? 'textDisabled' : 'text']};
  svg {
    fill: ${theme.colors[sentiment][disabled ? 'textDisabled' : 'text']};
  }

  ${
    disabled
      ? `
        cursor: not-allowed;
      `
      : `
          &:hover,
          &:focus {
            color: ${theme.colors[sentiment].textHover};
            svg {
              fill: ${theme.colors[sentiment].textHover};
            }
          }`
  }
  `

const StyledItem = styled('button', {
  shouldForwardProp: prop => !['borderless', 'sentiment'].includes(prop),
})<{
  borderless: boolean
  disabled: boolean
  sentiment: MenuItemSentiment
}>`
  ${({ theme, borderless, sentiment, disabled }) =>
    itemCoreStyle({ theme, borderless, sentiment, disabled })}
  background: none;
`

const StyledLinkItem = styled('a', {
  shouldForwardProp: prop => !['borderless', 'sentiment'].includes(prop),
})<{
  borderless: boolean
  disabled: boolean
  sentiment: MenuItemSentiment
}>`
  ${({ theme, borderless, sentiment, disabled }) =>
    itemCoreStyle({ theme, borderless, sentiment, disabled })}
  text-decoration: none;
  
  &:focus {
    text-decoration: none;
  }
`

type ItemProps = {
  href?: string | undefined
  disabled?: boolean | undefined
  /**
   * @deprecated : wrap Menu.Item with a Tooltip
   */
  tooltip?: string | undefined
  className?: string | undefined
  children: ReactNode
  onClick?: MouseEventHandler<HTMLElement> | undefined
  borderless?: boolean
  /**
   * @deprecated : use `sentiment` prop instead
   */
  variant?: MenuItemSentiment
  sentiment?: MenuItemSentiment
}

const Item = forwardRef<HTMLElement, ItemProps>(
  (
    {
      borderless = false,
      disabled = false,
      onClick,
      variant,
      sentiment,
      href,
      children,
      tooltip,
      className,
    },
    ref,
  ) => {
    const finalSentiment = sentiment ?? variant ?? 'neutral'

    if (href && !disabled) {
      return (
        <Tooltip text={tooltip}>
          <StyledLinkItem
            borderless
            href={href}
            ref={ref as Ref<HTMLAnchorElement>}
            onClick={
              disabled
                ? undefined
                : (onClick as MouseEventHandler<HTMLAnchorElement>)
            }
            role="menuitem"
            disabled={disabled}
            sentiment={finalSentiment}
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
          sentiment={finalSentiment}
          className={className}
        >
          {children}
        </StyledItem>
      </Tooltip>
    )
  },
)

export default Item
