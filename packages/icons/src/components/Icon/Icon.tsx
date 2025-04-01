import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { consoleLightTheme as theme } from '@ultraviolet/themes'
import type { ReactNode, SVGProps } from 'react'
import { forwardRef } from 'react'
import capitalize from '../../utils/capitalize'

const SIZES = {
  xsmall: '150',
  small: '200',
  medium: '250',
  large: '300',
  xlarge: '400',
  xxlarge: '700',
} as const

type Color = Extract<
  keyof typeof theme.colors,
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
>

const sizeStyles = ({
  size,
  theme,
}: {
  size: keyof typeof SIZES | number | string
  theme: Theme
}) => {
  if (typeof size === 'string' && size in SIZES) {
    return css`
        height: ${theme.sizing[SIZES[size as keyof typeof SIZES]]};
        width: ${theme.sizing[SIZES[size as keyof typeof SIZES]]};
        min-width: ${theme.sizing[SIZES[size as keyof typeof SIZES]]};
        min-height: ${theme.sizing[SIZES[size as keyof typeof SIZES]]};
    `
  }

  const pxSize =
    typeof size === 'number' && !Number.isNaN(size) ? `${size}px` : size

  return css`
    height: ${pxSize};
    width: ${pxSize};
    min-width: ${pxSize};
    min-height: ${pxSize};
  `
}

const PROMINENCES = {
  default: '',
  strong: 'strong',
  stronger: 'stronger',
  weak: 'weak',
}

type ProminenceProps = keyof typeof PROMINENCES

const StyledIcon = styled('svg', {
  shouldForwardProp: prop =>
    !['size', 'sentiment', 'prominence', 'disabled'].includes(prop),
})<{
  sentiment: Color | string
  size: number | string
  prominence: ProminenceProps
  disabled?: boolean
}>`
  vertical-align: middle;
  fill: ${({ theme, sentiment, prominence, disabled }) => {
    // stronger is available only for neutral sentiment
    const definedProminence =
      sentiment !== 'neutral' && prominence === 'stronger'
        ? capitalize(PROMINENCES.default)
        : capitalize(PROMINENCES[prominence])

    const themeColor = theme.colors[sentiment as Color]
    const icon = `icon${definedProminence}${
      disabled ? 'Disabled' : ''
    }` as keyof typeof themeColor

    return theme.colors?.[sentiment as Color]?.[icon] || sentiment
  }};

  .fillStroke {
    stroke: ${({ theme, sentiment, prominence, disabled }) => {
      // stronger is available only for neutral color
      const definedProminence =
        sentiment !== 'neutral' && prominence === 'stronger'
          ? capitalize(PROMINENCES.default)
          : capitalize(PROMINENCES[prominence])

      const themeColor = theme.colors[sentiment as Color]
      const icon = `icon${definedProminence}${
        disabled ? 'Disabled' : ''
      }` as keyof typeof themeColor

      return theme.colors?.[sentiment as Color]?.[icon] || sentiment
    }};
    fill: none;
  }
  ${sizeStyles}
`

export type IconProps = {
  /**
   * **! IMPORTANT:** `string` and `number` are deprecated. Use `small`, `large`, `xlarge`, `xxlarge` only.
   */
  size?: number | string | 'small' | 'large'
  prominence?: ProminenceProps
  /**
   * @deprecated use `sentiment` property instead
   */
  color?: Color
  sentiment?: Color
  'data-testid'?: string
  disabled?: boolean
  children: ReactNode
} & Pick<
  SVGProps<SVGSVGElement>,
  'className' | 'stroke' | 'cursor' | 'strokeWidth' | 'aria-label'
>

/**
 * IconV2 component is our set of system icons in the design system. All of them are SVGs.
 */

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      color = 'currentColor',
      sentiment,
      size = 'small',
      prominence = 'default',
      className,
      'data-testid': dataTestId,
      stroke,
      cursor,
      strokeWidth,
      disabled,
      'aria-label': ariaLabel,
      children,
    },
    ref,
  ) => {
    const computedSentiment = sentiment ?? color

    return (
      <StyledIcon
        ref={ref}
        sentiment={computedSentiment}
        prominence={prominence}
        size={size}
        viewBox={
          typeof size === 'string' && ['xsmall', 'small'].includes(size)
            ? '0 0 16 16'
            : '0 0 20 20'
        }
        className={className}
        data-testid={dataTestId}
        stroke={stroke}
        cursor={cursor}
        strokeWidth={strokeWidth}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </StyledIcon>
    )
  },
)
