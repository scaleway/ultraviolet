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
import Text from '../Text'
import Tooltip from '../Tooltip'
import { useTabsContext } from './TabsContext'

const StyledCounter = styled(Text)`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderStrong};
  margin-left: ${({ theme }) => theme.space['1']};
  height: 24px;
  width: 24px;
  line-height: 22px;
`

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
  color: ${({ theme }) => theme.colors.neutral.textWeak};
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
    ${StyledCounter} {
      background-color: ${({ theme }) => theme.colors.primary.background};
      border-color: ${({ theme }) => theme.colors.primary.background};
    }
  }

  &[aria-disabled='false']:not(:disabled) {
    &:hover,
    &:focus,
    &:active {
      outline: none;
      color: ${({ theme }) => theme.colors.primary.text};
      border-bottom-color: ${({ theme }) => theme.colors.primary.borderWeak};
      ${StyledCounter} {
        background-color: ${({ theme }) => theme.colors.primary.background};
        border-color: ${({ theme }) => theme.colors.primary.background};
      }
    }
  }

  &[aria-disabled='true'],
  &:disabled {
    cursor: not-allowed;
    filter: grayscale(1) opacity(50%);
  }
`
export type TabProps<T extends ElementType> = {
  as?: T
  badge?: ReactNode
  children?: ReactNode
  className?: string
  counter?: number
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

const Tab = <T extends ElementType = 'button'>(
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
    <Tooltip text={tooltip}>
      <StyledTabButton
        role="tab"
        ref={ref as Ref<HTMLButtonElement> | null}
        className={className}
        as={computedAs}
        aria-label={value ? `${value}` : undefined}
        aria-selected={isSelected}
        aria-disabled={disabled ?? 'false'}
        disabled={computedAs === 'button' ? disabled : undefined}
        onClick={event => {
          if (value) {
            onChange(value)
          }
          ;(onClick as MouseEventHandler<HTMLElement>)?.(event)
        }}
        onKeyDown={event => {
          ;(onKeyDown as KeyboardEventHandler<HTMLElement>)?.(event)
          if (!event.defaultPrevented && !disabled && value) onChange(value)
        }}
        {...props}
      >
        {children}
        {counter ? (
          <StyledCounter oneLine as="span" variant="caption">
            {counter}
          </StyledCounter>
        ) : null}
        {badge ? <BadgeContainer>{badge}</BadgeContainer> : null}
      </StyledTabButton>
    </Tooltip>
  )
}

export default forwardRef(Tab)
