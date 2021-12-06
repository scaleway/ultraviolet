import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { darken, transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  ButtonHTMLAttributes,
  ComponentProps,
  ElementType,
  FocusEventHandler,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
  Ref,
  VoidFunctionComponent,
  forwardRef,
  isValidElement,
  useMemo,
} from 'react'
import { ColorDeprecated as Color } from '../../theme/deprecated/colors'
import ActivityIndicator from '../ActivityIndicator'
import Box, { XStyledProps } from '../Box'
import Icon from '../Icon'
import Tooltip from '../Tooltip'
import UniversalLink from '../UniversalLink'

const borderedVariant = ({
  theme: { colorsDeprecated },
  color,
  bgColor,
  hoverColor,
}: {
  theme: Theme
  color: Color
  bgColor: Color
  hoverColor: Color
}) => {
  const colorValue = colorsDeprecated[color]
  const bgColorValue = colorsDeprecated[bgColor]
  const hoverColorValue = colorsDeprecated[hoverColor]

  return `
    border: 1px solid ${colorValue};
    background-color: ${bgColorValue};
    color: ${colorValue};

    svg {
      fill: ${colorValue};
      // safari issue prevent event propgation
      pointer-events: none;
    }

    &:hover,
    &:focus {
      border: 1px solid ${hoverColorValue};
      color: ${bgColorValue};
      background-color: ${hoverColorValue};

      svg {
        fill: ${bgColorValue};
      }
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, hoverColorValue)};
    }
  `
}

const plainVariant = ({
  theme: { colorsDeprecated },
  bgColor,
  textColor,
}: {
  theme: Theme
  bgColor: Color
  textColor: Color
}) => {
  const bgColorValue = colorsDeprecated[bgColor]
  const textColorValue = colorsDeprecated[textColor]

  return `
    background-color: ${bgColorValue};
    color: ${textColorValue};

    &:hover,
    &:focus {
      color: ${textColorValue};
      background-color: ${darken(0.05, bgColorValue)};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, bgColorValue)};
    }
  `
}

const variants = {
  info: ({ theme }: { theme: Theme }) =>
    plainVariant({ bgColor: 'zumthor', textColor: 'blue', theme }),
  'info-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColor: 'white',
      color: 'blue',
      hoverColor: 'blue',
      theme,
    }),
  link: ({ theme: { colorsDeprecated } }: { theme: Theme }) => `
    background-color: ${colorsDeprecated.white};
    color: ${colorsDeprecated.blue};
    vertical-align: baseline;
    font-weight: 400;

    &:hover,
    &:focus {
      color: ${darken(0.2, colorsDeprecated.blue)};
      text-decoration: underline;
    }
  `,
  primary: ({ theme }: { theme: Theme }) =>
    plainVariant({ bgColor: 'primary', textColor: 'white', theme }),
  'primary-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColor: 'white',
      color: 'primary',
      hoverColor: 'primary',
      theme,
    }),
  'primary-soft-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColor: 'white',
      color: 'gray350',
      hoverColor: 'primary',
      theme,
    }),
  secondary: ({ theme }: { theme: Theme }) =>
    plainVariant({ bgColor: 'gray100', textColor: 'gray700', theme }),
  'secondary-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColor: 'white',
      color: 'gray550',
      hoverColor: 'primary',
      theme,
    }),
  success: ({ theme }: { theme: Theme }) =>
    plainVariant({ bgColor: 'success', textColor: 'white', theme }),
  'success-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColor: 'white',
      color: 'success',
      hoverColor: 'success',
      theme,
    }),
  'success-soft-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColor: 'white',
      color: 'gray350',
      hoverColor: 'success',
      theme,
    }),
  transparent: ({ theme: { colorsDeprecated } }: { theme: Theme }) => `
    background-color: transparent;
    color: ${colorsDeprecated.gray700};
  `,
  warning: ({ theme }: { theme: Theme }) =>
    plainVariant({ bgColor: 'warning', textColor: 'white', theme }),
  'warning-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColor: 'white',
      color: 'warning',
      hoverColor: 'warning',
      theme,
    }),
  'warning-soft-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColor: 'white',
      color: 'gray350',
      hoverColor: 'warning',
      theme,
    }),
} as const

