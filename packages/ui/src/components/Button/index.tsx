'use client'

import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { Icon } from '@ultraviolet/icons/legacy'
import type {
  AriaRole,
  ButtonHTMLAttributes,
  ComponentProps,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef } from 'react'
import type { ExtendedColor } from '../../theme'
import { Loader } from '../Loader'
import { Tooltip } from '../Tooltip'
import { SIZE_GAP_KEY, SIZE_HEIGHT, SIZE_PADDING_KEY } from './constants'

type ButtonSize = keyof typeof SIZE_HEIGHT

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
  white: 'focusNeutral',
  black: 'focusNeutral',
} as const

const isMonochrome = (sentiment: ExtendedColor) =>
  sentiment === 'white' || sentiment === 'black'

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
    width = `${theme.sizing[SIZE_HEIGHT[size]]}`
  }

  return `
    display: inline-flex;
    position: relative;
    height: ${theme.sizing[SIZE_HEIGHT[size]]};
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
    !isMonochrome(sentiment)
      ? theme.colors[sentiment].backgroundStrong
      : theme.colors.other.monochrome[sentiment].background};
  border: none;
  color: ${({ theme, sentiment }) => (!isMonochrome(sentiment) ? theme.colors[sentiment].textStrong : theme.colors.other.monochrome[sentiment === 'white' ? 'black' : 'white'].text)};

  ${({ theme, sentiment, disabled }) =>
    disabled
      ? `
            background: ${!isMonochrome(sentiment) ? theme.colors[sentiment].backgroundStrongDisabled : theme.colors.other.monochrome[sentiment].backgroundDisabled};
            color:
              ${!isMonochrome(sentiment) ? theme.colors[sentiment].textStrongDisabled : theme.colors.other.monochrome[sentiment].textDisabled};
        `
      : `
            &:hover, &:active
            {
                background: ${!isMonochrome(sentiment) ? theme.colors[sentiment].backgroundStrongHover : theme.colors.other.monochrome[sentiment].backgroundHover};
                color:
                ${!isMonochrome(sentiment) ? theme.colors[sentiment].textStrongHover : theme.colors.other.monochrome[sentiment === 'white' ? 'black' : 'white'].textHover};
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
      !isMonochrome(sentiment)
        ? theme.colors[sentiment][
            sentiment === 'neutral' ? 'borderStrong' : 'border'
          ]
        : theme.colors.other.monochrome[sentiment].border};
  color: ${({ theme, sentiment }) => (!isMonochrome(sentiment) ? theme.colors[sentiment].text : theme.colors.other.monochrome[sentiment].text)};

  ${({ theme, sentiment, disabled }) =>
    disabled
      ? `
        color:
          ${!isMonochrome(sentiment) ? theme.colors[sentiment].textDisabled : theme.colors.other.monochrome[sentiment].textDisabled};
        border: 1px solid ${
          !isMonochrome(sentiment)
            ? theme.colors[sentiment][
                sentiment === 'neutral'
                  ? 'borderStrongDisabled'
                  : 'borderDisabled'
              ]
            : theme.colors.other.monochrome[sentiment].borderDisabled
        };

    `
      : `
        &:hover, &:active
       {
            background: ${!isMonochrome(sentiment) ? theme.colors[sentiment].backgroundHover : theme.colors.other.monochrome[sentiment].backgroundHover};
            color:
            ${!isMonochrome(sentiment) ? theme.colors[sentiment].textHover : theme.colors.other.monochrome[sentiment === 'white' ? 'black' : 'white'].textHover};
            border: 1px solid ${
              !isMonochrome(sentiment)
                ? theme.colors[sentiment][
                    sentiment === 'neutral'
                      ? 'borderStrongHover'
                      : 'borderHover'
                  ]
                : theme.colors.other.monochrome[sentiment].borderHover
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
  color: ${({ theme, sentiment }) => (!isMonochrome(sentiment) ? theme.colors[sentiment].text : theme.colors.other.monochrome[sentiment].text)};

  ${({ theme, sentiment, disabled }) =>
    disabled
      ? `
        color:
          ${!isMonochrome(sentiment) ? theme.colors[sentiment].textDisabled : theme.colors.other.monochrome[sentiment].textDisabled};
      `
      : `
        &:hover, &:active
        {
            background: ${!isMonochrome(sentiment) ? theme.colors[sentiment].backgroundHover : theme.colors.other.monochrome[sentiment].backgroundHover};
            color:
              ${!isMonochrome(sentiment) ? theme.colors[sentiment].textHover : theme.colors.other.monochrome[sentiment === 'white' ? 'black' : 'white'].textHover};
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
  autoFocus?: ButtonHTMLAttributes<HTMLButtonElement>['autoFocus']
  variant?: ButtonVariant
  role?: AriaRole
  size?: ButtonSize
  className?: string
  'data-testid'?: string
  sentiment?: ExtendedColor
  disabled?: boolean
  /**
   * @deprecated `iconPosition` prop is deprecated and will be removed in the next major version.
   * You can directly set the icon into the children of the Button component.
   */
  iconPosition?: 'left' | 'right'
  /**
   * @deprecated `iconVariant` prop is deprecated and will be removed in the next major version.
   * You can directly set the icon into the children of the Button component.
   */
  iconVariant?: ComponentProps<typeof Icon>['variant']
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
  onMouseDown?: MouseEventHandler<HTMLElement>
  onMouseUp?: MouseEventHandler<HTMLElement>
  onMouseOut?: MouseEventHandler<HTMLElement>
  onMouseEnter?: MouseEventHandler<HTMLElement>
  onMouseLeave?: MouseEventHandler<HTMLElement>
}

// @note: using XOR utility was generating some lint erros
type FinalProps = CommonProps &
  (
    | {
        // Button : Children + optional Icon
        children: ReactNode
        /**
         * @deprecated `iconVariant` prop is deprecated and will be removed in the next major version.
         * You can directly set the icon into the children of the Button component.
         */
        icon?: ComponentProps<typeof Icon>['name']
        name?: string
        href?: never
        target?: never
        download?: never
      }
    | {
        // Button : Icon only
        children?: never
        /**
         * @deprecated `iconVariant` prop is deprecated and will be removed in the next major version.
         * You can directly set the icon into the children of the Button component.
         */
        icon: ComponentProps<typeof Icon>['name']
        name?: string
        href?: never
        target?: never
        download?: never
      }
    | {
        // Anchor : Children + optional Icon
        children: ReactNode
        /**
         * @deprecated `iconVariant` prop is deprecated and will be removed in the next major version.
         * You can directly set the icon into the children of the Button component.
         */
        icon?: ComponentProps<typeof Icon>['name']
        name?: never
        href: string
        target?: string
        download?: string
      }
    | {
        // Anchor : Children + Icon Only
        children?: never
        /**
         * @deprecated `iconVariant` prop is deprecated and will be removed in the next major version.
         * You can directly set the icon into the children of the Button component.
         */
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
      iconVariant,
      fullWidth = false,
      isLoading = false,
      children,
      onClick,
      onMouseDown,
      onMouseUp,
      onMouseOut,
      onMouseEnter,
      onMouseLeave,
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
      autoFocus,
    },
    ref,
  ) => {
    const computeIsDisabled = disabled || isLoading

    const content = (
      <>
        {!isLoading && icon ? (
          <Icon name={icon} size="small" variant={iconVariant} />
        ) : null}
        {isLoading ? (
          <Loader
            active
            trailColor="transparent"
            size="1em"
            color="currentColor"
          />
        ) : null}
        {children}
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
            autoFocus={autoFocus}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseOut={onMouseOut}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
          autoFocus={autoFocus}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseOut={onMouseOut}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {content}
        </Component>
      </Tooltip>
    )
  },
)
