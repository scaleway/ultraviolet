import { css } from '@emotion/core'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Checkbox } from 'reakit'
import { theme } from '../../theme'
import { Tooltip } from '../Tooltip'

const PADDING = 6

const styles = {
  inactiveLabelColor: theme.gray700,
  inactiveBigBallColor: theme.gray700,
  inactiveBgColor: theme.gray550,
  smallBallColor: theme.gray100,
  disabled: theme.gray300,
}

const variants = {
  primary: {
    bgColor: theme.primary,
    activeLabelColor: theme.gray100,
    activeBigBallColor: theme.gray100,
  },
  success: {
    bgColor: theme.foam,
    activeLabelColor: theme.success,
    activeBigBallColor: theme.success,
  },
}

const SIZES = {
  small: {
    width: 40,
    height: 24,
    ball: 12,
  },
  medium: {
    width: 72,
    height: 32,
    ball: 20,
  },
}

const SwitchBall = styled.span`
  display: block;
  position: relative;
  border-radius: 34px;
  pointer-events: none;
  transition: all 250ms;

  width: ${({ size }) => SIZES[size].ball}px;
  height: ${({ size }) => SIZES[size].ball}px;

  background-color: ${({ size }) =>
    size === 'small' ? styles.smallBallColor : styles.inactiveBigBallColor};
`

const label = ({ size, width }) => css`
  font-weight: 800;
  font-size: 16px;
  text-align: center;
  position: absolute;
  line-height: ${SIZES[size].ball}px;
  width: ${(width || SIZES[size].width) - 2 * PADDING - SIZES[size].ball}px;
`

const StyledSwitch = styled('label', {
  shouldForwardProp: prop =>
    !['offLabel', 'onLabel', 'labeled', 'variant'].includes(prop),
})`
  overflow: hidden;
  outline: none;
  width: ${({ width, size }) => width || SIZES[size].width}px;
  height: ${({ size }) => SIZES[size].height}px;
  display: inline-flex;
  align-items: center;
  background-color: ${({ disabled }) =>
    (disabled && styles.disabled) || styles.inactiveBgColor};
  border: none;
  border-radius: 34px;
  cursor: pointer;
  position: relative;
  transition: all 250ms;
  padding: 0 ${PADDING}px;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &[aria-checked='true'] {
    background-color: ${({ variant }) => variants[variant].bgColor};
  }

  &[aria-checked='true'] > ${SwitchBall} {
    transform: translateX(
        ${({ width, size }) => (width || SIZES[size].width) - 2 * PADDING}px
      )
      translateX(-100%);
    background-color: ${({ size, variant }) =>
      size === 'small'
        ? styles.smallBallColor
        : variants[variant].activeBigBallColor};
  }

  &[aria-checked='false'] > ${SwitchBall} {
    &:after {
      ${label}
      content: ${({ labeled, offLabel }) => `"${labeled ? offLabel : ''}"`};
      color: ${styles.inactiveLabelColor};
      left: ${({ size }) => SIZES[size].ball}px;
    }
  }

  &[aria-checked='true'] > ${SwitchBall} {
    &:before {
      ${label}
      content: ${({ labeled, onLabel }) => `"${labeled ? onLabel : ''}"`};
      color: ${({ variant }) => variants[variant].activeLabelColor};
      right: ${({ size }) => SIZES[size].ball}px;
    }
  }
`

const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  opacity: 0.01;
`

const Switch = ({
  checked,
  disabled,
  name,
  onChange,
  size,
  tooltip,
  ...props
}) => (
  <Tooltip text={tooltip}>
    <StyledSwitch
      size={size}
      aria-checked={checked}
      disabled={disabled}
      {...props}
    >
      <StyledCheckbox
        checked={checked}
        disabled={disabled}
        name={name}
        onChange={onChange}
      />
      <SwitchBall size={size} />
    </StyledSwitch>
  </Tooltip>
)

Switch.propTypes = {
  tooltip: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(SIZES)),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(Object.keys(variants)),
  checked: PropTypes.bool,
  labeled: PropTypes.bool,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
}

Switch.defaultProps = {
  name: null,
  tooltip: null,
  size: 'medium',
  width: null,
  disabled: false,
  variant: 'primary',
  checked: false,
  labeled: false,
  onLabel: 'ON',
  offLabel: 'OFF',
}

export { Switch }
