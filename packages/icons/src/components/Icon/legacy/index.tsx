import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { consoleLightTheme as theme } from '@ultraviolet/themes'
import type { FunctionComponent, SVGProps } from 'react'
import { forwardRef, useMemo } from 'react'
import capitalize from '../../../utils/capitalize'
import { ICONS } from './Icons'
import { SMALL_ICONS } from './SmallIcons'

const SIZES = {
  small: 16,
  large: 20,
  xlarge: 32,
  xxlarge: 56,
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

export const icons = Object.keys(ICONS.filled) as IconName[]

const sizeStyles = ({
  size,
}: {
  size: keyof typeof SIZES | number | string
}) => {
  if (typeof size === 'string' && size in SIZES) {
    return css`
        height: ${SIZES[size as keyof typeof SIZES]}px;
        width: ${SIZES[size as keyof typeof SIZES]}px;
        min-width: ${SIZES[size as keyof typeof SIZES]}px;
        min-height: ${SIZES[size as keyof typeof SIZES]}px;
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

const StyledIcon = (
  component: FunctionComponent<SVGProps<SVGSVGElement>>,
) => styled(component, {
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

export type IconName = keyof typeof ICONS.filled

type IconProps = {
  /**
   * **! IMPORTANT:** `string` and `number` are deprecated. Use `small`, `large`, `xlarge`, `xxlarge` only.
   */
  size?: number | string | 'small' | 'large'
  name?: IconName
  prominence?: ProminenceProps
  /**
   * @deprecated use `sentiment` property instead
   */
  color?: Color
  sentiment?: Color
  variant?: 'outlined' | 'filled'
  'data-testid'?: string
  disabled?: boolean
} & Pick<
  SVGProps<SVGSVGElement>,
  'className' | 'stroke' | 'cursor' | 'strokeWidth' | 'aria-label'
>

/**
 * @deprecated This will be removed in the next major release. Use Icon direct import instead.
 * Example:
 * ```typescript
 * import { Address } from '@ultraviolet/icons'
 * // OR
 * import { Address } from '@ultraviolet/icons/Address'
 * ```
 * Except `name` prop that has been removed all props are same.
 *
 * @description component is our set of system icons in the design system. All of them are SVGs.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name = 'alert',
      color = 'currentColor',
      sentiment,
      size = '1em',
      prominence = 'default',
      className,
      'data-testid': dataTestId,
      stroke,
      variant = 'filled',
      cursor,
      strokeWidth,
      disabled,
      'aria-label': ariaLabel,
    },
    ref,
  ) => {
    const computedSentiment = sentiment ?? color
    const SystemIcon = useMemo(() => {
      if (size === 'small' || size === 16) {
        return StyledIcon(
          SMALL_ICONS[variant][name] || SMALL_ICONS.filled.alert,
        )
      }

      return StyledIcon(ICONS[variant][name] || ICONS.filled.alert)
    }, [name, size, variant])

    /**
     * @deprecated to be removed in next major
     */
    const defaultViewBox = useMemo(() => {
      if (
        [
          'asterisk',
          'close-circle-outline',
          'drag-variant',
          'expand-more',
          'switch_orga',
        ].includes(name)
      ) {
        return '0 0 24 24'
      }
      if (size === 'small' || size === 16) return '0 0 16 16'

      return '0 0 20 20'
    }, [name, size])

    return (
      <SystemIcon
        ref={ref}
        sentiment={computedSentiment}
        prominence={prominence}
        size={size}
        viewBox={defaultViewBox}
        className={className}
        data-testid={dataTestId}
        stroke={stroke}
        cursor={cursor}
        strokeWidth={strokeWidth}
        disabled={disabled}
        aria-label={ariaLabel}
      />
    )
  },
)
