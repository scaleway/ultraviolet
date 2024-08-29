import styled from '@emotion/styled'
import type {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  KeyboardEventHandler,
  ReactNode,
} from 'react'
import { forwardRef, useCallback, useRef } from 'react'
import { Checkbox, CheckboxContainer } from '../Checkbox'
import { Radio, RadioStack } from '../Radio'
import { Stack } from '../Stack'
import { Tooltip } from '../Tooltip'

const Container = styled(Stack)`
  // This is to remove the gap when there is no label because if we do not there
  // will be an empty space above the children due to the invisible input
  // if you find a better way to do this feel free to do it
  &[data-has-label='false'] > :first-child {
    margin-bottom: -${({ theme }) => theme.space['0.5']};
  }

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
  &:active {
    &:not([data-error='true']):not([data-disabled='true']) {
      border: 1px solid ${({ theme }) => theme.colors.primary.border};

      &[data-cheked='false'] {
        box-shadow: ${({ theme }) => theme.shadows.hoverPrimary};
      }
    }
  }

  ${RadioStack}, ${CheckboxContainer} {
    width: 100%;
  }
`

const StyledStack = styled(Stack)`
  &[data-has-label='true'] {
    padding-left: ${({ theme }) => theme.space['4']};
  }

  &[data-has-label='false'] {
    display: contents;
  }
`

const StyledElement = styled('div', {
  shouldForwardProp: prop => !['showTick', 'hasLabel'].includes(prop),
})<{ showTick?: boolean; hasLabel?: boolean }>`
  display: inline-flex;
  align-items: start;

  &[data-checked='true'] {
    color: ${({ theme }) => theme.colors.primary.text};
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
const OverloadedCheckbox = StyledElement.withComponent(Checkbox)
const StyledCheckbox = styled(OverloadedCheckbox)`
  label {
    width: 100%;
  }

  pointer-events: none; // Prevents the label from being clickable as we want the container to be clickable
`

export type SelectableCardProps = {
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

    const ParentContainer = useCallback(
      ({ children: subChildren }: { children: ReactNode }) => {
        if (tooltip) {
          return (
            <Stack flex={1}>
              <Tooltip text={tooltip}>{subChildren}</Tooltip>
            </Stack>
          )
        }

        return <Tooltip>{subChildren}</Tooltip>
      },
      [tooltip],
    )

    const onKeyDown: KeyboardEventHandler = useCallback(
      event => {
        if (event.key === ' ') {
          if (innerRef?.current) {
            event.preventDefault()
            innerRef.current.click()
          }
        }
      },
      [innerRef],
    )

    return (
      <ParentContainer>
        <Container
          onClick={() => {
            if (innerRef?.current) {
              innerRef.current.click()
            }
          }}
          onKeyDown={onKeyDown}
          className={className}
          data-checked={checked}
          data-disabled={disabled}
          data-error={isError}
          data-testid={dataTestId}
          data-type={type}
          data-has-label={!!label}
          ref={ref}
          alignItems="start"
          direction="column"
          gap={0.5}
          flex={1}
          tabIndex={disabled ? undefined : 0}
          role="button"
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
              tabIndex={!showTick ? -1 : undefined}
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
          {children ? (
            <StyledStack data-has-label={!!label && showTick} width="100%">
              {typeof children === 'function'
                ? children({ checked, disabled })
                : children}
            </StyledStack>
          ) : null}
        </Container>
      </ParentContainer>
    )
  },
)
