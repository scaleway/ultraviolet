import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  ChangeEventHandler,
  ReactNode,
  VoidFunctionComponent,
} from 'react'
import Tooltip from '../Tooltip'

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

interface LabelProps {
  size?: Sizes
  onLabel?: string | ReactNode
  offLabel?: string | ReactNode
  labeled?: boolean | LabelPositions
}

const letterWidth = 9
// Multiplies the max number of chars between labels by a "magic" number representing the average number of pixel per char
// The goal is to stick as much as possible to real label size
// number 10 has been chosen using letter O
const labelSize = (
  onLabel: string | ReactNode,
  offLabel: string | ReactNode,
) => {
  if (typeof onLabel === 'string' && typeof offLabel === 'string') {
    return Math.max(onLabel.length, offLabel.length) * letterWidth
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
    return `${labelSize(onLabel, offLabel)}px`

  return 'auto'
}

const SwitchBall = styled.span``
const SwitchBallContainer = styled.div``
const StyledInsideLabel = styled.span``

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
        ${spanWidth ? `width: ${spanWidth}px;` : ''}
        text-align: right;
        `
      case 'right':
        return `
        margin-left: 10px;
        ${spanWidth ? `width: ${spanWidth}px;` : ''}
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

type Variants = 'primary' | 'success'

type StyledSwitchProps = VariantProps & {
  variant?: Variants
  disabled?: boolean
}

const SwitchVariantsStyles = {
  primary: (theme: Theme) => css`
    &[aria-checked='true'] {
      color: ${theme.colors.neutral.textStrong};
      background-color: ${theme.colors.primary.backgroundStrong};
    }

    &[aria-checked='true'] > ${StyledSpan} {
      color: ${theme.colors.neutral.textWeak};
      left: 0;
    }
  `,
  success: (theme: Theme) => css`
    &[aria-checked='true'] {
      background-color: ${theme.colors.success.backgroundStrong};
    }
  `,
}

const StyledSwitch = styled('div', {
  shouldForwardProp: prop =>
    !['offLabel', 'onLabel', 'labeled', 'variant'].includes(prop.toString()),
})<StyledSwitchProps>`
  outline: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 34px;
  position: relative;
  transition: all 250ms;
  cursor: pointer;
  padding: ${({ theme }) => theme.space[0.5]};
  height: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.neutral.background};
  min-width: ${({ theme }) => theme.space[6]};
  width: ${getSwitchWidth};
  padding-right: ${({ theme }) => theme.space[1]};

  & ${SwitchBallContainer} {
    position: absolute;
    margin-left: ${({ theme }) => theme.space[0.5]};
    margin-right: ${({ theme }) => theme.space[0.5]};
    left: 0;
    right: ${({ theme }) => theme.space[3]};
    transition: all 250ms;
    top: ${({ theme }) => theme.space[0.5]};
    bottom: 0;
  }

  & ${SwitchBall} {
    display: block;
    border-radius: 50%;
    width: ${({ theme }) => theme.space[3]};
    height: ${({ theme }) => theme.space[3]};
    background-color: ${({ theme }) => theme.colors.neutral.backgroundWeak};
  }

  &[aria-checked='true'] ${SwitchBallContainer} {
    transform: translateX(100%);
  }

  & > ${StyledInsideLabel} {
    position: absolute;
    right: ${({ theme }) => theme.space[0.5]};
  }

  &[aria-checked='true'] ${StyledInsideLabel} {
    left: ${({ theme }) => theme.space[0.5]};
    right: 0;
  }

  &[data-size='small'] {
    padding: ${({ theme }) => theme.space[0.5]};
    height: ${({ theme }) => theme.space[2]};
    min-width: ${({ theme }) => theme.space[4]};

    & ${SwitchBallContainer} {
      right: ${({ theme }) => theme.space[2]};
    }

    & ${SwitchBall} {
      width: ${({ theme }) => theme.space[2]};
      height: ${({ theme }) => theme.space[2]};
    }
  }

  &[data-variant='success'] {
    &[aria-checked='true'] {
      background-color: ${({ theme }) => theme.colors.success.backgroundStrong};
    }
  }

  ${({ theme }) =>
    Object.entries(SwitchVariantsStyles).map(
      ([key, variantFn]) => css`
        &[data-variant='${key}'] {
          ${variantFn(theme)}
        }
      `,
    )}
`

const StyledCheckbox = styled.input`
  position: absolute;
  opacity: 0.01;
`

const StyledLabel = styled.label<{ width?: number }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: ${({ width }) => (width ? `${width}px` : `fit-content`)};

  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.3;
    pointer-events: none;
  }
`

type SwitchProps = StyledSwitchProps & {
  id?: string
  checked?: boolean
  name: string
  tooltip?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
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
    <StyledInsideLabel>{checked ? onLabel : offLabel}</StyledInsideLabel>
  )

  const renderInsideLabel = labeled && labeled !== 'right' && labeled !== 'left'

  return (
    <Tooltip text={tooltip}>
      <StyledLabel
        width={width}
        aria-checked={checked}
        aria-disabled={disabled}
      >
        {labeled === 'left' ? renderLabel() : null}
        <StyledSwitch
          size={size}
          aria-checked={checked}
          disabled={disabled}
          labeled={labeled}
          onLabel={onLabel}
          offLabel={offLabel}
          variant={variant}
          data-variant={variant}
          data-size={size}
          role="checkbox"
        >
          <StyledCheckbox
            id={id || name}
            checked={checked}
            disabled={disabled}
            name={name}
            onChange={onChange}
            type="checkbox"
          />
          {renderInsideLabel ? renderLabel() : null}
          <SwitchBallContainer>
            <SwitchBall />
          </SwitchBallContainer>
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
  variant: PropTypes.oneOf(['primary', 'success']),
  width: PropTypes.number,
}

export default Switch
