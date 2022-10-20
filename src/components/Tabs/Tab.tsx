import styled from '@emotion/styled'
import {
  ComponentProps,
  ElementType,
  ForwardedRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  Ref,
  forwardRef,
  useMemo,
} from 'react'
import Badge from '../Badge'
import Tooltip from '../Tooltip'
import { useTabsContext } from './TabsContext'

const StyledBadge = styled(Badge)`
  padding: 0 ${({ theme }) => theme.space['1']};
  margin-left: ${({ theme }) => theme.space['1']};
`

const StyledTooltip = styled(Tooltip)``

const BadgeContainer = styled.span`
  margin-left: ${({ theme }) => theme.space['1']};
  display: flex;
`

export const StyledTabButton = styled.button`
  display: flex;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.space['1']} ${theme.space['2']}`};
  cursor: pointer;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.neutral.text};
  text-decoration: none;
  user-select: none;
  touch-action: manipulation;
  transition: color 0.2s;
  border: none;
  background: none;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.colors.neutral.borderWeak};
  outline: none;

  font-size: ${({ theme }) => theme.typography.bodyStrong.fontSize};
  font-family: ${({ theme }) => theme.typography.bodyStrong.fontFamily};
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
  letter-spacing: ${({ theme }) => theme.typography.bodyStrong.letterSpacing};
  line-height: ${({ theme }) => theme.typography.bodyStrong.lineHeight};
  text-case: ${({ theme }) => theme.typography.bodyStrong.textCase};

  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    outline: none;
  }

  &:focus-visible {
    outline: auto;
  }

  &[aria-selected='true'] {
    color: ${({ theme }) => theme.colors.primary.text};
    border-bottom-color: ${({ theme }) => theme.colors.primary.borderWeak};
  }

  &[aria-disabled='false']:not(:disabled) {
    &:hover,
    &:focus,
    &:active {
      outline: none;
      color: ${({ theme }) => theme.colors.primary.text};
      border-bottom-color: ${({ theme }) => theme.colors.primary.borderWeak};
      ${StyledBadge} {
        background-color: ${({ theme }) => theme.colors.primary.background};
        border-color: ${({ theme }) => theme.colors.primary.background};
        color: ${({ theme }) => theme.colors.primary.text};
      }
    }
  }

  &[aria-disabled='true'],
  &:disabled {
    cursor: not-allowed;
    filter: grayscale(1) opacity(50%);
  }
`
export type TabProps<T extends ElementType = 'button'> = {
  as?: T
  badge?: ReactNode
  children?: ReactNode
  className?: string
  counter?: number | string
  disabled?: boolean
  value?: string | number
  onClick?: MouseEventHandler<HTMLElement>
  onKeyDown?: KeyboardEventHandler<HTMLElement>
  tooltip?: string
} & Omit<
  ComponentProps<T>,
  | 'as'
  | 'badge'
  | 'children'
  | 'className'
  | 'counter'
  | 'disabled'
  | 'value'
  | 'tooltip'
  | 'role'
>

export const Tab = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      badge,
      children,
      className,
      counter,
      disabled = false,
      value,
      onClick,
      onKeyDown,
      tooltip,
      ...props
    }: TabProps<T>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const { selected, onChange } = useTabsContext()
    const computedAs = as ?? 'button'
    const isSelected = useMemo(
      () => value !== undefined && selected === value,
      [value, selected],
    )

    return (
      <StyledTooltip text={tooltip}>
        <StyledTabButton
          role="tab"
          ref={ref as unknown as Ref<HTMLButtonElement>}
          className={className}
          as={computedAs}
          aria-label={value ? `${value}` : undefined}
          aria-selected={isSelected}
          aria-disabled={disabled}
          disabled={computedAs === 'button' ? disabled : undefined}
          type={computedAs === 'button' ? 'button' : undefined}
          onClick={event => {
            if (value !== undefined) {
              onChange(value)
            }
            onClick?.(event)
          }}
          onKeyDown={event => {
            onKeyDown?.(event)
            if (!event.defaultPrevented && !disabled && value) onChange(value)
          }}
          {...props}
        >
          {children}
          {typeof counter === 'number' || typeof counter === 'string' ? (
            <StyledBadge
              variant={isSelected ? 'primary' : 'neutral'}
              prominence={isSelected ? 'default' : 'strong'}
              size="medium"
            >
              {counter}
            </StyledBadge>
          ) : null}
          {badge ? <BadgeContainer>{badge}</BadgeContainer> : null}
        </StyledTabButton>
      </StyledTooltip>
    )
  },
)
