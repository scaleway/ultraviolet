import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef, useCallback, useEffect, useId, useState } from 'react'
import { Row } from '../Row'
import { Stack } from '../Stack'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

export const SIZES = {
  large: {
    ball: 16,
    height: 24,
    width: 48,
  },
  small: {
    ball: 12,
    height: 20,
    width: 40,
  },
} as const

const StyledToggle = styled.div<{
  'data-checked': boolean
  'data-disabled': boolean
  size: 'small' | 'large'
}>`
  box-sizing: content-box;
  outline: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.radii.xlarge};
  position: relative;
  transition: all 300ms;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
  width: ${({ size }) => SIZES[size].width}px;
  height: ${({ size }) => SIZES[size].height}px;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.neutral.backgroundStrongHover};
  }

  &:after {
    content: '';
    position: absolute;
    top: ${({ size }) => SIZES[size].height / 2 - SIZES[size].ball / 2}px;
    left: 5px;
    width: ${({ size }) => SIZES[size].ball}px;
    height: ${({ size }) => SIZES[size].ball}px;
    border-radius: ${({ theme }) => theme.radii.circle};
    background-color: ${({ theme }) => theme.colors.neutral.background};
    transition: all 300ms;
  }

  &:focus-within,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.focusNeutral};
  }

  &[data-disabled='false']:active:after {
    width: ${({ size }) => SIZES[size].ball * 1.3775}px;
  }

  &[data-checked='true'] {
    color: ${({ theme }) => theme.colors.neutral.textStrong};
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};

    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.primary.backgroundStrongHover};
    }

    &:after {
      left: calc(100% - 5px);
      transform: translateX(-100%);
    }

    &:focus-within,
    &:focus {
      box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
    }
  }

  &[data-disabled='true'] {
    background: ${({ theme }) => theme.colors.neutral.backgroundStrongDisabled};

    &[data-checked='true'] {
      background: ${({ theme }) =>
        theme.colors.primary.backgroundStrongDisabled};
    }
  }
`

const StyledCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &[disabled] {
    cursor: not-allowed;
  }
`

const StyledLabel = styled.label<{
  size: 'small' | 'large'
  labelPosition: 'left' | 'right'
}>`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  align-items: start;
  width: fit-content;
  cursor: pointer;
  flex-direction: ${({ labelPosition }) =>
    labelPosition === 'left' ? 'row' : 'row-reverse'};

  &:active ${StyledToggle}[data-disabled='false']:after {
    width: ${({ size }) => SIZES[size].ball * 1.3775}px;
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
  }
`

const RequiredIcon = () => (
  <sup>
    <Icon name="asterisk" size={10} color="danger" />
  </sup>
)

type ToggleProps = {
  id?: string
  checked?: boolean
  name: string
  tooltip?: string
  /**
   * If `onChange` is given component will work as a controlled component if not it will work as an uncontrolled component.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>
  size?: 'large' | 'small'
  labelPosition?: 'left' | 'right'
  label?: ReactNode
  helper?: ReactNode
  disabled?: boolean
  className?: string
  required?: boolean
  'data-testid'?: string
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'value'>

/**
 * Toggle component is used to toggle between two states (on/off, true/false, etc.).
 */
export const Toggle = forwardRef(
  (
    {
      checked = false,
      disabled = false,
      id,
      name,
      onChange,
      size = 'large',
      tooltip,
      labelPosition = 'right',
      label,
      helper,
      required,
      className,
      'data-testid': dataTestId,
      value,
    }: ToggleProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const [state, setState] = useState(checked)
    const uniqueId = useId()

    const onLocalChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange?.(event)
        else setState(event.target.checked)
      },
      [onChange, setState],
    )

    useEffect(() => {
      setState(checked)
    }, [checked, setState])

    return (
      <Tooltip text={tooltip}>
        <StyledLabel
          aria-disabled={disabled}
          size={size}
          onClick={evt => evt.stopPropagation()}
          className={className}
          data-testid={dataTestId}
          labelPosition={labelPosition}
        >
          <Stack gap={0.25} alignItems="baseline">
            {label ? (
              <Row templateColumns="auto 1fr" gap={1} alignItems="center">
                {label}
                {required ? <RequiredIcon /> : null}
              </Row>
            ) : null}
            {helper ? (
              <Text as="p" variant="bodySmall" prominence="weak">
                {helper}
              </Text>
            ) : null}
          </Stack>
          <StyledToggle
            size={size}
            data-checked={state}
            data-disabled={disabled}
          >
            <StyledCheckbox
              id={id || uniqueId}
              checked={state}
              aria-checked={state}
              disabled={disabled}
              name={name}
              onChange={onLocalChange}
              type="checkbox"
              ref={ref}
              value={value}
            />
          </StyledToggle>
        </StyledLabel>
      </Tooltip>
    )
  },
)
