'use client'

import type { Theme } from '@emotion/react'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import type { Color } from '../../theme'
import { SENTIMENTS_WITHOUT_NEUTRAL } from '../../theme'
import capitalize from '../../utils/capitalize'
import { Text } from '../Text'

export const SIZES = {
  large: '400', // sizing token from theme
  medium: '300',
  small: '200',
} as const

export const PROMINENCES = {
  default: 'default',
  strong: 'strong',
}

export const TEXT_VARIANT = {
  large: 'bodySmall',
  medium: 'caption',
  small: 'captionSmall',
} as const

/**
 * Generate all styles available for badge based on prominence and sentiments
 */
const generateStyles = ({
  prominence,
  theme,
}: {
  prominence: string
  theme: Theme
}): Record<string, string> => {
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
    disabled: `
      color: ${theme.colors.neutral.textWeak};
      background: ${theme.colors.neutral.backgroundStrong};
      border: none;
    `,
    neutral: `
      color: ${
        prominence === PROMINENCES.strong
          ? theme.colors.neutral.textStronger
          : theme.colors.neutral.text
      };
      background: ${
        prominence === PROMINENCES.strong
          ? theme.colors.neutral.backgroundStronger
          : theme.colors.neutral.backgroundWeak
      };
      border: 1px solid ${
        prominence === PROMINENCES.strong
          ? theme.colors.neutral.borderStronger
          : theme.colors.neutral.border
      };
    `,
  }
}

const StyledSpan = styled(Text, {
  shouldForwardProp: prop =>
    !['sentimentStyles', 'size', 'fontSize'].includes(prop),
})<{
  size: keyof typeof SIZES
  sentimentStyles: string
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.xlarge};
  padding: 0
    ${({ theme, size }) => {
      if (size === 'small') {return theme.space['1']}
      if (size === 'large') {return theme.space['2']}

      return theme.space['1.5']
    }};
  gap: ${({ theme, size }) =>
    size === 'small' ? theme.space['0.5'] : theme.space['1']};
  width: fit-content;
  height: ${({ size, theme }) => theme.sizing[SIZES[size]]};
  text-transform: uppercase;
  ${({ sentimentStyles }) => sentimentStyles}
`

type BadgeProps = {
  sentiment?: Color
  size?: keyof typeof SIZES
  prominence?: keyof typeof PROMINENCES
  disabled?: boolean
  className?: string
  children: ReactNode
  'data-testid'?: string
}

/**
 * Badge component is used to display a status or a label in a small container.
 */
export const Badge = ({
  sentiment = 'neutral',
  size = 'medium',
  prominence = 'default',
  disabled = false,
  className,
  children,
  'data-testid': dataTestId,
}: BadgeProps) => {
  const theme = useTheme()

  /**
   * Badge should display an aria-label if the status is not neutral or primary
   */
  const ariaLabel = useMemo(
    () =>
      ['neutral', 'primary'].some(baseSentiment => baseSentiment === sentiment)
        ? undefined
        : sentiment,
    [sentiment],
  )

  const generatedStyles = useMemo(
    () => generateStyles({ prominence, theme }),
    [prominence, theme],
  )

  return (
    <StyledSpan
      aria-label={ariaLabel}
      as="span"
      className={className}
      data-testid={dataTestId}
      prominence={disabled ? 'weak' : 'default'}
      sentimentStyles={
        disabled ? generatedStyles['disabled'] : generatedStyles[sentiment]
      }
      size={size}
      variant={TEXT_VARIANT[size]}
      whiteSpace="nowrap"
    >
      {children}
    </StyledSpan>
  )
}
