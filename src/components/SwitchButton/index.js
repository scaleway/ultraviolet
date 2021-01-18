import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import { Radio } from 'reakit'
import { theme } from '../../theme'
import { Box } from '../Box'
import { Tooltip } from '../Tooltip'

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
      border: none;
      color: ${theme.gray700};
    }

    &[aria-checked='true'] {
      background-color: ${theme.primary};
      color: ${theme.white};
      :hover {
        color: ${theme.white};
      }
    }

    &[aria-checked='false'] {
      background-color: white;
      color: ${theme.gray700};
      border-color: ${theme.transparent};
      :hover,
      :focus {
        color: ${theme.gray700};
        border: none;
        box-shadow: none;
      }
    }
  `,
}

const active = () => css`
  &:hover,
  &:focus {
    color: ${theme.gray550};
    border-color: ${theme.primary};
  }

  &:hover {
    box-shadow: 0 0 8px 2px ${theme.gray200};
  }

  &:focus {
    box-shadow: 0 0 1px 2px ${transparentize(0.75, theme.primary)};
  }
`

const disabledClass = () => css`
  cursor: not-allowed;
  color: ${theme.gray350};
  background-color: ${theme.gray50};
  border-color: ${theme.gray350};
  pointer-events: none;
`

const StyledSwitch = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 4px;
  align-items: center;
  border-style: solid;
  border-color: ${theme.gray350};
  border-width: 1px;
  padding: 16px;
  transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;
  user-select: none;
  touch-action: manipulation;
  color: ${theme.gray550};
  font-size: 16px;
  line-height: 22px;
  position: relative;
  font-weight: 500;
  cursor: pointer;

  &[aria-checked='true'] {
    cursor: auto;
    color: ${theme.primary};
    border-color: ${theme.primary};
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
  defaultChecked,
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
        id={`${name}-${value}`}
        type="radio"
        checked={checked}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
      />
    </StyledSwitch>
  </Tooltip>
)

SwitchButton.defaultProps = {
  size: 24,
  disabled: false,
  defaultChecked: false,
  variant: 'default',
  onFocus: () => {},
  onBlur: () => {},
}

SwitchButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  variant: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  tooltip: PropTypes.string.isRequired,
}
