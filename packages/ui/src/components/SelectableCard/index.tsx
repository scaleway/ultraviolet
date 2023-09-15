import styled from '@emotion/styled'
import type {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  ReactNode,
} from 'react'
import { forwardRef, useRef } from 'react'
import { Checkbox } from '../Checkbox'
import { Radio } from '../Radio'
import { Tooltip } from '../Tooltip'

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: start;
  padding: ${({ theme }) => theme.space['2']};
  border-radius: ${({ theme }) => theme.radii.default};
  transition:
    border-color 200ms ease,
    box-shadow 200ms ease;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.neutral.background};

  border: 1px solid ${({ theme }) => theme.colors.neutral.border};
  color: ${({ theme }) => theme.colors.neutral.text};

  &[data-checked='true'] {
    border: 1px solid ${({ theme }) => theme.colors.primary.border};
  }

  &[data-error='true'] {
    border: 1px solid ${({ theme }) => theme.colors.danger.border};
  }

  &[data-disabled='true'] {
    border: 1px solid ${({ theme }) => theme.colors.neutral.borderDisabled};
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
    background: ${({ theme }) => theme.colors.neutral.backgroundDisabled};
    cursor: not-allowed;
  }

  &:hover,
  &:focus-within,
  &:active {
    &:not([data-error='true']):not([data-disabled='true']) {
      border: 1px solid ${({ theme }) => theme.colors.primary.border};
      &[data-cheked='false'] {
        box-shadow: ${({ theme }) => theme.shadows.hoverPrimary};
      }
    }
  }
`

const StyledElement = styled('div', {
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

const StyledRadio = StyledElement.withComponent(Radio)
const StyledCheckbox = StyledElement.withComponent(Checkbox)

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
  'data-testid'?: string
}

/**
 * SelectableCard is a component that can be used to create a radio or checkbox card.
 * It can be used to create a list of selectable items or a single selectable item.
 */
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
      'data-testid': dataTestId,
    }: SelectableCardProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null)

    return (
      <Tooltip text={tooltip}>
        <Container
          onClick={() => {
            if (innerRef?.current) {
              innerRef.current.click()
            }
          }}
          className={className}
          data-checked={checked}
          data-disabled={disabled}
          data-error={isError}
          data-testid={dataTestId}
          ref={ref}
        >
          {type === 'radio' ? (
            <StyledRadio
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
              label={label}
            />
          ) : (
            <StyledCheckbox
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
            </StyledCheckbox>
          )}
          {typeof children === 'function'
            ? children({ checked, disabled })
            : children}
        </Container>
      </Tooltip>
    )
  },
)
