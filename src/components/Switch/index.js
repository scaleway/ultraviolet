import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Checkbox } from 'reakit'
import { colors } from '../../theme'
import Tooltip from '../Tooltip'

const PADDING = 6

const styles = {
  inactiveLabelColor: colors.gray700,
  inactiveBigBallColor: colors.gray700,
  inactiveBgColor: colors.gray550,
  smallBallColor: colors.gray100,
  disabled: colors.gray300,
}

const variants = {
  primary: {
    bgColor: colors.primary,
    activeLabelColor: colors.gray100,
    activeBigBallColor: colors.gray100,
  },
  success: {
    bgColor: colors.foam,
    activeLabelColor: colors.success,
    activeBigBallColor: colors.success,
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

const StyledSwitch = styled('span', {
  shouldForwardProp: prop =>
    !['offLabel', 'onLabel', 'labeled', 'labelPlacement', 'variant'].includes(
      prop,
    ),
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
      content: ${({ labeled, offLabel, labelPlacement }) =>
        `"${labeled && labelPlacement === 'inside' ? offLabel : ''}"`};
      color: ${styles.inactiveLabelColor};
      left: ${({ size }) => SIZES[size].ball}px;
    }
  }

  &[aria-checked='true'] > ${SwitchBall} {
    &:before {
      ${label}
      content: ${({ labeled, onLabel, labelPlacement }) =>
        `"${labeled && labelPlacement === 'inside' ? onLabel : ''}"`};
      color: ${({ variant }) => variants[variant].activeLabelColor};
      right: ${({ size }) => SIZES[size].ball}px;
    }
  }
`

const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  opacity: 0.01;
`

const StyledLabel = styled('label')`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Switch = ({
  checked,
  disabled,
  id,
  name,
  onChange,
  size,
  tooltip,
  labeled,
  labelPlacement,
  onLabel,
  offLabel,
  variant,
  labelRender,
  ...props
}) => (
  <Tooltip text={tooltip}>
    <StyledLabel aria-checked={checked} disabled={disabled} {...props}>
      {labeled && labelPlacement === 'left'
        ? labelRender || (
            <span
              style={{
                marginRight: 10,
                width: Math.max(onLabel.length, offLabel.length) * 10 - 2,
                textAlign: 'right',
              }}
            >
              {checked ? onLabel : offLabel}
            </span>
          )
        : null}
      <StyledSwitch
        size={size}
        aria-checked={checked}
        disabled={disabled}
        labeled={labeled}
        labelPlacement={labelPlacement}
        onLabel={onLabel}
        offLabel={offLabel}
        variant={variant}
      >
        <StyledCheckbox
          id={id || name}
          checked={checked}
          disabled={disabled}
          name={name}
          onChange={onChange}
        />
        <SwitchBall size={size} />
      </StyledSwitch>
      {labeled && labelPlacement === 'right'
        ? labelRender || (
            <span style={{ marginLeft: 10 }}>
              {checked ? onLabel : offLabel}
            </span>
          )
        : null}
    </StyledLabel>
  </Tooltip>
)

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  labeled: PropTypes.bool,
  labelPlacement: PropTypes.string,
  labelRender: PropTypes.node,
  name: PropTypes.string.isRequired,
  offLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onLabel: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(SIZES)),
  tooltip: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(variants)),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Switch.defaultProps = {
  checked: false,
  disabled: false,
  id: undefined,
  labeled: false,
  labelPlacement: 'inside',
  labelRender: null,
  offLabel: 'OFF',
  onLabel: 'ON',
  size: 'medium',
  tooltip: null,
  variant: 'primary',
  width: null,
}

export { Switch }
