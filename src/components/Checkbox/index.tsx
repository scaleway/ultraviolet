import styled from '@emotion/styled'
import React, { ChangeEvent, ReactNode, useEffect, useMemo } from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitCheckboxProps,
  useCheckboxState,
} from 'reakit/Checkbox'
import Icon from '../Icon'
import Loader from '../Loader'
import Typography from '../Typography'

const StyledError = styled(Typography)`
  padding: ${({ theme }) => `0 ${theme.space['0.5']}`};
`

const StyledIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.space['1']};
  border-radius: ${({ theme }) => theme.radii.default};
  color: ${({ theme }) => theme.colors.neutral.textWeak};
`

const StyledReakitCheckbox = styled(ReakitCheckbox, {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})`
  opacity: 0.01;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
  cursor: pointer;
  pointer-events: auto;
`

const StyledCheckBoxContainer = styled(Typography)`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: ${({ 'aria-disabled': disabled }) =>
    disabled ? 'not-allowed' : 'pointer'};

  ${StyledReakitCheckbox}[aria-checked="true"][aria-invalid="false"] + ${StyledIcon}, 
  ${StyledReakitCheckbox}[aria-checked="mixed"][aria-invalid="false"] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.primary.text};
  }

  ${StyledReakitCheckbox}[aria-invalid="true"] + ${StyledIcon} {
    fill: ${({ theme }) => theme.colors.danger.text};
  }

  :hover,
  :focus {
    ${StyledReakitCheckbox}[aria-checked="true"][aria-invalid="false"] + ${StyledIcon}, 
    ${StyledReakitCheckbox}[aria-checked="mixed"][aria-invalid="false"] + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.primary.background};
    }

    ${StyledReakitCheckbox}[aria-checked="false"][aria-invalid="false"] + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.primary.background};
      fill: ${({ theme }) => theme.colors.primary.text};
    }

    ${StyledReakitCheckbox}[aria-invalid="true"] + ${StyledIcon} {
      background-color: ${({ theme }) => theme.colors.danger.background};
      fill: ${({ theme }) => theme.colors.danger.text};
    }
  }
`

const StyledActivityContainer = styled('div', {
  shouldForwardProp: prop => !['hasChildren'].includes(prop.toString()),
})<{ hasChildren: boolean }>`
  display: inline;
  vertical-align: middle;
  margin-right: ${({ theme, hasChildren }) =>
    hasChildren ? theme.space[1] : 0};
`

type CheckboxProps = Omit<ReakitCheckboxProps, 'checked'> & {
  children?: ReactNode
  valid?: boolean
  error?: string | ReactNode
  size?: number
  progress?: boolean
  disabled?: boolean
  checked?: boolean | 'indeterminate'
  className?: string
} & Required<Pick<ReakitCheckboxProps, 'onChange'>>

const Checkbox = ({
  checked = false,
  onChange,
  onFocus,
  onBlur,
  valid,
  error,
  name = 'checkbox',
  value,
  size = 24,
  children,
  progress = false,
  disabled = false,
  autoFocus = false,
  className,
}: CheckboxProps) => {
  const hasChildren = !!children
  const checkbox = useCheckboxState({ state: checked })

  const icon = useMemo(() => {
    if (checkbox.state === 'indeterminate') return 'minus-box-outline'
    if (checkbox.state) return 'checkbox-marked-outline'

    return 'checkbox-blank-outline'
  }, [checkbox?.state])

  const { setState } = checkbox
  useEffect(() => {
    setState(checked)
  }, [checked, setState])

  return (
    <div className={className}>
      {progress ? (
        <StyledActivityContainer hasChildren={hasChildren}>
          <Loader active size={size} />
        </StyledActivityContainer>
      ) : null}
      <StyledCheckBoxContainer as="label">
        <StyledReakitCheckbox
          aria-disabled={disabled}
          aria-invalid={valid === false || !!error}
          aria-describedby="hint"
          aria-checked={
            checkbox.state === 'indeterminate'
              ? 'mixed'
              : (checkbox.state as boolean)
          }
          checked={
            checkbox.state === 'indeterminate'
              ? false
              : (checkbox.state as boolean)
          }
          size={size}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (!progress) onChange(e)
            setState(e.target.checked)
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          value={value}
          name={name}
          autoFocus={autoFocus}
        />
        {!progress ? (
          <StyledIcon name={icon} size={size} disabled={disabled} />
        ) : null}
        {children}
      </StyledCheckBoxContainer>
      {error ? (
        <StyledError id="hint" as="p" variant="bodyB" color="danger">
          {error}
        </StyledError>
      ) : null}
    </div>
  )
}

export default Checkbox
