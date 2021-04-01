import { css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Checkbox } from 'reakit'
import Tooltip from '../Tooltip'

const PADDING = 6

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

const COLORS = {
  inactiveLabelColor: 'gray700',
  inactiveBigBallColor: 'gray700',
  inactiveBgColor: 'gray550',
  smallBallColor: 'gray100',
  disabled: 'gray300',
}

const getSwitchWidth = ({ width, onLabel, offLabel, size, labeled }) => {
  if (width) return width

  if (
    typeof onLabel === 'string' &&
    typeof offLabel === 'string' &&
    (labeled === true || labeled === 'inside')
  )
    return (
      Math.max(onLabel.length, offLabel.length) * 10 + SIZES[size].ball + 20
    )

  return SIZES[size].width
}

const SwitchBall = styled.span`
  display: block;
  position: relative;
  border-radius: 34px;
  pointer-events: none;
  transition: all 250ms;

  width: ${({ size }) => SIZES[size].ball}px;
  height: ${({ size }) => SIZES[size].ball}px;

  background-color: ${({ size, theme }) =>
    theme.colors[
      size === 'small' ? COLORS.smallBallColor : COLORS.inactiveBigBallColor
    ]};
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

const buildVariants = ({ bgColor, activeBigBallColor, activeLabelColor }) => ({
  theme,
  width,
  onLabel,
  offLabel,
  labeled,
  size,
}) => css`
  &[aria-checked='true'] {
    background-color: ${theme.colors[bgColor] ?? bgColor};
  }

  &[aria-checked='true'] > ${SwitchBall} {
    transform: translateX(
        ${getSwitchWidth({ width, onLabel, offLabel, labeled, size }) -
        2 * PADDING}px
      )
      translateX(-100%);
    background-color: ${size === 'small'
      ? theme.colors[COLORS.smallBallColor]
      : theme.colors[activeBigBallColor] ?? activeBigBallColor};
  }

  &[aria-checked='false'] > ${StyledSpan} {
    color: ${theme.colors[COLORS.inactiveLabelColor]};
    right: 0;
  }

  &[aria-checked='true'] > ${StyledSpan} {
    color: ${theme.colors[activeLabelColor] ?? activeLabelColor};
    left: 0;
  }
`

const variants = {
  primary: buildVariants({
    bgColor: 'primary',
    activeLabelColor: 'gray100',
    activeBigBallColor: 'gray100',
  }),
  success: buildVariants({
    bgColor: 'foam',
    activeLabelColor: 'success',
    activeBigBallColor: 'success',
  }),
}

const StyledSwitch = styled('span', {
  shouldForwardProp: prop =>
    !['offLabel', 'onLabel', 'labeled', 'variant'].includes(prop),
})`
  overflow: hidden;
  outline: none;
  width: ${getSwitchWidth}px;
  height: ${({ size }) => SIZES[size].height}px;
  display: inline-flex;
  align-items: center;
  background-color: ${({ disabled, theme }) =>
    theme.colors[disabled ? COLORS.disabled : COLORS.inactiveBgColor]};
  border: none;
  border-radius: 34px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  position: relative;
  transition: all 250ms;
  padding: 0 ${PADDING}px;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  ${({ variant }) => variants[variant]}
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
