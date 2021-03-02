import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import { Radio } from 'reakit'
import { colors } from '../../theme'
import { Box } from '../Box'
import Tooltip from '../Tooltip'

const variants = {
  segment: () => css`
    font-size: 14;
    height: 40px;
    transition: none;
    border-radius: 4px;
    box-shadow: none;

    &:hover,
    &:focus {
      box-shadow: none;
      border-color: ${colors.transparent};
      color: ${colors.gray700};
    }

    &[aria-checked='true'] {
      background-color: ${colors.primary};
      color: ${colors.white};
      :hover {
        color: ${colors.white};
      }
    }

    &[aria-checked='false'] {
      background-color: white;
      color: ${colors.gray700};
      border-color: ${colors.transparent};
      :hover,
      :focus {
        color: ${colors.gray700};
        border-color: ${colors.transparent};
        box-shadow: none;
      }
    }
  `,
}

const active = () => css`
  &:hover,
  &:focus {
    color: ${colors.gray550};
    border-color: ${colors.primary};
  }

  &:hover {
    box-shadow: 0 0 8px 2px ${colors.gray200};
  }

  &:focus {
    box-shadow: 0 0 1px 2px ${transparentize(0.75, colors.primary)};
  }
`

const disabledClass = () => css`
  cursor: not-allowed;
  color: ${colors.gray350};
  background-color: ${colors.gray50};
  border-color: ${colors.gray350};
  pointer-events: none;

  &[aria-checked='true'] {
    color: ${colors.gray350};
    border-color: ${colors.gray350};
  }
`

const StyledSwitch = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 4px;
  align-items: center;
  border-style: solid;
  border-color: ${colors.gray350};
  border-width: 1px;
  padding: 16px;
  transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;
  user-select: none;
  touch-action: manipulation;
  color: ${colors.gray550};
  font-size: 16px;
  line-height: 22px;
  position: relative;
  font-weight: 500;
  cursor: pointer;

  &[aria-checked='true'] {
    cursor: auto;
    color: ${colors.primary};
    border-color: ${colors.primary};
  }

  ${({ checked, disabled }) => !checked && !disabled && active}
  ${({ disabled }) => disabled && disabledClass}
  ${({ variant }) => variant && variants[variant]}
`

const StyledRadio = styled(Radio)`
  position: absolute;
  opacity: 0.01;
`

export const SwitchButton = ({
  checked,
  disabled,
  onChange,
  onFocus,
  onBlur,
  name,
  value,
  size,
  children,
  tooltip,
  variant,
  ...props
}) => (
  <Tooltip text={tooltip}>
    <StyledSwitch
      as="label"
      htmlFor={`${name}-${value}`}
      disabled={disabled}
      variant={variant}
      checked={checked}
      aria-checked={checked}
      {...props}
    >
      {typeof children === 'function'
        ? children({ checked, disabled })
        : children}
      <StyledRadio
        checked={checked}
        disabled={disabled}
        id={`${name}-${value}`}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        type="radio"
        value={value}
      />
    </StyledSwitch>
  </Tooltip>
)

SwitchButton.defaultProps = {
  size: 24,
  disabled: false,
  checked: false,
  variant: 'default',
  onFocus: null,
  onBlur: null,
  tooltip: null,
}

SwitchButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  size: PropTypes.number,
  variant: PropTypes.string,
  tooltip: PropTypes.string,
}
