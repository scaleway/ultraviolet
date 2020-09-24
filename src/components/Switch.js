import styled from '@emotion/styled'
import { Switch as BaseSwitch } from '@smooth-ui/core-em'
import PropTypes from 'prop-types'
import React from 'react'
import { Tooltip } from './Tooltip'
import { Box } from './Box'
import { gray700, gray550, gray100, ngray300, primary, foam, success } from '../theming'

const variants = {
  inactiveLabelColor: gray700,
  inactiveBigBallColor: gray700,
  inactiveBgColor: gray550,
  smallBallColor: gray100,
  disabled: ngray300,

  primary: {
    bgColor: primary,
    activeLabelColor: gray100,
    activeBigBallColor: gray100,
  },
  success: {
    bgColor: foam,
    activeLabelColor: success,
    activeBigBallColor: success,
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
  width: ${p => p.width || SIZES[p.size].width}px;
  height: ${p => SIZES[p.size].height}px;
  display: inline-flex;

  .sui-switch-wrapper {
    border: none;
    width: ${p => p.width || SIZES[p.size].width}px;
    height: ${p => SIZES[p.size].height}px;
    background-color: ${p =>
  (p.disabled && variants.disabled) || variants.inactiveBgColor};
  }

  .sui-switch-content {
    height: ${p => SIZES[p.size].height}px;
    transform: translateX(
      ${p => (p.width ? 36 - p.width : SIZES[p.size].off)}px
    );
  }

  .sui-switch-ball {
    background-color: ${p =>
  p.size === 'small'
    ? variants.smallBallColor
    : variants.inactiveBigBallColor};
    width: ${p => SIZES[p.size].ball}px;
    height: ${p => SIZES[p.size].ball}px;
  }

  .sui-switch-label {
    width: ${p => (p.width ? p.width - 30 : SIZES[p.size].label)}px;
    font-size: 16px;

    &.sui-switch-label-on {
      color: ${p => variants[p.variant].activeLabelColor};
    }

    &.sui-switch-label-off {
      color: ${variants.inactiveLabelColor};
    }
  }

  input:checked + .sui-switch-wrapper {
    background-color: ${p => variants[p.variant].bgColor};
    .sui-switch-content {
      transform: translateX(${p => SIZES[p.size].on}px);
    }

    .sui-switch-ball {
      background-color: ${p =>
  p.size === 'small'
    ? variants.smallBallColor
    : variants[p.variant].activeBigBallColor};
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
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'primary']),
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
