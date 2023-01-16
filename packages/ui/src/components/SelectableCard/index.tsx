import styled from '@emotion/styled'
import type {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  ReactNode,
} from 'react'
import { forwardRef, useMemo, useRef } from 'react'
import { Checkbox } from '../Checkbox'
import { Radio } from '../Radio'
import { Tooltip } from '../Tooltip'

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: start;
  padding: ${({ theme }) => theme.space['2']};
  border-radius: ${({ theme }) => theme.radii.default};
  transition: border-color 200ms ease, box-shadow 200ms ease;
  cursor: pointer;

  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  color: ${({ theme }) => theme.colors.neutral.text};

  &[data-checked='true'] {
    border: 1px solid ${({ theme }) => theme.colors.primary.borderWeak};
  }

  &[data-error='true'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};
  }

  &[data-disabled='true'] {
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeakDisabled};
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;
  }

  &:hover,
  &:focus-within,
  &:active {
    &:not([data-error='true']):not([data-disabled='true']) {
      border: 1px solid ${({ theme }) => theme.colors.primary.borderWeak};
      &[data-cheked='false'] {
        box-shadow: ${({ theme }) => theme.shadows.hoverPrimary};
      }
    }}
  }
`

const StyledElement = (element: typeof Radio) => styled(element, {
  shouldForwardProp: prop => !['showTick', 'hasLabel'].includes(prop),
})<{ showTick?: boolean; hasLabel?: boolean }>`
  display: inline-flex;
  align-items: start;

  &[data-checked='true'] {
    color: ${({ theme }) => theme.colors.primary.textWeak};
  }

  &[data-error='true'] {
    color: ${({ theme }) => theme.colors.danger.text};
  }

  &[aria-disabled='true'] {
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
  }

  input + svg {
    ${({ showTick }) => (!showTick ? `display: none;` : null)}
  }

  label {
    ${({ showTick, hasLabel }) =>
      !showTick && !hasLabel ? `display: none;` : null}
  }
`

type SelectableCardProps = {
  name?: string
  children?:
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
  label?: ReactNode
}

export const SelectableCard = forwardRef(
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
      label,
    }: SelectableCardProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const Element = useMemo(
      () =>
        StyledElement((type === 'radio' ? Radio : Checkbox) as typeof Radio),
      [type],
    )

    const innerRef = useRef<HTMLInputElement>(null)

    return (
      <Tooltip text={tooltip}>
        <Container
          onClick={() => {
            if (innerRef && innerRef.current) {
              innerRef.current.click()
            }
          }}
          className={className}
          data-checked={checked}
          data-disabled={disabled}
          data-error={isError}
          ref={ref}
        >
          <Element
            name={name}
            value={value}
            onChange={onChange}
            showTick={showTick}
            checked={checked}
            disabled={disabled}
            error={isError}
            onFocus={onFocus}
            onBlur={onBlur}
            hasLabel={!!label}
            id={id}
            ref={innerRef}
            data-error={isError}
          >
            {label}
          </Element>
          {typeof children === 'function'
            ? children({ checked, disabled })
            : children}
        </Container>
      </Tooltip>
    )
  },
)
