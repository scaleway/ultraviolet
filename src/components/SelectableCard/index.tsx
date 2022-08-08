import styled from '@emotion/styled'
import React, { ChangeEventHandler, ReactNode } from 'react'
import Checkbox from '../Checkbox'
import Radio from '../Radio'

const StyledElement = (element: typeof Radio) => styled(element, {
  shouldForwardProp: prop => !['showTick'].includes(prop),
})<{ showTick?: boolean }>`
  display: inline-flex;
  align-items: start;
  padding: ${({ theme }) => theme.space['2']};
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid
    ${({ theme, checked, disabled }) =>
      checked && !disabled
        ? theme.colors.primary.borderWeak
        : theme.colors.neutral.borderWeak};
  color: ${({ theme, checked }) =>
    checked ? theme.colors.primary.textWeak : theme.colors.neutral.text};
  ${({ theme, disabled }) =>
    disabled ? `background: ${theme.colors.neutral.backgroundDisabled};` : null}

  &:hover,
  &:focus-within,
  &:active {
    border: 1px solid
      ${({ theme, disabled }) =>
        disabled
          ? theme.colors.neutral.borderWeakDisabled
          : theme.colors.primary.borderWeakHover};
  }

  svg {
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
}

const SelectableCard = ({
  name,
  value,
  onChange,
  showTick = false,
  type = 'radio',
  checked = false,
  disabled = false,
  children,
  className,
}: SelectableCardProps) => {
  const Element = StyledElement(type === 'radio' ? Radio : Checkbox)

  return (
    <Element
      name={name}
      value={value}
      onChange={onChange}
      showTick={showTick}
      checked={checked}
      disabled={disabled}
      className={className}
    >
      {typeof children === 'function'
        ? children({ checked, disabled })
        : children}
    </Element>
  )
}

export default SelectableCard
