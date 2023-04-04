import styled from '@emotion/styled'
import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ForwardedRef,
  ReactNode,
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
    ButtonProps,
    'size' | 'sentiment' | 'disabled' | 'iconPosition' | 'fullWidth'
  >
>
const StyledButton = styled('button', {
  shouldForwardProp: prop =>
    !['size', 'sentiment', 'iconPosition', 'fullWidth'].includes(prop),
})<StyledButtonProps>`
  display: inline-flex;
  height: ${({ size }) => `${SIZE_HEIGHT[size]}px`};
  padding: 0 ${({ theme, size }) => theme.space[SIZE_SPACING_KEY[size]]};
  flex-direction: ${({ iconPosition }) =>
    iconPosition === 'right' ? 'row-reverse' : 'row'};
  gap: ${({ theme }) => theme.space['1']};
  border-radius: ${({ theme }) => theme.radii.default};
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  justify-content: center;
  outline-offset: 2px;

  ${({ theme, sentiment, disabled }) =>
    disabled
      ? ''
      : `
          &:active {
            box-shadow: ${theme.shadows[FOCUS_RING_KEY[sentiment]]};
          }
        `}

  /* We can't use Text component because of button hover effect, so we need to duplicate */
  ${({ theme, size }) => {
    const font =
      size === 'large'
        ? theme.typography.bodyStrong
        : theme.typography.bodySmallStrong

    return `
    font-size: ${font.fontSize};
    font-family: ${font.fontFamily};
    font-weight: ${font.fontWeight};
    letter-spacing: ${font.letterSpacing};
    line-height: ${font.lineHeight};
    paragraph-spacing: ${font.paragraphSpacing};
    text-case: ${font.textCase};
    text-decoration: ${font.textDecoration};
  `
  }}
`
const StyledFilledButton = styled(StyledButton)`
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
const StyledOutlinedButton = styled(StyledButton)`
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
const StyledGhostButton = styled(StyledButton)`
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
  filled: StyledFilledButton,
  outlined: StyledOutlinedButton,
  ghost: StyledGhostButton,
}
type ButtonVariant = keyof typeof VARIANTS_COMPONENTS
export const buttonVariants = Object.keys(
  VARIANTS_COMPONENTS,
) as ButtonVariant[]

type ButtonProps = {
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
  onClick: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
} & (
  | { children: ReactNode; icon?: ComponentProps<typeof Icon>['name'] }
  | { children?: ReactNode; icon: ComponentProps<typeof Icon>['name'] }
)

export const ButtonV2 = forwardRef(
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
      onClick,
      children,
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const Component = VARIANTS_COMPONENTS[variant]
    const computeIsDisabled = disabled || isLoading

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
        ref={ref}
      >
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
      </Component>
    )
  },
)
