import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ChangeEvent, ReactNode, useEffect, useMemo } from 'react'
import {
  Checkbox as ReakitCheckbox,
  CheckboxProps as ReakitCheckboxProps,
  useCheckboxState,
} from 'reakit/Checkbox'
import ActivityIndicator from '../ActivityIndicator'
import Box, { XStyledProps } from '../Box'
import Expandable from '../Expandable'
import Icon from '../Icon'
import Typography, { typographyVariants } from '../Typography'

const StyledCheckBoxContainer = styled(Typography)`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: ${({ 'aria-disabled': disabled }) =>
    disabled ? 'not-allowed' : 'pointer'};
`

const StyledReakitCheckbox = styled(ReakitCheckbox, {
  shouldForwardProp: prop => !['hasChildren', 'size'].includes(prop.toString()),
})<{ hasChildren: boolean }>`
  opacity: 0.01;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: absolute;
  cursor: pointer;
  margin-right: ${({ hasChildren }) => (hasChildren ? '10px' : 0)};
  padding: 2px;
  pointer-events: auto;
  &:hover {
    svg {
      border-radius: ${({ theme }) => theme.radii.default};
      background-color: ${({ theme, disabled }) =>
        !disabled && theme.colors.gray100};
      fill: ${({ theme, disabled }) => !disabled && theme.colors.primary};
      transition: fill 300ms;
    }
  }
  &:focus + svg {
    outline: 1px ${({ theme }) => theme.colors.gray550} dotted;
  }
`

const StyledIcon = styled(Icon)`
  box-sizing: content-box;
`

const StyledChildrenContainer = styled('div', {
  shouldForwardProp: prop => !['size'].includes(prop.toString()),
})``

const StyledActivityContainer = styled(ReakitCheckbox, {
  shouldForwardProp: prop => !['hasChildren'].includes(prop.toString()),
})<{ hasChildren: boolean }>`
  display: flex;
  margin-right: ${({ theme, hasChildren }) =>
    hasChildren ? theme.space['1'] : 0};
`

const StyledError = styled.div`
  font-size: '12px';
  color: ${({ theme }) => theme.colors.warning};
  padding-left: 4px;
  padding-right: 4px;
`

export type CheckboxProps = Omit<ReakitCheckboxProps, 'checked'> & {
  children?: ReactNode
  valid?: boolean
  error?: string | ReactNode
  size?: number
  progress?: boolean
  disabled?: boolean
  typographyVariant?: string
  checked?: boolean | 'indeterminate'
} & Required<Pick<ReakitCheckboxProps, 'onChange'>> &
  XStyledProps

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
  typographyVariant = 'default',
  ...props
}: CheckboxProps): JSX.Element => {
  const hasChildren = !!children
  const checkbox = useCheckboxState({ state: checked })
  const color = useMemo(() => {
    if (disabled) return 'gray100'
    if (valid === false || !!error) return 'warning'
    if (valid === true) return 'success'
    if (checkbox.state) return 'primary'

    return 'gray300'
  }, [disabled, valid, checkbox.state, error])

  const { setState } = checkbox
  useEffect(() => {
    setState(checked)
  }, [checked, setState])

  return (
    <Box {...props}>
      <StyledCheckBoxContainer
        as="label"
        variant={typographyVariant}
        aria-disabled={disabled}
      >
        <StyledReakitCheckbox
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
          hasChildren={hasChildren}
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
        {progress ? (
          <StyledActivityContainer hasChildren={hasChildren}>
            <ActivityIndicator active size={size} />
          </StyledActivityContainer>
        ) : (
          <StyledIcon
            mr={hasChildren ? '10px' : 0}
            p="2px"
            name={
              checkbox?.state
                ? 'checkbox-marked-outline'
                : 'checkbox-blank-outline'
            }
            color={color}
            size={size}
          />
        )}
        {hasChildren && (
          <StyledChildrenContainer>{children}</StyledChildrenContainer>
        )}
      </StyledCheckBoxContainer>
      <Expandable height={56} overflow="hidden" opened={!!error}>
        <StyledError>{error}</StyledError>
      </Expandable>
    </Box>
  )
}

Checkbox.propTypes = {
  autoFocus: PropTypes.bool,
  checked: PropTypes.oneOf([true, false, 'indeterminate']),
  children: PropTypes.node,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  progress: PropTypes.bool,
  size: PropTypes.number,
  typographyVariant: PropTypes.oneOf(typographyVariants),
  valid: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Checkbox
