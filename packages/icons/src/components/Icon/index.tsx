import { css } from '@emotion/react'
import styled from '@emotion/styled'
import type { consoleLightTheme as theme } from '@ultraviolet/themes'
import type { FunctionComponent, SVGProps } from 'react'
import { forwardRef, useMemo } from 'react'
import capitalize from '../../utils/capitalize'
import { ICONS } from './Icons'
import { SMALL_ICONS } from './SmallIcons'

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

export const icons = Object.keys(ICONS.default) as IconName[]

const sizeStyles = ({
  size,
}: {
  size: number | string | 'small' | 'large'
}) => {
  if (size === 'small') {
    return css`
      height: 16px;
      width: 16px;
      min-width: 16px;
      min-height: 16px;
    `
  }
  if (size === 'large') {
    return css`
      height: 20px;
      width: 20px;
      min-width: 20px;
      min-height: 20px;
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
    !['size', 'color', 'prominence', 'disabled'].includes(prop),
})<{
  color: Color | string
  size: number | string
  prominence: ProminenceProps
  disabled?: boolean
}>`
  vertical-align: middle;
  fill: ${({ theme, color, prominence, disabled }) => {
    // stronger is available only for neutral color
    const definedProminence =
      color !== 'neutral' && prominence === 'stronger'
        ? capitalize(PROMINENCES.default)
        : capitalize(PROMINENCES[prominence])

    const themeColor = theme.colors[color as Color]
    const icon = `icon${definedProminence}${
      disabled ? 'Disabled' : ''
    }` as keyof typeof themeColor

    return theme.colors?.[color as Color]?.[icon] || color
  }};

  .fillStroke {
    stroke: ${({ theme, color, prominence, disabled }) => {
      // stronger is available only for neutral color
      const definedProminence =
        color !== 'neutral' && prominence === 'stronger'
          ? capitalize(PROMINENCES.default)
          : capitalize(PROMINENCES[prominence])

      const themeColor = theme.colors[color as Color]
      const icon = `icon${definedProminence}${
        disabled ? 'Disabled' : ''
      }` as keyof typeof themeColor

      return theme.colors?.[color as Color]?.[icon] || color
    }};
    fill: none;
  }
  ${sizeStyles}
`

export type IconName = keyof typeof ICONS.default

type IconProps = {
  size?: number | string
  name?: IconName
  prominence?: ProminenceProps
  color?: Color
  outline?: boolean
  'data-testid'?: string
  disabled?: boolean
} & Pick<
  SVGProps<SVGSVGElement>,
  'className' | 'stroke' | 'cursor' | 'strokeWidth'
>

/**
 * Icon component is our set of system icons in the design system. All of them are SVGs.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name = 'alert',
      color = 'currentColor',
      size = '1em',
      prominence = 'default',
      className,
      'data-testid': dataTestId,
      stroke,
      outline = true,
      cursor,
      strokeWidth,
      disabled,
    },
    ref,
  ) => {
    let SystemIcon = StyledIcon(
      ICONS[outline && name in ICONS.default ? 'outline' : 'default'][name] ||
        ICONS.default.alert,
    )

    if (size === 'small' || size === 16) {
      SystemIcon = StyledIcon(
        SMALL_ICONS[
          outline && name in SMALL_ICONS.default ? 'outline' : 'default'
        ][name] || SMALL_ICONS.default.alert,
      )
    }

    /**
     * @deprecated remove next major
     */
    const defaultViewBox = useMemo(() => {
      if (size === 'small' || size === 16) return '0 0 16 16'
      if (
        [
          'asterisk',
          'close-circle-outline',
          'drag-variant',
          'expand-more',
          'send',
          'switch_orga',
          'delete',
        ].includes(name)
      ) {
        return ' 0 0 24 24'
      }

      return '0 0 20 20'
    }, [name, size])

    return (
      <SystemIcon
        ref={ref}
        color={color}
        prominence={prominence}
        size={size}
        viewBox={defaultViewBox}
        className={className}
        data-testid={dataTestId}
        stroke={stroke}
        cursor={cursor}
        strokeWidth={strokeWidth}
        disabled={disabled}
      />
    )
  },
)
