import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons'
import type {
  AriaRole,
  ButtonHTMLAttributes,
  ComponentProps,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef } from 'react'
import type { SENTIMENTS } from '../../theme'
import { Loader } from '../Loader'
import { Tooltip } from '../Tooltip'

type SENTIMENT = (typeof SENTIMENTS)[number]

// SIZE
const SIZE_HEIGHT = {
  large: 48,
  medium: 40,
  small: 32,
  xsmall: 24,
} as const
type ButtonSize = keyof typeof SIZE_HEIGHT
const SIZE_PADDING_KEY = {
  large: 2,
  medium: 1.5,
  small: 1,
  xsmall: 0.5,
} as const
const SIZE_GAP_KEY = {
  large: 1,
  medium: 1,
  small: 1,
  xsmall: 0.5,
} as const
export const buttonSizes = Object.keys(SIZE_HEIGHT) as ButtonSize[]

// FOCUS RING
const FOCUS_RING_KEY = {
  danger: 'focusDanger',
  info: 'focusInfo',
  neutral: 'focusNeutral',
  primary: 'focusPrimary',
  // @note: no focusSecondary so far, it will be added later, so far focusPrimary sounds fine
  secondary: 'focusPrimary',
  success: 'focusSuccess',
  warning: 'focusWarning',
} as const

// VARIANTS
type StyledButtonProps = Required<
  Pick<
    FinalProps,
    'size' | 'sentiment' | 'disabled' | 'iconPosition' | 'fullWidth'
  >
> & { iconOnly: boolean }
const coreStyle = ({
  theme,
  size,
  sentiment,
  iconPosition,
  fullWidth,
  disabled,
  iconOnly,
}: { theme: Theme } & StyledButtonProps) => {
  const font =
    size === 'large'
      ? theme.typography.bodyStrong
      : theme.typography.bodySmallStrong

  let width = 'auto'
  if (fullWidth) {
    width = '100%'
  } else if (iconOnly) {
    width = `${SIZE_HEIGHT[size]}px`
  }

  return `display: inline-flex;
  height: ${SIZE_HEIGHT[size]}px;
  padding: 0 ${theme.space[SIZE_PADDING_KEY[size]]};
  flex-direction: ${iconPosition === 'right' ? 'row-reverse' : 'row'};
  gap: ${theme.space[SIZE_GAP_KEY[size]]};
  border-radius: ${theme.radii.default};
  box-sizing: border-box;
  width: ${width};
  align-items: center;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  justify-content: center;
  outline-offset: 2px;
  white-space: nowrap;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }


  ${
    disabled
      ? ''
      : `
          &:active {
            box-shadow: ${theme.shadows[FOCUS_RING_KEY[sentiment]]};
          }
        `
  }

  /* We can't use Text component because of button hover effect, so we need to duplicate */
  font-size: ${font.fontSize};
  font-family: ${font.fontFamily};
  font-weight: ${font.weight};
  letter-spacing: ${font.letterSpacing};
  line-height: ${font.lineHeight};
  paragraph-spacing: ${font.paragraphSpacing};
  text-case: ${font.textCase};
`
}

const StyledFilledButton = styled('button', {
  shouldForwardProp: prop =>
    !['size', 'sentiment', 'iconPosition', 'fullWidth', 'iconOnly'].includes(
      prop,
    ),
})<StyledButtonProps>`
  ${args => coreStyle(args)}

  background: ${({ theme, sentiment }) =>
    theme.colors[sentiment].backgroundStrong};
  border: none;
  color: ${({ theme, sentiment }) => theme.colors[sentiment].textStrong};

  ${({ theme, sentiment, disabled }) =>
    disabled
      ? `
            background: ${theme.colors[sentiment].backgroundStrongDisabled};
            color:
              ${theme.colors[sentiment].textStrongDisabled};
        `
      : `
            &:hover, &:active
            {
                background: ${theme.colors[sentiment].backgroundStrongHover};
                color:
                ${theme.colors[sentiment].textStrongHover};
            }
  `}
`

const StyledOutlinedButton = styled('button', {
  shouldForwardProp: prop =>
    !['size', 'sentiment', 'iconPosition', 'fullWidth', 'iconOnly'].includes(
      prop,
    ),
})<StyledButtonProps>`
  ${args => coreStyle(args)}

  background: none;
  border: 1px solid
    ${({ theme, sentiment }) =>
      theme.colors[sentiment][
        sentiment === 'neutral' ? 'borderStrong' : 'borderWeak'
      ]};
  color: ${({ theme, sentiment }) =>
    theme.colors[sentiment][sentiment === 'neutral' ? 'text' : 'textWeak']};

  ${({ theme, sentiment, disabled }) =>
    disabled
      ? `
        color:
          ${
            theme.colors[sentiment][
              sentiment === 'neutral' ? 'textDisabled' : 'textWeakDisabled'
            ]
          };
        border: 1px solid ${
          theme.colors[sentiment][
            sentiment === 'neutral'
              ? 'borderStrongDisabled'
              : 'borderWeakDisabled'
          ]
        };

    `
      : `
        &:hover, &:active
       {
            background: ${theme.colors[sentiment].backgroundHover};
            color:
            ${
              theme.colors[sentiment][
                sentiment === 'neutral' ? 'textHover' : 'textWeakHover'
              ]
            };
            border: 1px solid ${
              theme.colors[sentiment][
                sentiment === 'neutral'
                  ? 'borderStrongHover'
                  : 'borderWeakHover'
              ]
            };

        }
`};
`

