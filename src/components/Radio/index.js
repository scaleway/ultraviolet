import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import { Radio as ReakitRadio } from 'reakit'
import { theme } from '../../theme'
import { Box } from '../Box'
import { Icon } from '../Icon'

const StyledIcon = styled(Icon)``

const IconContainer = styled(Box)`
  min-width: 32px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

const disabledClass = () => css`
  color: ${theme.gray300};
  cursor: not-allowed;
`

const activeFocusClass = () => css`
  :hover,
  :focus {
    ${IconContainer} {
      background-color: ${transparentize(0.75, theme.gray300)};
      border-radius: 50%;

      > ${StyledIcon} {
        fill: ${theme.primary};
      }
    }
  }
`

const StyledBox = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  height: 32px;
  cursor: pointer;

  ${({ disabled }) => disabled && disabledClass}
  ${({ disabled }) => !disabled && activeFocusClass}
`

const StyledRadio = styled(ReakitRadio)`
  position: absolute;
  opacity: 0.01;
`

export const Radio = ({
  checked,
  onChange,
  onFocus,
  onBlur,
  disabled,
  name,
  value,
  size,
  children,
  ...props
}) => (
  <StyledBox
    as="label"
    htmlFor={`${name}-${value}`}
    disabled={disabled}
    {...props}
  >
    <IconContainer>
      <StyledIcon
        name={checked ? 'radiobox-marked' : 'radiobox-blank'}
        color={checked ? 'primary' : 'gray300'}
        size={size}
      />
    </IconContainer>
    {children}
    <StyledRadio
      type="radio"
      id={`${name}-${value}`}
      checked={checked}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      name={name}
    />
  </StyledBox>
)

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  size: PropTypes.number,
}

Radio.defaultProps = {
  size: 24,
  disabled: false,
  checked: false,
  onFocus: null,
  onBlur: null,
}
