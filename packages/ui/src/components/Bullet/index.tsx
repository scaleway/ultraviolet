import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import type { ComponentProps } from 'react'
import { Icon } from '../Icon'
import { Tooltip } from '../Tooltip'

const sentiments = {
  danger: ({ theme }: { theme: Theme }) => `
    background-color: ${theme.colors.danger.background};
    color: ${theme.colors.danger.text};
  `,
  neutral: ({ theme }: { theme: Theme }) => `
    border: 1px solid ${theme.colors.neutral.borderWeak};
    background-color: ${theme.colors.neutral.background};
    color: ${theme.colors.neutral.text};
  `,
  disabled: ({ theme }: { theme: Theme }) => `
    border: 1px solid ${theme.colors.neutral.borderWeak};
    background-color: ${theme.colors.neutral.background};
    color: ${theme.colors.neutral.textWeak};
  `,
  info: ({ theme }: { theme: Theme }) => `
    background-color: ${theme.colors.info.background};
    color: ${theme.colors.info.text};
  `,
  primary: ({ theme }: { theme: Theme }) => `
    background-color: ${theme.colors.primary.background};
    color: ${theme.colors.primary.text};
  `,
  success: ({ theme }: { theme: Theme }) => `
    background-color: ${theme.colors.success.background};
    color: ${theme.colors.success.text};
  `,
  warning: ({ theme }: { theme: Theme }) => `
    background-color: ${theme.colors.warning.background};
    color: ${theme.colors.warning.text};
  `,
} as const
type BulletSentiment = keyof typeof sentiments
export const bulletSentiments = Object.keys(sentiments) as BulletSentiment[]

const sizes = {
  medium: `
    width: 32px;
    height: 32px;
    font-size: 16px;
  `,
  small: `
    width: 24px;
    height: 24px;
    font-size: 14px;
  `,
} as const
type BulletSize = keyof typeof sizes
export const bulletSizes = Object.keys(sizes) as BulletSize[]

const sentimentStyles = ({ sentiment }: { sentiment: BulletSentiment }) =>
  sentiments[sentiment]
const sizeStyles = ({ size }: { size: BulletSize }) => sizes[size]

type StyledContainerType = { sentiment: BulletSentiment; size: BulletSize }
const StyledContainer = styled('div')<StyledContainerType>`
  display: inline-flex;
  border-radius: ${({ theme }) => theme.radii.circle};
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.typography.bodyStrong.weight};
  ${sentimentStyles}
  ${sizeStyles}
`

type ContentProps =
  | { icon: ComponentProps<typeof Icon>['name']; text?: never }
  | { icon?: never; text: string }
type BulletProps = {
  className?: string
  size?: BulletSize
  tooltip?: string
  tooltipBaseId?: string
  sentiment?: BulletSentiment
  'data-testid'?: string
} & ContentProps

export const Bullet = ({
  className,
  sentiment = 'neutral',
  size = 'medium',
  icon,
  text,
  tooltip,
  tooltipBaseId,
  'data-testid': dataTestId,
}: BulletProps) => (
  <Tooltip id={tooltipBaseId} text={tooltip}>
    <StyledContainer
      sentiment={sentiment}
      size={size}
      className={className}
      data-testid={dataTestId}
    >
      {icon ? <Icon name={icon} size="50%" /> : text}
    </StyledContainer>
  </Tooltip>
)
