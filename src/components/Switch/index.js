import styled from '@emotion/styled'
import { Switch as BaseSwitch } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import React from 'react'
import { theme } from '../../theme'
import { Box } from '../Box'
import { Tooltip } from '../Tooltip'

const variants = {
  inactiveLabelColor: theme.gray700,
  inactiveBigBallColor: theme.gray700,
  inactiveBgColor: theme.gray550,
  smallBallColor: theme.gray100,
  disabled: theme.ngray300,

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
    off: -4,
    on: 12,
    ball: 12,
    label: 10,
  },
  medium: {
    width: 72,
    height: 32,
    off: -36,
    on: 5,
    ball: 20,
    label: 42,
  },
}

const StyledSwitch = styled(BaseSwitch)`
  width: ${({ width, size }) => width || SIZES[size].width}px;
  height: ${({ size }) => SIZES[size].height}px;
  display: inline-flex;

  .sui-switch-wrapper {
    border: none;
    width: ${({ width, size }) => width || SIZES[size].width}px;
    height: ${({ size }) => SIZES[size].height}px;
    background-color: ${({ disabled }) =>
      (disabled && variants.disabled) || variants.inactiveBgColor};
  }

  .sui-switch-content {
    height: ${({ size }) => SIZES[size].height}px;
    transform: translateX(
      ${({ width, size }) => (width ? 36 - width : SIZES[size].off)}px
    );
  }

  .sui-switch-ball {
    background-color: ${({ size }) =>
      size === 'small'
        ? variants.smallBallColor
        : variants.inactiveBigBallColor};
    width: ${({ size }) => SIZES[size].ball}px;
    height: ${({ size }) => SIZES[size].ball}px;
  }

  .sui-switch-label {
    width: ${({ width, size }) => (width ? width - 30 : SIZES[size].label)}px;
    font-size: 16px;

    &.sui-switch-label-on {
      color: ${({ variant }) => variants[variant].activeLabelColor};
    }

    &.sui-switch-label-off {
      color: ${variants.inactiveLabelColor};
    }
  }

  input:checked + .sui-switch-wrapper {
    background-color: ${({ variant }) => variants[variant].bgColor};
    .sui-switch-content {
      transform: translateX(${({ size }) => SIZES[size].on}px);
    }

    .sui-switch-ball {
      background-color: ${({ size, variant }) =>
        size === 'small'
          ? variants.smallBallColor
          : variants[variant].activeBigBallColor};
    }
  }

  &:hover,
  &:focus {
    input {
      cursor: pointer;
    }
  }
`

StyledSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'primary']),
  size: PropTypes.string,
}

StyledSwitch.defaultProps = {
  variant: 'primary',
  size: 'medium',
}

export const Switch = ({ tooltip, ...props }) => (
  <Tooltip text={tooltip}>
    <Box style={{ lineHeight: 1 }}>
      <StyledSwitch
        {...props}
        style={{ pointerEvents: props.disabled ? 'none' : 'auto' }}
      />
    </Box>
  </Tooltip>
)
