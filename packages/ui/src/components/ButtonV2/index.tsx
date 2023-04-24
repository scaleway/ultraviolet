import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef } from 'react'
import type { SENTIMENTS } from '../../theme'
import { Icon } from '../Icon'
import { Loader } from '../Loader'

type SENTIMENT = (typeof SENTIMENTS)[number]

// SIZE
export const SIZE_HEIGHT = {
  large: 48,
  medium: 40,
  small: 32,
} as const
type ButtonSize = keyof typeof SIZE_HEIGHT
export const SIZE_SPACING_KEY = {
  large: 2,
  medium: 1.5,
  small: 1,
} as const
export const buttonSizes = Object.keys(SIZE_HEIGHT) as ButtonSize[]

// FOCUS RING
const FOCUS_RING_KEY = {
  danger: 'focusDanger',
  info: 'focusInfo',
  neutral: 'focusNeutral',
  primary: 'focusPrimary',
  success: 'focusSuccess',
  warning: 'focusWarning',
} as const

// VARIANTS
type StyledButtonProps = Required<
  Pick<
    FinalProps,
    'size' | 'sentiment' | 'disabled' | 'iconPosition' | 'fullWidth'
  >
>
const coreStyle = ({
  theme,
  size,
  sentiment,
  iconPosition,
  fullWidth,
  disabled,
}: { theme: Theme } & StyledButtonProps) => {
  const font =
    size === 'large'
      ? theme.typography.bodyStrong
      : theme.typography.bodySmallStrong

  return `display: inline-flex;
  height: ${SIZE_HEIGHT[size]}px;
  padding: 0 ${theme.space[SIZE_SPACING_KEY[size]]};
  flex-direction: ${iconPosition === 'right' ? 'row-reverse' : 'row'};
  gap: ${theme.space['1']};
  border-radius: ${theme.radii.default};
  align-items: center;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  width: ${fullWidth ? '100%' : 'auto'};
  justify-content: center;
  outline-offset: 2px;

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
    text-decoration: ${font.textDecoration};
`
}

const StyledFilledButton = styled('button', {
  shouldForwardProp: prop =>
    !['size', 'sentiment', 'iconPosition', 'fullWidth'].includes(prop),
})<StyledButtonProps>`
  ${args => coreStyle(args)}

  background: ${({ theme, sentiment }) =>
    theme.colors[sentiment].backgroundStrong};
  border: none;
  color: ${({ theme, sentiment }) =>
    theme.colors[sentiment][sentiment === 'neutral' ? 'text' : 'textStrong']};

  ${({ theme, sentiment, disabled }) =>
    disabled
      ? `
            background: ${theme.colors[sentiment].backgroundStrongDisabled};
            color:
              ${
                theme.colors[sentiment][
                  sentiment === 'neutral'
                    ? 'textDisabled'
                    : 'textStrongDisabled'
                ]
              };
        `
      : `
            &:hover, &:active
            {
                background: ${theme.colors[sentiment].backgroundStrongHover};
                color:
                ${
                  theme.colors[sentiment][
                    sentiment === 'neutral' ? 'textHover' : 'textStrongHover'
                  ]
                };
            }
  `}
`

const StyledOutlinedButton = styled('button', {
  shouldForwardProp: prop =>
    !['size', 'sentiment', 'iconPosition', 'fullWidth'].includes(prop),
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
            background: ${theme.colors[sentiment].backgroundWeakHover};
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
    !['size', 'sentiment', 'iconPosition', 'fullWidth'].includes(prop),
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
            background: ${theme.colors[sentiment].backgroundWeakHover};
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
  size?: ButtonSize
  className?: string
  'data-testid'?: string
  sentiment?: SENTIMENT
  disabled?: boolean
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  isLoading?: boolean
  'aria-label'?: string
  onClick?: MouseEventHandler<HTMLElement>
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

export const ButtonV2 = forwardRef<Element, FinalProps>(
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
      href,
      download,
      target,
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

    if (href) {
      const Component = VARIANTS_COMPONENTS[variant].link

      return (
        <Component
          className={className}
          data-testid={dataTestId}
          disabled={computeIsDisabled}
          fullWidth={fullWidth}
          iconPosition={iconPosition}
          sentiment={sentiment}
          size={size}
          type={type}
          onClick={onClick}
          aria-label={ariaLabel}
          href={href}
          target={target}
          download={download}
          ref={ref as Ref<HTMLAnchorElement>}
        >
          {content}
        </Component>
      )
    }

    const Component = VARIANTS_COMPONENTS[variant].button

    return (
      <Component
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
      >
        {content}
      </Component>
    )
  },
)
