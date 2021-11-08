import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { HTMLAttributes, ReactNode, VoidFunctionComponent } from 'react'
import { Checkbox, CheckboxHTMLProps } from 'reakit'
import { Color } from '../../theme/colors'
import Tooltip from '../Tooltip'

const PADDING = 6

const SIZES = {
  medium: {
    ball: 20,
    height: 32,
    width: 72,
  },
  small: {
    ball: 12,
    height: 24,
    width: 40,
  },
} as const

type Sizes = keyof typeof SIZES
const switchSizes = Object.keys(SIZES) as Sizes[]

const COLORS = {
  disabled: 'gray300',
  inactiveBgColor: 'gray550',
  inactiveBigBallColor: 'gray700',
  inactiveLabelColor: 'gray700',
  smallBallColor: 'gray100',
} as const

interface LabelProps {
  size?: Sizes
  onLabel?: string | ReactNode
  offLabel?: string | ReactNode
  labeled?: boolean | LabelPositions
}

// Multiplies the max number of chars between labels by a "magic" number representing the average number of pixel per char
// The goal is to stick as much as possible to real label size
// number 10 has been chosen using letter O
const labelSize = (
  onLabel: string | ReactNode,
  offLabel: string | ReactNode,
) => {
  if (typeof onLabel === 'string' && typeof offLabel === 'string') {
    return Math.max(onLabel.length, offLabel.length) * 10
  }

  return 0
}

const getSwitchWidth = ({
  width,
  onLabel,
  offLabel,
  size,
  labeled,
}: LabelProps & { width?: number }) => {
  if (width) return width
  if (!size) return 0

  if (
    typeof onLabel === 'string' &&
    typeof offLabel === 'string' &&
    (labeled === true || labeled === 'inside')
  )
    // + 20 comes from the ball size to have some space around it
    // it centers the text with 10px margin on each side
    return labelSize(onLabel, offLabel) + SIZES[size].ball + 20

  return SIZES[size].width
}

const SwitchBall = styled.span<{ size: Sizes }>`
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
    !['onLabel', 'offLabel', 'labeled', 'size'].includes(prop.toString()),
})<LabelProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ labeled, onLabel, offLabel, size }) => {
    const spanWidth = labelSize(onLabel, offLabel)
    switch (labeled) {
      case 'left':
        return `
        margin-right: 10px;
        ${spanWidth ? `width: ${spanWidth - 2}px;` : ''}
        text-align: right;
        `
      case 'right':
        return `
        margin-left: 10px;
        ${spanWidth ? `width: ${spanWidth - 2}px;` : ''}
        `
      case 'inside':
      default:
        return `
          font-weight: 700;
          font-size: 16px;
          position: absolute;
          line-height: ${SIZES[size as Sizes]?.ball}px;
          width: calc(100% - ${SIZES[size as Sizes]?.ball}px);
          `
    }
  }}
`

const labelPositions = ['left', 'right', 'inside'] as const
type LabelPositions = typeof labelPositions[number]

type VariantProps = LabelProps & {
  width?: number
}

const buildVariants =
  ({ bgColor, activeBigBallColor, activeLabelColor }: Record<string, Color>) =>
  ({
    theme,
    width,
    onLabel,
    offLabel,
    labeled,
    size,
  }: VariantProps & { theme: Theme }) =>
    css`
      &[aria-checked='true'] {
        background-color: ${theme.colors[bgColor] ?? bgColor};
      }

      &[aria-checked='true'] > ${SwitchBall} {
        transform: translateX(
            ${getSwitchWidth({
              labeled,
              offLabel,
              onLabel,
              size,
              width,
            }) -
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
    activeBigBallColor: 'gray100',
    activeLabelColor: 'gray100',
    bgColor: 'primary',
  }),
  success: buildVariants({
    activeBigBallColor: 'success',
    activeLabelColor: 'success',
    bgColor: 'foam',
  }),
} as const

type Variants = keyof typeof variants

const switchVariants = Object.keys(variants) as Variants[]

type StyledSwitchProps = HTMLAttributes<HTMLElement> &
  VariantProps & {
    variant?: Variants
    disabled?: boolean
  }

const StyledSwitch = styled('span', {
  shouldForwardProp: prop =>
    !['offLabel', 'onLabel', 'labeled', 'variant'].includes(prop.toString()),
})<StyledSwitchProps>`
  overflow: hidden;
  outline: none;
  width: ${getSwitchWidth}px;
  height: ${({ size }) => SIZES[size as Sizes]?.height}px;
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

  ${({ variant }) => variants?.[variant as Variants]}
`

const StyledCheckbox = styled(Checkbox)`
  position: absolute;
  opacity: 0.01;
`

const StyledLabel = styled.label<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`

export type SwitchProps = StyledSwitchProps & {
  id?: string
  checked?: boolean
  name: string
  tooltip?: string
  onChange?: CheckboxHTMLProps['onChange']
}

const Switch: VoidFunctionComponent<SwitchProps> = ({
  checked = false,
  disabled = false,
  id,
  name,
  onChange,
  size = 'medium',
  tooltip,
  labeled = false,
  onLabel = 'ON',
  offLabel = 'OFF',
  variant = 'primary',
  width,
}) => {
  const renderLabel = () => (
    <StyledSpan
      labeled={labeled}
      onLabel={onLabel}
      offLabel={offLabel}
      size={size}
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
  /**
   * Left and right will be outside of switch button in the contrary of inside value.
   */
  labeled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(labelPositions),
  ]),
  name: PropTypes.string.isRequired,
  /**
   * Text or node shown in switch button when its state if off
   */
  offLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onChange: PropTypes.func.isRequired,
  /**
   * Text or node shown in switch button when its state if on
   */
  onLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  size: PropTypes.oneOf(switchSizes),
  tooltip: PropTypes.string,
  variant: PropTypes.oneOf(switchVariants),
  width: PropTypes.number,
}

export default Switch
