import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { VoidFunctionComponent } from 'react'
import { Color } from '../../theme/colors'
import Box, { BoxProps } from '../Box'

const shineAnimation = keyframes`
  from {
    left: -25%;
  }

  to {
    left: 100%;
  }
`

export const progressBarVariants = ['primary', 'success', 'warning', 'info']

const StyledBox = styled(Box, {
  shouldForwardProp: prop => !['backgroundColor'].includes(prop.toString()),
})<{ backgroundColor: string }>`
  position: relative;
  height: 4px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 2px;
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor as Color] ?? backgroundColor};
`

const StyledProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 25%;
  opacity: 0.8;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0)
  );
  animation: ${shineAnimation} 1s linear infinite;
`

const StyledFilled = styled('div', {
  shouldForwardProp: prop => !['variant', 'value'].includes(prop.toString()),
})<{ variant: string; value: number }>`
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme, variant }) =>
    theme.colors[variant as Color] ?? 'inherit'};
  transition: 0.3s width;
  width: ${({ value }) => Math.max(0, Math.min(100, value))}%;
`

export type ProgressBarProps = {
  variant?: string
  backgroundColor?: string
  value?: number
  progress?: boolean
} & BoxProps

const ProgressBar: VoidFunctionComponent<ProgressBarProps> = ({
  backgroundColor = 'gray300',
  progress = false,
  value = 0,
  variant = 'primary',
  ...props
}) => (
  <StyledBox
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
    backgroundColor={backgroundColor}
    {...props}
  >
    {progress ? (
      <StyledProgress />
    ) : (
      <StyledFilled variant={variant} value={value} />
    )}
  </StyledBox>
)

ProgressBar.propTypes = {
  backgroundColor: PropTypes.string,
  /**
   * Put ProgressBar in a loading state
   */
  progress: PropTypes.bool,
  value: PropTypes.number,
  variant: PropTypes.oneOf(progressBarVariants),
}

export default ProgressBar
