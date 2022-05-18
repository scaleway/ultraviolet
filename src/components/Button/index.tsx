import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { darken, transparentize } from 'polished'
import PropTypes from 'prop-types'
import React, {
  ButtonHTMLAttributes,
  ComponentProps,
  ElementType,
  FocusEventHandler,
  MouseEventHandler,
  ReactNode,
  Ref,
  forwardRef,
  isValidElement,
  useMemo,
} from 'react'
import Box, { BoxProps } from '../Box'
import Icon from '../Icon'
import Loader from '../Loader'
import Tooltip from '../Tooltip'
import UniversalLink from '../UniversalLink'

const borderedVariant = ({
  colorValue,
  bgColorValue,
  hoverColorValue,
}: {
  colorValue: string
  bgColorValue: string
  hoverColorValue: string
}) => `
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

const plainVariant = ({
  bgColorValue,
  textColorValue,
}: {
  bgColorValue: string
  textColorValue: string
}) => `
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

const variants = {
  info: ({ theme }: { theme: Theme }) =>
    plainVariant({
      bgColorValue: theme.colors.info.background,
      textColorValue: theme.colors.info.text,
    }),
  'info-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.info.backgroundWeak,
      colorValue: theme.colors.info.textWeak,
      hoverColorValue: theme.colors.info.textWeak,
    }),
  link: ({ theme: { colors } }: { theme: Theme }) => `
    background-color: ${colors.info.backgroundWeak};
    color: ${colors.info.textWeak};
    vertical-align: baseline;
    font-weight: 400;

    &:hover,
    &:focus {
      color: ${darken(0.2, colors.info.textWeak)};
      text-decoration: underline;
    }
    padding: 0;
  `,
  primary: ({ theme }: { theme: Theme }) =>
    plainVariant({
      bgColorValue: theme.colors.primary.backgroundStrong,
      textColorValue: theme.colors.primary.textStrong,
    }),
  'primary-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.primary.backgroundWeak,
      colorValue: theme.colors.primary.textWeak,
      hoverColorValue: theme.colors.primary.backgroundWeakHover,
    }),
  'primary-soft-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.neutral.backgroundWeak,
      colorValue: theme.colors.neutral.textWeak,
      hoverColorValue: theme.colors.primary.backgroundWeakHover,
    }),
  secondary: ({ theme }: { theme: Theme }) =>
    plainVariant({
      bgColorValue: theme.colors.neutral.backgroundStrong,
      textColorValue: theme.colors.neutral.text,
    }),
  'secondary-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.neutral.backgroundWeak,
      colorValue: theme.colors.neutral.textWeak,
      hoverColorValue: theme.colors.primary.backgroundWeakHover,
    }),
  success: ({ theme }: { theme: Theme }) =>
    plainVariant({
      bgColorValue: theme.colors.success.backgroundStrong,
      textColorValue: theme.colors.success.textStrong,
    }),
  'success-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.success.backgroundWeak,
      colorValue: theme.colors.success.textWeak,
      hoverColorValue: theme.colors.success.backgroundStrong,
    }),
  'success-soft-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.neutral.backgroundWeak,
      colorValue: theme.colors.neutral.textWeak,
      hoverColorValue: theme.colors.success.backgroundWeakHover,
    }),
  transparent: ({ theme: { colors } }: { theme: Theme }) => `
    background-color: transparent;
    color: ${colors.neutral.text};
  `,
  warning: ({ theme }: { theme: Theme }) =>
    plainVariant({
      bgColorValue: theme.colors.danger.backgroundStrong,
      textColorValue: theme.colors.danger.textStrong,
    }),
  'warning-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.danger.backgroundWeak,
      colorValue: theme.colors.danger.text,
      hoverColorValue: theme.colors.danger.backgroundStrong,
    }),
  'warning-soft-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.neutral.backgroundWeak,
      colorValue: theme.colors.neutral.textWeak,
      hoverColorValue: theme.colors.danger.backgroundWeakHover,
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

const SmartIcon = ({
  icon,
  iconSize,
}: {
  icon: ReactNode | string
  iconSize?: number
}) =>
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
  position?: 'left' | 'right'
}

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
} & BoxProps &
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

  ${sizeStyles}
  ${variantStyles}
  ${({ disabled, theme }) =>
    disabled &&
    `
    cursor: default;
    pointer-events: none;
    color: ${theme.colors.neutral.textWeakDisabled};`}

  ${({ variant, disabled, theme }) =>
    variant !== 'link' &&
    disabled &&
    `
    background-color: ${theme.colors.neutral.backgroundWeakDisabled};
    border-color: ${theme.colors.neutral.borderWeakDisabled};
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

type ButtonProps = Omit<StyledButtonProps, 'variant' | 'size' | 'download'> & {
  children?: ReactNode
  variant?: ButtonVariant
  innerRef: Ref<Element>
  size?: ButtonSize
  download?: boolean | string
}

const FwdButton = ({
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
}: ButtonProps) => {
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
            position={children ? 'left' : undefined}
          >
            {progress ? (
              <Loader
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
              <Loader
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

const Button = forwardRef<Element, Omit<ButtonProps, 'innerRef'>>(
  (props, ref) => <FwdButton {...props} innerRef={ref} />,
)

Button.propTypes = {
  action: PropTypes.oneOf([true, false, 'rounded']),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  disabled: PropTypes.bool,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  extend: PropTypes.bool,
  href: PropTypes.string,
  /**
   * Name of the icon. All [icons](/?path=/docs/components-icon) are supported.
   */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconSize: PropTypes.number,
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

Button.displayName = 'fwd(Button)'

export default Button
