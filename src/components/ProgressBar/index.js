import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from '../Box'

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
  shouldForwardProp: prop => !['backgroundColor'].includes(prop),
})`
  position: relative;
  height: 4px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 2px;
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor] ?? backgroundColor};
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
  shouldForwardProp: prop => !['variant', 'value'].includes(prop),
})`
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme, variant }) =>
    theme.colors[variant] ?? undefined};
  transition: 0.3s width;
  width: ${({ value }) => Math.max(0, Math.min(100, value))}%;
`

const ProgressBar = ({
  variant,
  backgroundColor,
  value,
  progress,
  ...props
}) => (
  <StyledBox
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin="0"
    aria-valuemax="100"
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
  variant: PropTypes.oneOf(progressBarVariants),
  backgroundColor: PropTypes.string,
  value: PropTypes.number,
  progress: PropTypes.bool,
}

ProgressBar.defaultProps = {
  variant: 'primary',
  backgroundColor: 'gray300',
  value: 0,
  progress: false,
}

export default ProgressBar
