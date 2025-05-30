'use client'

import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons/legacy'
import type { ComponentProps, ReactNode } from 'react'
import { SENTIMENTS, SENTIMENTS_WITHOUT_NEUTRAL } from '../../theme'
import capitalize from '../../utils/capitalize'
import { Tooltip } from '../Tooltip'

export const PROMINENCES = {
  default: 'default',
  strong: 'strong',
}

type ProminenceType = keyof typeof PROMINENCES
const BULLET_SENTIMENTS = [...SENTIMENTS, 'disabled']

type BulletSentiment = (typeof BULLET_SENTIMENTS)[number]

// Values are then used as theme.sizing[X]
const SIZES = {
  xxsmall: '200',
  xsmall: '250',
  small: '300',
  medium: '400',
} as const

const TEXT_VARIANT = {
  xxsmall: 'captionSmallStrong',
  xsmall: 'caption',
  small: 'bodySmall',
  medium: 'body',
} as const

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

type StyledContainerType = {
  sentiment: BulletSentiment
  size: keyof typeof SIZES
  prominence: ProminenceType
}

const StyledContainer = styled('div')<StyledContainerType>`
  display: flex;
  border-radius: ${({ theme }) => theme.radii.circle};
  justify-content: center;
  align-items: center;
  width: ${({ size, theme }) => theme.sizing[SIZES[size]]};
  height: ${({ size, theme }) => theme.sizing[SIZES[size]]};
  font-size: ${({ size, theme }) => theme.typography[TEXT_VARIANT[size]].fontSize};
  ${({ theme, prominence, sentiment }) =>
    (sentimentStyles({ theme, prominence }) as Record<BulletSentiment, string>)[
      sentiment
    ]};
`

type BulletProps = {
  className?: string
  size?: keyof typeof SIZES
  tooltip?: string
  tooltipBaseId?: string
  sentiment?: BulletSentiment
  'data-testid'?: string
  prominence?: ProminenceType
  children?: ReactNode
  /**
   * @deprecated Add the icon directly into the children
   */
  icon?: ComponentProps<typeof Icon>['name']
  /**
   * @deprecated Add the icon directly into the children
   */
  iconVariant?: ComponentProps<typeof Icon>['variant']
  /**
   * @deprecated Add the text directly into the children
   */
  text?: string
}

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
  children,
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
      {children}
    </StyledContainer>
  </Tooltip>
)
