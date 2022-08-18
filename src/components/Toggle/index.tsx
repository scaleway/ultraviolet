import styled from '@emotion/styled'
import {
  ChangeEvent,
  ChangeEventHandler,
  ReactNode,
  useCallback,
  useState,
} from 'react'
import Tooltip from '../Tooltip'

const SIZES = {
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
  'data-size': 'small' | 'large'
}>`
  box-sizing: content-box;
  outline: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 34px;
  position: relative;
  transition: all 300ms;
  background-color: ${({ theme }) => theme.colors.neutral.textWeak};
  width: ${({ 'data-size': dataSize }) => SIZES[dataSize].width}px;
  height: ${({ 'data-size': dataSize }) => SIZES[dataSize].height}px;

  &:after {
    content: '';
    position: absolute;
    top: ${({ 'data-size': dataSize }) =>
      SIZES[dataSize].height / 2 - SIZES[dataSize].ball / 2}px;
    left: 5px;
    width: ${({ 'data-size': dataSize }) => SIZES[dataSize].ball}px;
    height: ${({ 'data-size': dataSize }) => SIZES[dataSize].ball}px;
    border-radius: 100px;
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
    transition: all 300ms;
  }

  &:focus-within,
  &:focus {
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  &[data-disabled='false']:active:after {
    width: ${({ 'data-size': dataSize }) => SIZES[dataSize].ball * 1.3775}px;
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
  'data-size': 'small' | 'large'
}>`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:active ${StyledToggle}[data-disabled='false']:after {
    width: ${({ 'data-size': dataSize }) => SIZES[dataSize].ball * 1.3775}px;
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.neutral.textDisabled};
  }
`

const StyledLabelContent = styled.span<{
  labelPosition: 'left' | 'right'
}>`
  ${({ theme, labelPosition }) =>
    labelPosition === 'left'
      ? `margin-right: ${theme.space['1']}`
      : `margin-left: ${theme.space['1']}`}
`

const LabelContent = ({
  label,
  labelPosition,
}: Required<Pick<ToggleProps, 'label' | 'labelPosition'>>) => {
  if (typeof label === 'string') {
    return (
      <StyledLabelContent labelPosition={labelPosition}>
        {label}
      </StyledLabelContent>
    )
  }

  return <>{label}</>
}

type ToggleProps = {
  id?: string
  checked?: boolean
  name: string
  tooltip?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  size?: 'large' | 'small'
  labelPosition?: 'left' | 'right'
  label?: ReactNode
  disabled?: boolean
}

const Toggle = ({
  checked = false,
  disabled = false,
  id,
  name,
  onChange,
  size = 'large',
  tooltip,
  labelPosition = 'right',
  label,
}: ToggleProps) => {
  const [state, setState] = useState(checked)

  const onLocalChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event)
      setState(event.target.checked)
    },
    [onChange, setState],
  )

  return (
    <Tooltip text={tooltip}>
      <StyledLabel
        aria-disabled={disabled}
        data-size={size}
        onClick={evt => evt.stopPropagation()}
      >
        {label && labelPosition === 'left' ? (
          <LabelContent label={label} labelPosition={labelPosition} />
        ) : null}
        <StyledToggle
          data-size={size}
          data-checked={state}
          data-disabled={disabled}
        >
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
          <LabelContent label={label} labelPosition={labelPosition} />
        ) : null}
      </StyledLabel>
    </Tooltip>
  )
}

export default Toggle
