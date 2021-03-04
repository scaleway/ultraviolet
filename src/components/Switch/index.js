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

const StyledSpan = styled('span', {
  shouldForwardProp: prop =>
    !['onLabel', 'offLabel', 'labeled', 'size', 'width'].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ labeled, onLabel, offLabel, size }) => {
    const spanWidth = Math.max(onLabel.length, offLabel.length) * 10 - 2
    switch (labeled) {
      case 'left':
        return `
        margin-right: 10px;
        width: ${spanWidth}px;
        text-align: right;
        `
      case 'right':
        return `
        margin-left: 10px;
        width: ${spanWidth}px;
        `
      case 'inside':
      default:
        return `
          font-weight: 700;
          font-size: 16px;
          position: absolute;
          line-height: ${SIZES[size].ball}px;
          width: calc(100% - ${SIZES[size].ball}px);
          `
    }
  }}
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
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
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

  &[aria-checked='false'] > ${StyledSpan} {
    color: ${styles.inactiveLabelColor};
    right: 0;
  }

  &[aria-checked='true'] > ${StyledSpan} {
    color: ${({ variant }) => variants[variant].activeLabelColor};
    left: 0;
  }
`

const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  opacity: 0.01;
`

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
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
  onLabel,
  offLabel,
  variant,
  width,
}) => {
  const renderLabel = () => (
    <StyledSpan
      labeled={labeled}
      onLabel={onLabel}
      offLabel={offLabel}
      size={size}
      width={width}
    >
      {checked ? onLabel : offLabel}
    </StyledSpan>
  )

  const renderInsideLabel = labeled && labeled !== 'right' && labeled !== 'left'

  return (
    <Tooltip text={tooltip}>
      <StyledLabel aria-checked={checked} disabled={disabled}>
        {labeled === 'left' ? renderLabel() : null}
        <StyledSwitch
          size={size}
          aria-checked={checked}
          disabled={disabled}
          labeled={labeled}
          onLabel={onLabel}
          offLabel={offLabel}
          variant={variant}
          width={width}
        >
          <StyledCheckbox
            id={id || name}
            checked={checked}
            disabled={disabled}
            name={name}
            onChange={onChange}
          />
          {renderInsideLabel ? renderLabel() : null}
          <SwitchBall size={size} />
        </StyledSwitch>
        {labeled === 'right' ? renderLabel() : null}
      </StyledLabel>
    </Tooltip>
  )
}

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  labeled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['inside', 'left', 'right']),
  ]),
  name: PropTypes.string.isRequired,
  offLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func.isRequired,
  onLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
  offLabel: 'OFF',
  onLabel: 'ON',
  size: 'medium',
  tooltip: undefined,
  variant: 'primary',
  width: undefined,
}

export default Switch