type ButtonVariant = keyof typeof variants
export const buttonVariants = Object.keys(variants) as ButtonVariant[]

const sizes = {
  large: `
    font-size: 16px;
    line-height: 32px;
    font-weight: 500;
    padding: 8px 16px;
  `,
  medium: `
    font-size: 16px;
    line-height: 24px;
    padding: 8px 16px;
  `,
  small: `
    font-size: 16px;
    line-height: 16px;
    padding: 8px 16px;
  `,
  xsmall: `
    font-size: 14px;
    line-height: 20px;
    padding: 8px;
  `,
  xxsmall: `
    font-size: 12px;
  `,
} as const

type ButtonSize = keyof typeof sizes
export const buttonSizes = Object.keys(sizes) as ButtonSize[]

const variantStyles = ({
  variant,
  theme,
  ...props
}: {
  variant: ButtonVariant
  theme: Theme
}) => variants[variant]?.({ theme, ...props })
const sizeStyles = ({ size }: { size: ButtonSize }) => sizes[size]

const SmartIcon: VoidFunctionComponent<{
  icon: ReactNode | string
  iconSize?: number
}> = ({ icon, iconSize }) =>
  isValidElement(icon) ? (
    icon
  ) : (
    <Icon name={icon as ComponentProps<typeof Icon>['name']} size={iconSize} />
  )

SmartIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  iconSize: PropTypes.number,
}

type StyledIcon = {
  margin: number
} & XStyledProps

const StyledIconContainer = styled('div', {
  shouldForwardProp: prop => !['margin', 'position'].includes(prop.toString()),
})<StyledIcon>`
  display: flex;
  ${({ margin, position }) => `
    ${position === 'left' ? `margin-right: ${margin}px;` : ``}
    ${position === 'right' ? `margin-left: ${margin}px;` : ``}
    pointer-events: none;`}
`

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`
type StyledButtonProps = {
  action?: boolean | 'rounded'
  disabled?: boolean
  download?: boolean
  extend?: boolean
  href?: string
  icon?: string | JSX.Element
  iconPosition?: 'left' | 'right'
  progress?: boolean | 'left' | 'right'
  iconSize?: number
  size: ButtonSize
  to?: string
  tooltip?: string
  tooltipBaseId?: string
  type?: 'button' | 'reset' | 'submit'
  variant: ButtonVariant
  onFocus?: FocusEventHandler
  onMouseEnter?: MouseEventHandler
} & XStyledProps &
  ButtonHTMLAttributes<HTMLButtonElement>

const StyledButton = styled(Box, {
  shouldForwardProp: props =>
    !['action', 'variant', 'extend', 'icon', 'download'].includes(
      props.toString(),
    ),
})<StyledButtonProps>`
  display: inline-flex;
  border-radius: ${({ theme }) => theme.radii.default};
  border-width: 0;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  user-select: none;
  outline: none;
  vertical-align: middle;
  white-space: nowrap;
  font-weight: 500;

  transition: color 150ms ease-in-out, background-color 150ms ease-in-out,
    border-color 150ms ease-in-out;

  &:hover,
  &:focus {
    text-decoration: none;
  }

  ${variantStyles}
  ${sizeStyles}
  ${({ disabled, theme }) =>
    disabled &&
    `
    cursor: default;
    pointer-events: none;
    color: ${theme.colorsDeprecated.gray350};`}

  ${({ variant, disabled, theme }) =>
    variant !== 'link' &&
    disabled &&
    `
    background-color: ${theme.colorsDeprecated.gray50};
    border-color: ${theme.colorsDeprecated.gray50};
    box-shadow: none;
    `}

  ${({ extend, icon }) =>
    extend &&
    css`
      display: inline-flex;
      & ${StyledContent} {
        transition: max-width 450ms ease, padding 150ms ease, margin 150ms ease;
        max-width: 0;
        margin-right: 0;
        ${icon ? 'padding-right: 0;' : 'padding-left: 0;'};
        overflow: hidden;
      }

      &:focus ${StyledContent}, &:hover ${StyledContent} {
        max-width: 275px;
        margin-right: 8px;
        ${icon ? 'padding-right: 8x;' : 'padding-left: 8px;'};
      }
    `}

  ${({ action }) =>
    action &&
    css`
      width: 32px;
      height: 32px;
      padding: 0;
      flex-shrink: 0;
      ${action === 'rounded' && `border-radius: 16px;`}
      > svg {
        // safari issue prevent event propgation
        pointer-events: none;
      }
    `}
