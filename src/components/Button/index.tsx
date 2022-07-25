import { Theme, css } from '@emotion/react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import PropTypes from 'prop-types'
import {
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
import Link from '../Link'
import Loader from '../Loader'
import Tooltip from '../Tooltip'

const TRANSITION_DURATION = 250

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`

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
  hoverColorValue,
}: {
  bgColorValue: string
  textColorValue: string
  hoverColorValue: string
}) => `
    background-color: ${bgColorValue};
    color: ${textColorValue};

    &:hover,
    &:focus {
      color: ${textColorValue};
      background-color: ${hoverColorValue};
    }

    &:focus {
      box-shadow: 0 0 0 2px ${transparentize(0.75, hoverColorValue)};
    }
  `

const variants = {
  info: ({ theme }: { theme: Theme }) =>
    plainVariant({
      bgColorValue: theme.colors.info.background,
      hoverColorValue: theme.colors.info.backgroundHover,
      textColorValue: theme.colors.info.text,
    }),
  'info-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.info.backgroundWeak,
      colorValue: theme.colors.info.textWeak,
      hoverColorValue: theme.colors.info.backgroundStrongHover,
    }),
  link: ({ theme }: { theme: Theme }) => `
    background-color: transparent;
    border: none;
    padding: 0;
    color: ${theme.colors.info.text};

    text-decoration: underline;
    text-decoration-color: transparent;
    text-decoration-poisition: under;
    text-decoration-thickness: 1px;
    transition: text-decoration-color ${TRANSITION_DURATION}ms ease-out;


    &:hover,
    &:focus {
      text-decoration-thickness: 1px;
      text-decoration: underline;
      text-decoration-color: ${theme.colors.info.text};
    }

    &:active {
      text-decoration-thickness: 2px;
    }
  `,
  primary: ({ theme }: { theme: Theme }) =>
    plainVariant({
      bgColorValue: theme.colors.primary.backgroundStrong,
      hoverColorValue: theme.colors.primary.backgroundStrongHover,
      textColorValue: theme.colors.primary.textStrong,
    }),
  'primary-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.primary.backgroundWeak,
      colorValue: theme.colors.primary.textWeak,
      hoverColorValue: theme.colors.primary.backgroundStrongHover,
    }),
  'primary-soft-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.neutral.backgroundWeak,
      colorValue: theme.colors.neutral.textWeak,
      hoverColorValue: theme.colors.primary.backgroundStrongHover,
    }),
  secondary: ({ theme }: { theme: Theme }) =>
    plainVariant({
      bgColorValue: theme.colors.neutral.backgroundStrong,
      hoverColorValue: theme.colors.neutral.backgroundStrongHover,
      textColorValue: theme.colors.neutral.text,
    }),
  'secondary-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.neutral.backgroundWeak,
      colorValue: theme.colors.neutral.textWeak,
      hoverColorValue: theme.colors.primary.backgroundStrongHover,
    }),
  success: ({ theme }: { theme: Theme }) =>
    plainVariant({
      bgColorValue: theme.colors.success.backgroundStrong,
      hoverColorValue: theme.colors.success.backgroundStrongHover,
      textColorValue: theme.colors.success.textStrong,
    }),
  'success-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.success.backgroundWeak,
      colorValue: theme.colors.success.textWeak,
      hoverColorValue: theme.colors.success.backgroundStrongHover,
    }),
  'success-soft-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.neutral.backgroundWeak,
      colorValue: theme.colors.neutral.textWeak,
      hoverColorValue: theme.colors.success.backgroundStrongHover,
    }),
  transparent: ({ theme: { colors } }: { theme: Theme }) => `
    background-color: transparent;
    color: ${colors.neutral.text};
  `,
  warning: ({ theme }: { theme: Theme }) =>
    plainVariant({
      bgColorValue: theme.colors.danger.backgroundStrong,
      hoverColorValue: theme.colors.danger.backgroundStrongHover,
      textColorValue: theme.colors.danger.textStrong,
    }),
  'warning-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.danger.backgroundWeak,
      colorValue: theme.colors.danger.text,
      hoverColorValue: theme.colors.danger.backgroundStrongHover,
    }),
  'warning-soft-bordered': ({ theme }: { theme: Theme }) =>
    borderedVariant({
      bgColorValue: theme.colors.neutral.backgroundWeak,
      colorValue: theme.colors.neutral.textWeak,
      hoverColorValue: theme.colors.danger.backgroundStrongHover,
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
  shouldForwardProp: prop => !['margin', 'position'].includes(prop),
})<StyledIcon>`
  display: flex;
  ${({ margin, position }) => `
    ${position === 'left' ? `margin-right: ${margin}px;` : ``}
    ${position === 'right' ? `margin-left: ${margin}px;` : ``}
    pointer-events: none;`}
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
  tooltip?: string
  tooltipBaseId?: string
  type?: 'button' | 'reset' | 'submit'
  variant: ButtonVariant
  onFocus?: FocusEventHandler
  onMouseEnter?: MouseEventHandler
} & BoxProps &
  ButtonHTMLAttributes<HTMLButtonElement>

const StyledButton = styled(Box, {
  shouldForwardProp: prop =>
    !['action', 'variant', 'extend', 'icon', 'download'].includes(prop),
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
    color: ${theme.colors.neutral.textDisabled};`}

  ${({ variant, disabled, theme }) =>
    variant !== 'link' &&
    disabled &&
    `
    background-color: ${theme.colors.neutral.backgroundDisabled};
    border-color: ${theme.colors.neutral.borderDisabled};
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
  as?: ElementType
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
  tooltip,
  tooltipBaseId,
  type: elementType = 'button',
  variant = 'primary',
  as: asProp,
  ...props
}: ButtonProps) => {
  const as = useMemo(() => {
    if (disabled) return 'button'
    if (asProp) return asProp
    if (href || download) return Link

    return 'button'
  }, [disabled, href, download, asProp])

  const displayProgressOnly = !children

  const iconMargin = extend || (progress && displayProgressOnly) ? 0 : 8
  const type = as === 'button' ? elementType : undefined

  return (
    <Tooltip id={tooltipBaseId} text={tooltip}>
      <StyledButton
        {...props}
        href={href}
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
            {progress === true || progress === 'left' ? (
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
            {progress === 'right' ? (
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
  tooltip: PropTypes.string,
  tooltipBaseId: PropTypes.string,
  variant: PropTypes.oneOf(buttonVariants as [ButtonVariant]),
}

Button.displayName = 'fwd(Button)'

export default Button
