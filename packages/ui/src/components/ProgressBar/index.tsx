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

export const progressBarSentiments = [
  'primary',
  'success',
  'warning',
  'info',
] as const

const StyledProgressContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: 4px;
  margin-left: 0;
  margin-right: 0;
  border-radius: ${({ theme }) => theme.radii.default};
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
  shouldForwardProp: prop => !['sentiment', 'value'].includes(prop),
})<{ sentiment: string; value: number }>`
  border-radius: ${({ theme }) => theme.radii.default};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme, sentiment }) =>
    theme.colors[sentiment as Color].backgroundStrong ?? 'inherit'};
  transition: 0.3s width;
  width: ${({ value }) => Math.max(0, Math.min(100, value))}%;
`

type ProgressBarProps = {
  sentiment?: (typeof progressBarSentiments)[number]
  value?: number
  /** Put ProgressBar in a loading state */
  progress?: boolean
  className?: string
  'data-testid'?: string
}

/**
 * Progress bar component to display progress of a task. Can be used to display progress of a form or a loading state.
 */
export const ProgressBar = ({
  progress = false,
  value = 0,
  sentiment = 'primary',
  className,
  'data-testid': dataTestId,
}: ProgressBarProps) => (
  <StyledProgressContainer
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
    className={className}
    data-testid={dataTestId}
  >
    {progress ? (
      <StyledProgress />
    ) : (
      <StyledFilled sentiment={sentiment} value={value} />
    )}
  </StyledProgressContainer>
)
