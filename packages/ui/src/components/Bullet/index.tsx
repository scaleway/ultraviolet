import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons/legacy'
import type { ComponentProps } from 'react'
import { SENTIMENTS, SENTIMENTS_WITHOUT_NEUTRAL } from '../../theme'
import type { XOR } from '../../types'
import capitalize from '../../utils/capitalize'
import { Tooltip } from '../Tooltip'

export const PROMINENCES = {
  default: 'default',
  strong: 'strong',
}

type ProminenceType = keyof typeof PROMINENCES
const BULLET_SENTIMENTS = [...SENTIMENTS, 'disabled']

type BulletSentiment = (typeof BULLET_SENTIMENTS)[number]

const sizes = ({ theme }: { theme: Theme }) =>
  ({
    medium: `
    width: ${theme.sizing['400']};
    height: ${theme.sizing['400']};
    font-size: ${theme.typography.body.fontSize}};
  `,
    small: `
    width: ${theme.sizing['300']};
    height: ${theme.sizing['300']};
    font-size: ${theme.typography.bodySmall.fontSize};
  `,
  }) as const
type BulletSize = 'medium' | 'small'

const sentimentStyles = ({
  theme,
  prominence,
}: {
  theme: Theme
  prominence: ProminenceType
}) => {
  const definedProminence =
    prominence === PROMINENCES.strong ? capitalize(PROMINENCES.strong) : ''

  const text = `text${definedProminence}`
  const background = `background${definedProminence}`

  return {
    ...SENTIMENTS_WITHOUT_NEUTRAL.reduce(
      (reducer, sentiment) => ({
        ...reducer,
        [sentiment]: `
      color: ${
        theme.colors[sentiment][text as keyof typeof theme.colors.primary]
      };
      background: ${
        theme.colors[sentiment][background as keyof typeof theme.colors.primary]
      };
      border: 1px solid ${
        theme.colors[sentiment][background as keyof typeof theme.colors.primary]
      };
    `,
      }),
      {},
    ),
    neutral: `
      color: ${
        prominence === PROMINENCES.strong
          ? theme.colors.neutral[text as keyof typeof theme.colors.neutral]
          : theme.colors.neutral.text
      };
      background: ${theme.colors.neutral.background};
      border: 1px solid ${theme.colors.neutral.border};
    `,
    disabled: `
      color: ${theme.colors.neutral.textWeak};
      background: ${theme.colors.neutral.backgroundStrong};
      border: none;
    `,
  }
}

const sizeStyles = ({ size, theme }: { size: BulletSize; theme: Theme }) =>
  sizes({ theme })[size]

type StyledContainerType = {
  sentiment: BulletSentiment
  size: BulletSize
  prominence: ProminenceType
}
const StyledContainer = styled('div')<StyledContainerType>`
  display: inline-flex;
  border-radius: ${({ theme }) => theme.radii.circle};
  justify-content: center;
  align-items: center;
  ${({ theme, prominence, sentiment }) =>
    (sentimentStyles({ theme, prominence }) as Record<BulletSentiment, string>)[
      sentiment
    ]}
  ${sizeStyles}
`

type ContentProps = XOR<
  [
    {
      icon: ComponentProps<typeof Icon>['name']
      iconVariant?: ComponentProps<typeof Icon>['variant']
    },
    {
      text: string
    },
  ]
>
type BulletProps = {
  className?: string
  size?: BulletSize
  tooltip?: string
  tooltipBaseId?: string
  sentiment?: BulletSentiment
  'data-testid'?: string
  prominence?: ProminenceType
} & ContentProps

/**
 * Bullet component is used to display a small icon or text with a colored background in a circle.
 */
export const Bullet = ({
  className,
  sentiment = 'neutral',
  size = 'medium',
  icon,
  iconVariant,
  text,
  tooltip,
  tooltipBaseId,
  'data-testid': dataTestId,
  prominence = 'default',
}: BulletProps) => (
  <Tooltip id={tooltipBaseId} text={tooltip}>
    <StyledContainer
      sentiment={sentiment}
      size={size}
      className={className}
      data-testid={dataTestId}
      prominence={prominence}
    >
      {icon ? <Icon name={icon} size="small" variant={iconVariant} /> : text}
    </StyledContainer>
  </Tooltip>
)
