import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, { ComponentProps } from 'react'
import Icon from '../Icon'
import Tooltip from '../Tooltip'

const variants = {
  danger: ({ theme }: { theme: Theme }) => `
    background-color: ${theme.colors.danger.background};
    color: ${theme.colors.danger.text};
  `,
  default: ({ theme }: { theme: Theme }) => `
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
type BulletVariant = keyof typeof variants
export const bulletVariants = Object.keys(variants) as BulletVariant[]

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

const variantStyles = ({ variant }: { variant: BulletVariant }) =>
  variants[variant]
const sizeStyles = ({ size }: { size: BulletSize }) => sizes[size]

type StyledContainerType = { variant: BulletVariant; size: BulletSize }
const StyledContainer = styled('div')<StyledContainerType>`
  display: inline-flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  ${variantStyles}
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
  variant?: BulletVariant
} & ContentProps

const Bullet = ({
  className,
  variant = 'default',
  size = 'medium',
  icon,
  text,
  tooltip,
  tooltipBaseId,
}: BulletProps) => (
  <Tooltip baseId={tooltipBaseId} text={tooltip}>
    <StyledContainer variant={variant} size={size} className={className}>
      {icon ? <Icon name={icon} size="50%" /> : text}
    </StyledContainer>
  </Tooltip>
)

const customXorPropType = (
  props: Record<string, unknown>,
  propName: string,
  comp: string,
) => {
  if ((props.text && props.icon) || (!props.text && !props.icon)) {
    return new Error(
      `Invalid props supplied to ${comp}, you must supply an icon prop OR a text prop, not both`,
    )
  }
  if (props[propName] && typeof props[propName] !== 'string') {
    return new Error(
      `Invalid prop supplied to ${comp}, text should be a string`,
    )
  }

  return null
}
Bullet.propTypes = {
  className: PropTypes.string,
  icon: customXorPropType,
  size: PropTypes.oneOf<BulletSize>(bulletSizes),
  text: customXorPropType,
  tooltip: PropTypes.string,
  tooltipBaseId: PropTypes.string,
  variant: PropTypes.oneOf<BulletVariant>(bulletVariants),
}

export default Bullet
