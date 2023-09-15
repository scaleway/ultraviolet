import type { Theme } from '@emotion/react'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type { ComponentProps, ReactNode } from 'react'
import { useMemo } from 'react'
import type { Color } from '../../theme'
import { SENTIMENTS_WITHOUT_NEUTRAL } from '../../theme'
import capitalize from '../../utils/capitalize'
import { Text } from '../Text'

type IconName = ComponentProps<typeof Icon>['name']

const StyledText = styled(Text)<{ fontSize: number }>`
  text-transform: uppercase;
  font-size: ${({ fontSize }) => fontSize}px;
  color: inherit;
`

// TODO: remove when typography has been created
const TEXT_SIZES = {
  large: 14,
  medium: 12,
  small: 10,
}

export const SIZES = {
  large: 32,
  medium: 24,
  small: 16,
}

export const PROMINENCES = {
  default: 'default',
  strong: 'strong',
}

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

const StyledBox = styled('div', {
  shouldForwardProp: prop => !['sentiment', 'size'].includes(prop),
})<{ size: number; sentiment: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.radii.xlarge};
  padding: 0
    ${({ theme, size }) =>
      size === SIZES.small ? theme.space['1'] : theme.space['2']};
  gap: ${({ theme, size }) =>
    size === SIZES.small ? theme.space['0.5'] : theme.space['1']};
  width: fit-content;
  height: ${({ size }) => size}px;
  ${({ sentiment }) => sentiment}
`

type BadgeProps = {
  sentiment?: Color
  size?: keyof typeof SIZES
  prominence?: keyof typeof PROMINENCES
  /**
   * Defines icon to display on left side of badge. **Only available on medium and large sizes**.
   */
  icon?: IconName
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
  icon,
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

  const sizeValue = SIZES[size]

  return (
    <StyledBox
      role="status"
      aria-label={ariaLabel}
      as="span"
      sentiment={
        disabled ? generatedStyles['disabled'] : generatedStyles[sentiment]
      }
      size={sizeValue}
      className={className}
      data-testid={dataTestId}
    >
      {icon && sizeValue !== SIZES.small ? (
        <Icon name={icon} size={16} />
      ) : null}
      <StyledText
        variant="bodyStrong"
        as="p"
        fontSize={TEXT_SIZES[size]}
        prominence={disabled ? 'weak' : 'default'}
      >
        {children}
      </StyledText>
    </StyledBox>
  )
}
