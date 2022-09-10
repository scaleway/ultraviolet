import styled from '@emotion/styled'
import {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useMemo,
} from 'react'
import Checkbox from '../Checkbox'
import Radio from '../Radio'
import Tooltip from '../Tooltip'

const StyledElement = (element: typeof Radio) => styled(element, {
  shouldForwardProp: prop => !['showTick'].includes(prop),
})<{ showTick?: boolean }>`
  display: inline-flex;
  align-items: start;
  padding: ${({ theme }) => theme.space['2']};
  border-radius: ${({ theme }) => theme.radii.default};
  transition: border-color 200ms ease, box-shadow 200ms ease;

  ${({ theme, checked, disabled, error }) => {
    if (error)
      return `
      border: 1px solid ${theme.colors.danger.border};
      color: ${theme.colors.danger.text};
    `

    if (checked)
      return `
      border: 1px solid ${theme.colors.primary.borderWeak};
      color: ${theme.colors.primary.textWeak};
    `

    if (disabled)
      return `
      border: 1px solid ${theme.colors.neutral.borderWeakDisabled};
      color: ${theme.colors.neutral.textDisabled};
      background: ${theme.colors.neutral.backgroundDisabled};
    `

    return `
      border: 1px solid ${theme.colors.neutral.borderWeak};
      color: ${theme.colors.neutral.text};
    `
  }}
  &:hover,
  &:focus-within,
  &:active {
    ${({ theme, disabled, error, checked }) => {
      if (error || disabled) return ``

      return `
        border: 1px solid ${theme.colors.primary.borderWeak};
        box-shadow: ${checked ? 'none' : theme.shadows.hoverPrimary};
      `
    }}
  }

  input + svg {
    ${({ showTick }) => (!showTick ? `display: none;` : null)}
  }
`

type SelectableCardProps = {
  name?: string
  children:
    | (({
        disabled,
        checked,
      }: Pick<SelectableCardProps, 'checked' | 'disabled'>) => ReactNode)
    | ReactNode
  value: string | number
  onChange: ChangeEventHandler<HTMLInputElement>
  showTick?: boolean
  type?: 'radio' | 'checkbox'
  disabled?: boolean
  checked?: boolean
  className?: string
  isError?: boolean
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  id?: string
  tooltip?: string
}

const SelectableCard = forwardRef(
  (
    {
      name,
      value,
      onChange,
      showTick = false,
      type = 'radio',
      checked = false,
      disabled = false,
      children,
      className,
      isError,
      onFocus,
      onBlur,
      tooltip,
      id,
    }: SelectableCardProps,
    ref: ForwardedRef<HTMLLabelElement>,
  ) => {
    const Element = useMemo(
      () =>
        StyledElement((type === 'radio' ? Radio : Checkbox) as typeof Radio),
      [type],
    )

    return (
      <Tooltip text={tooltip}>
        <Element
          name={name}
          value={value}
          onChange={onChange}
          showTick={showTick}
          checked={checked}
          disabled={disabled}
          className={className}
          error={isError}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
          id={id}
        >
          {typeof children === 'function'
            ? children({ checked, disabled })
            : children}
        </Element>
      </Tooltip>
    )
  },
)

export default SelectableCard