const StyledGhostButton = styled('button', {
  shouldForwardProp: prop =>
    !['size', 'sentiment', 'iconPosition', 'fullWidth', 'iconOnly'].includes(
      prop,
    ),
})<StyledButtonProps>`
  ${args => coreStyle(args)}

  background: none;
  border: none;
  color: ${({ theme, sentiment }) =>
    theme.colors[sentiment][sentiment === 'neutral' ? 'text' : 'textWeak']};

  ${({ theme, sentiment, disabled }) =>
    disabled
      ? `
        color:
          ${
            theme.colors[sentiment][
              sentiment === 'neutral' ? 'textDisabled' : 'textWeakDisabled'
            ]
          };
      `
      : `
        &:hover, &:active
        {
            background: ${theme.colors[sentiment].backgroundHover};
            color:
              ${
                theme.colors[sentiment][
                  sentiment === 'neutral' ? 'textHover' : 'textWeakHover'
                ]
              };
        }
`}
`

const VARIANTS_COMPONENTS = {
  filled: {
    button: StyledFilledButton,
    link: StyledFilledButton.withComponent('a'),
  },
  outlined: {
    button: StyledOutlinedButton,
    link: StyledOutlinedButton.withComponent('a'),
  },
  ghost: {
    button: StyledGhostButton,
    link: StyledGhostButton.withComponent('a'),
  },
}
type ButtonVariant = keyof typeof VARIANTS_COMPONENTS
export const buttonVariants = Object.keys(
  VARIANTS_COMPONENTS,
) as ButtonVariant[]

type CommonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  variant?: ButtonVariant
  role?: AriaRole
  size?: ButtonSize
  className?: string
  'data-testid'?: string
  sentiment?: SENTIMENT
  disabled?: boolean
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  isLoading?: boolean
  'aria-label'?: string
  'aria-current'?: boolean
  'aria-controls'?: string
  'aria-expanded'?: boolean
  'aria-haspopup'?: boolean
  onClick?: MouseEventHandler<HTMLElement>
  tooltip?: string
  tabIndex?: ButtonHTMLAttributes<HTMLButtonElement>['tabIndex']
}

// @note: using XOR utility was generating some lint erros
type FinalProps = CommonProps &
  (
    | {
        // Button : Children + optional Icon
        children: ReactNode
        icon?: ComponentProps<typeof Icon>['name']
        name?: string
        href?: never
        target?: never
        download?: never
      }
    | {
        // Button : Icon only
        children?: never
        icon: ComponentProps<typeof Icon>['name']
        name?: string
        href?: never
        target?: never
        download?: never
      }
    | {
        // Anchor : Children + optional Icon
        children: ReactNode
        icon?: ComponentProps<typeof Icon>['name']
        name?: never
        href: string
        target?: string
        download?: string
      }
    | {
        // Anchor : Children + Icon Only
        children?: never
        icon: ComponentProps<typeof Icon>['name']
        name?: never
        href: string
        target?: string
        download?: string
      }
  )

/**
 * Button component is used to trigger an action or event, such as submitting a form, opening a dialog,
 * canceling an action, or performing a delete operation.
 */
export const Button = forwardRef<Element, FinalProps>(
  (
    {
      type = 'button',
      className,
      'data-testid': dataTestId,
      sentiment = 'primary',
      variant = 'filled',
      size = 'large',
      disabled = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      isLoading = false,
      children,
      onClick,
      name,
      'aria-label': ariaLabel,
      'aria-current': ariaCurrent,
      'aria-controls': ariaControls,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHaspopup,
      href,
      download,
      target,
      role,
      tooltip,
      tabIndex,
    },
    ref,
  ) => {
    const computeIsDisabled = disabled || isLoading
    const content = (
      <>
        {!isLoading && icon ? <Icon name={icon} size={16} /> : null}
        {isLoading ? (
          <Loader
            active
            trailColor="transparent"
            size="1em"
            color="currentColor"
          />
        ) : null}
        {children && typeof children !== 'string' ? (
          <div>{children}</div>
        ) : (
          children
        )}
      </>
    )

    // @note: an anchor can't be disabled
    if (href && !computeIsDisabled) {
      const Component = VARIANTS_COMPONENTS[variant].link

      return (
        <Tooltip text={tooltip} containerFullWidth={fullWidth}>
          <Component
            role={role}
            className={className}
            data-testid={dataTestId}
            disabled={false}
            fullWidth={fullWidth}
            iconPosition={iconPosition}
            sentiment={sentiment}
            size={size}
            type={type}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-current={ariaCurrent}
            aria-controls={ariaControls}
            aria-expanded={ariaExpanded}
            aria-haspopup={ariaHaspopup}
            href={href}
            target={target}
            download={download}
            ref={ref as Ref<HTMLAnchorElement>}
            iconOnly={!!icon && !children}
            tabIndex={tabIndex}
          >
            {content}
          </Component>
        </Tooltip>
      )
    }

    const Component = VARIANTS_COMPONENTS[variant].button

    return (
      <Tooltip text={tooltip} containerFullWidth={fullWidth}>
        <Component
          role={role}
          className={className}
          data-testid={dataTestId}
          disabled={computeIsDisabled}
          fullWidth={fullWidth}
          iconPosition={iconPosition}
          sentiment={sentiment}
          size={size}
          type={type}
          onClick={onClick}
          ref={ref as Ref<HTMLButtonElement>}
          name={name}
          aria-label={ariaLabel}
          aria-current={ariaCurrent}
          aria-controls={ariaControls}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHaspopup}
          iconOnly={!!icon && !children}
          tabIndex={tabIndex}
        >
          {content}
        </Component>
      </Tooltip>
    )
  },
)
