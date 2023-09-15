import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import type { JSX } from 'react'
import { ping } from '../../utils'
import { Tooltip } from '../Tooltip'

const HEIGHT = '10px'
const WIDTH = '10px'

const sentiments = {
  danger: ({ theme }: { theme: Theme }) => `
      background-color: ${theme.colors.danger.backgroundStrong};
    `,
  info: ({ theme }: { theme: Theme }) => `
      background-color: ${theme.colors.info.backgroundStrong};
    `,
  neutral: ({ theme }: { theme: Theme }) => `
      background-color: ${theme.colors.neutral.backgroundStronger};
    `,
  success: ({ theme }: { theme: Theme }) => `
      background-color: ${theme.colors.success.backgroundStrong};
    `,
  warning: ({ theme }: { theme: Theme }) => `
      background-color: ${theme.colors.warning.backgroundStrong};
    `,
} as const
type StatusSentiment = keyof typeof sentiments
export const statusSentiments = Object.keys(sentiments) as StatusSentiment[]

type StyledCircleProps = Pick<StatusProps, 'sentiment'>
const StyledCircle = styled.span<StyledCircleProps>`
  display: inline-block;
  width: ${WIDTH};
  height: ${HEIGHT};
  border-radius: ${({ theme }) => theme.radii.circle};
  ${({ sentiment }) => sentiments[sentiment]};
`

const StyledAnimatedCircle = styled.span<StyledCircleProps>`
  position: absolute;
  width: ${WIDTH};
  height: ${HEIGHT};
  opacity: 0.75;
  border-radius: ${({ theme }) => theme.radii.circle};
  animation: ${ping} 1.1s cubic-bezier(0, 0, 0.2, 1) infinite;
  ${({ sentiment }) => sentiments[sentiment]};
`

const Container = styled.span`
  display: flex;
  width: ${WIDTH};
  height: ${HEIGHT};
`

type StatusProps = {
  animated?: boolean
  className?: string
  sentiment: StatusSentiment
  tooltip?: string
  'data-testid'?: string
}

/**
 * Status component used to display a colored circle with a tooltip for additional information.
 */
export const Status = ({
  animated = false,
  className,
  tooltip,
  sentiment,
  'data-testid': dataTestId,
}: StatusProps): JSX.Element => (
  <Tooltip text={tooltip}>
    <Container className={className} data-testid={dataTestId}>
      {animated ? <StyledAnimatedCircle sentiment={sentiment} /> : null}
      <StyledCircle sentiment={sentiment} />
    </Container>
  </Tooltip>
)
