import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { flash } from '../../utils'
import Tooltip from '../Tooltip'

const variants = {
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
type StatusVariant = keyof typeof variants
export const statusVariants = Object.keys(variants) as StatusVariant[]

type StyledCircleProps = Pick<StatusProps, 'variant' | 'animated'>
const StyledCircle = styled('div', {
  shouldForwardProp: prop => !['variant', 'animated'].includes(prop),
})<StyledCircleProps>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  ${({ variant }) => variants[variant]};
  ${({ animated }) =>
    animated
      ? css`
          animation: ${flash} linear 1s infinite;
        `
      : ''};
`

type StatusProps = {
  animated?: boolean
  className?: string
  variant: StatusVariant
  tooltip?: string
}

const Status = ({
  animated = false,
  className,
  tooltip,
  variant,
}: StatusProps): JSX.Element => (
  <Tooltip text={tooltip}>
    <StyledCircle className={className} animated={animated} variant={variant} />
  </Tooltip>
)

export default Status
