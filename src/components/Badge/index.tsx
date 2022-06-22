import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode, useMemo } from 'react'
import { Color, SENTIMENTS_WITHOUT_NEUTRAL } from '../../theme'
import capitalize from '../../utils/capitalize'
import Icon, { IconName } from '../Icon'
import Typography from '../Typography'

const StyledTypography = styled(Typography)`
  text-transform: uppercase;
  font-size: ${({ fontSize }) => fontSize}px;
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
 * Generate all styles available for badge based on prominence and variants
 * @param prominence
 * @param theme
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
      }
    `,
      }),
      {},
    ),
    disabled: `
      color: ${theme.colors.neutral.textWeak};
      background: ${theme.colors.neutral.backgroundStrong}
    `,
    neutral: `
      color: ${
        prominence === PROMINENCES.strong
          ? theme.colors.neutral[text as keyof typeof theme.colors.neutral]
          : theme.colors.neutral.textWeak
      };
      background: ${
        theme.colors.neutral[background as keyof typeof theme.colors.neutral]
      }
    `,
  }
}

const StyledBox = styled('div', {
  shouldForwardProp: prop => !['variant', 'size'].includes(prop.toString()),
})<{ size: number; variant: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.space['2']};
  padding: 0
    ${({ theme, size }) =>
      size === SIZES.small ? theme.space['1'] : theme.space['2']};
  gap: ${({ theme, size }) =>
    size === SIZES.small ? theme.space['0.5'] : theme.space['1']};
  width: fit-content;
  height: ${({ size }) => size}px;
  ${({ variant }) => variant}
`

type BadgeProps = {
  variant?: Color
  size?: keyof typeof SIZES
  prominence?: keyof typeof PROMINENCES
  /**
   * Defines icon to display on left side of badge. **Only available on medium and large sizes**.
   */
  icon?: IconName
  disabled?: boolean
  className?: string
  children: ReactNode
}

const Badge = ({
  variant = 'neutral',
  size = 'medium',
  prominence = 'default',
  icon,
  disabled = false,
  className,
  children,
}: BadgeProps) => {
  const theme = useTheme()

  /**
   * Badge should display an aria-label if the status is not neutral or primary
   */
  const ariaLabel = useMemo(
    () =>
      ['neutral', 'primary'].some(baseVariant => baseVariant === variant)
        ? undefined
        : variant,
    [variant],
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
      variant={disabled ? generatedStyles.disabled : generatedStyles[variant]}
      size={sizeValue}
      className={className}
    >
      {icon && sizeValue !== SIZES.small ? (
        <Icon name={icon} size={16} />
      ) : null}
      <StyledTypography
        fontSize={TEXT_SIZES[size]}
        fontWeight={500}
        color="inherit"
      >
        {children}
      </StyledTypography>
    </StyledBox>
  )
}

export default Badge
