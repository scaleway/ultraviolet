import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import type { Color } from '../../theme'

const shineAnimation = keyframes`
  from {
    left: -25%;
  }

  to {
    left: 100%;
  }
`

export const progressBarVariants = ['primary', 'success', 'warning', 'info']

const StyledProgressContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: 4px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.neutral.backgroundStrong};
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
})<{ variant: string; value: number }>`
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme, variant }) =>
    theme.colors[variant as Color].backgroundStrong ?? 'inherit'};
  transition: 0.3s width;
  width: ${({ value }) => Math.max(0, Math.min(100, value))}%;
`

type ProgressBarProps = {
  variant?: string
  value?: number
  /** Put ProgressBar in a loading state */
  progress?: boolean
  className?: string
}

const ProgressBar = ({
  progress = false,
  value = 0,
  variant = 'primary',
  className,
}: ProgressBarProps) => (
  <StyledProgressContainer
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
    className={className}
  >
    {progress ? (
      <StyledProgress />
    ) : (
      <StyledFilled variant={variant} value={value} />
    )}
  </StyledProgressContainer>
)

export default ProgressBar
