import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { ping } from '../../utils'
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

type StyledCircleProps = Pick<StatusProps, 'variant'>
const StyledCircle = styled.span<StyledCircleProps>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: ${({ theme }) => theme.radii.circle};
  ${({ variant }) => variants[variant]};
`

const StyledAnimatedCircle = styled.span<StyledCircleProps>`
  position: absolute;
  width: 10px;
  height: 10px;
  opacity: 0.75;
  border-radius: ${({ theme }) => theme.radii.circle};
  animation: ${ping} 1.1s cubic-bezier(0, 0, 0.2, 1) infinite;
  ${({ variant }) => variants[variant]};
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
    {animated ? <StyledAnimatedCircle variant={variant} /> : null}
    <StyledCircle className={className} variant={variant} />
  </Tooltip>
)

export default Status
