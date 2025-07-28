'use client'

import type { Theme } from '@emotion/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { consoleLightTheme as theme } from '@ultraviolet/themes'
import type { ReactNode, SVGProps } from 'react'
import { forwardRef } from 'react'
import capitalize from '../../utils/capitalize'

const SIZES = {
  large: '300',
  medium: '250',
  small: '200',
  xlarge: '400',
  xsmall: '150',
  xxlarge: '700',
} as const

type SizesProps = keyof typeof SIZES

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

const sizeStyles = ({ size, theme }: { size: SizesProps; theme: Theme }) => css`
    height: ${theme.sizing[SIZES[size]]};
    width: ${theme.sizing[SIZES[size]]};
    min-width: ${theme.sizing[SIZES[size]]};
    min-height: ${theme.sizing[SIZES[size]]};
    `

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
  sentiment?: Color
  size: SizesProps
  prominence: ProminenceProps
  disabled?: boolean
}>`
  vertical-align: middle;
  fill: ${({ theme, sentiment, prominence, disabled }) => {
    // stronger is available only for neutral sentiment
    const definedProminence =
      (sentiment !== 'neutral' && prominence === 'stronger') ||
      prominence === 'weak'
        ? capitalize(PROMINENCES.default)
        : capitalize(PROMINENCES[prominence])

    if (sentiment) {
      const themeColor = theme.colors[sentiment]
      const icon = `icon${definedProminence}${
        disabled ? 'Disabled' : ''
      }` as keyof typeof themeColor

      return theme.colors?.[sentiment]?.[icon] || sentiment
    }

    return 'currentColor'
  }};

  .fillStroke {
    stroke: ${({ theme, sentiment, prominence, disabled }) => {
      // stronger is available only for neutral color
      const definedProminence =
        sentiment !== 'neutral' && prominence === 'stronger'
          ? capitalize(PROMINENCES.default)
          : capitalize(PROMINENCES[prominence])

      if (sentiment) {
        const themeColor = theme.colors[sentiment]
        const icon = `icon${definedProminence}${
          disabled ? 'Disabled' : ''
        }` as keyof typeof themeColor

        return theme.colors?.[sentiment]?.[icon] || sentiment
      }

      return 'currentColor'
    }};
    fill: none;
  }
  ${sizeStyles}
`

export type IconProps = {
  size?: SizesProps
  prominence?: ProminenceProps
  sentiment?: Color
  'data-testid'?: string
  disabled?: boolean
  children: ReactNode
} & Pick<
  SVGProps<SVGSVGElement>,
  'className' | 'stroke' | 'cursor' | 'strokeWidth' | 'aria-label'
>

/**
 * Icon component is our set of system icons in the design system. All of them are SVGs.
 */

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
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
  ) => (
    <StyledIcon
      aria-label={ariaLabel}
      className={className}
      cursor={cursor}
      data-testid={dataTestId}
      disabled={disabled}
      prominence={prominence}
      ref={ref}
      sentiment={sentiment}
      size={size}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox={
        typeof size === 'string' && ['xsmall', 'small'].includes(size)
          ? '0 0 16 16'
          : '0 0 20 20'
      }
    >
      {children}
    </StyledIcon>
  ),
)