`

type ButtonProps = Omit<StyledButtonProps, 'variant' | 'size'> & {
  children?: ReactNode
  variant?: ButtonVariant
  innerRef: Ref<Element>
  size?: ButtonSize
}

const FwdButton: FunctionComponent<ButtonProps> = ({
  children,
  disabled = false,
  download,
  extend,
  href,
  icon,
  iconPosition = 'left',
  iconSize,
  innerRef,
  progress,
  size = 'large',
  to,
  tooltip,
  tooltipBaseId,
  type: elementType = 'button',
  variant = 'primary',
  ...props
}) => {
  const as = useMemo(() => {
    if (disabled) return 'button'
    if (to) return UniversalLink as ElementType
    if (href || download) return 'a'

    return 'button'
  }, [disabled, to, href, download])

  const displayProgressOnly = !children

  const iconMargin = extend || (progress && displayProgressOnly) ? 0 : 8
  const type = as === 'button' ? elementType : undefined

  return (
    <Tooltip baseId={tooltipBaseId} text={tooltip}>
      <StyledButton
        {...props}
        href={href}
        to={to}
        download={download}
        ref={innerRef}
        as={as}
        disabled={as === 'button' && disabled}
        aria-disabled={disabled}
        variant={variant}
        size={size}
        extend={extend}
        icon={icon}
        type={type}
      >
        {progress === true ||
        progress === 'left' ||
        (icon && iconPosition === 'left') ? (
          <StyledIconContainer
            margin={iconMargin}
            position={children ? 'left' : ''}
          >
            {progress ? (
              <ActivityIndicator
                active
                trailColor="transparent"
                color="currentColor"
                size="1em"
              />
            ) : (
              <SmartIcon icon={icon} iconSize={iconSize} />
            )}
          </StyledIconContainer>
        ) : null}
        {(!progress || !displayProgressOnly) && children && (
          <StyledContent>{children}</StyledContent>
        )}
        {progress === 'right' || (icon && iconPosition === 'right') ? (
          <StyledIconContainer margin={iconMargin} position="right">
            {progress ? (
              <ActivityIndicator
                active
                trailColor="transparent"
                color="currentColor"
                size="1em"
              />
            ) : (
              <SmartIcon icon={icon} iconSize={iconSize} />
            )}
          </StyledIconContainer>
        ) : null}
      </StyledButton>
    </Tooltip>
  )
}

FwdButton.propTypes = {
  action: PropTypes.oneOf([true, false, 'rounded']),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  disabled: PropTypes.bool,
  download: PropTypes.bool,
  extend: PropTypes.bool,
  href: PropTypes.string,
  /**
   * Name of the icon. All [icons](/?path=/docs/components-icon) are supported.
   */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconSize: PropTypes.number,
  innerRef: PropTypes.func,
  /**
   * Use this properties to associate ref to button component.
   */
  progress: PropTypes.oneOf([true, false, 'left', 'right']),
  size: PropTypes.oneOf<ButtonSize>(buttonSizes),
  to: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipBaseId: PropTypes.string,
  variant: PropTypes.oneOf(buttonVariants as [ButtonVariant]),
}

const Button = forwardRef<Element, Omit<ButtonProps, 'innerRef'>>(
  (props, ref) => <FwdButton {...props} innerRef={ref} />,
)

Button.propTypes = FwdButton.propTypes

Button.displayName = 'fwd(Button)'

export default Button
