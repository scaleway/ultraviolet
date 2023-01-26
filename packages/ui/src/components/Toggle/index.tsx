import styled from '@emotion/styled'
import type { ChangeEvent, ChangeEventHandler, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

const TOGGLE_RADIUS = '24px'
const TOGGLE_POINT_RADIUS = '100px'

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
  border-radius: ${TOGGLE_RADIUS};
  position: relative;
  transition: all 300ms;
  background-color: ${({ theme }) => theme.colors.neutral.textWeak};
  width: ${({ size }) => SIZES[size].width}px;
  height: ${({ size }) => SIZES[size].height}px;

  &:after {
    content: '';
    position: absolute;
    top: ${({ size }) => SIZES[size].height / 2 - SIZES[size].ball / 2}px;
    left: 5px;
    width: ${({ size }) => SIZES[size].ball}px;
    height: ${({ size }) => SIZES[size].ball}px;
    border-radius: ${TOGGLE_POINT_RADIUS};
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    transition: all 300ms;
  }

  &:focus-within,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  &[data-disabled='false']:active:after {
    width: ${({ size }) => SIZES[size].ball * 1.3775}px;
  }

  &[data-checked='true'] {
    color: ${({ theme }) => theme.colors.neutral.textStrong};
    background-color: ${({ theme }) => theme.colors.primary.backgroundStrong};

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
    background: ${({ theme }) => theme.colors.neutral.borderWeakDisabled};

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
}>`
  display: flex;
  gap: ${({ theme }) => theme.space['1']};
  align-items: center;
  width: fit-content;
  cursor: pointer;

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
  disabled?: boolean
  className?: string
  required?: boolean
}

export const Toggle = ({
  checked = false,
  disabled = false,
  id,
  name,
  onChange,
  size = 'large',
  tooltip,
  labelPosition = 'right',
  label,
  required,
  className,
}: ToggleProps) => {
  const [state, setState] = useState(checked)

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
      >
        {label && labelPosition === 'left' ? (
          <>
            {label}
            {required ? <RequiredIcon /> : null}
          </>
        ) : null}
        <StyledToggle size={size} data-checked={state} data-disabled={disabled}>
          <StyledCheckbox
            id={id || name}
            aria-label={name}
            checked={state}
            aria-checked={state}
            disabled={disabled}
            name={name}
            onChange={onLocalChange}
            type="checkbox"
          />
        </StyledToggle>
        {label && labelPosition === 'right' ? (
          <>
            {label}
            {required ? <RequiredIcon /> : null}
          </>
        ) : null}
      </StyledLabel>
    </Tooltip>
  )
}
