'use client'

import type { XOR } from '@scaleway/types'
import { useTheme } from '@ultraviolet/themes'
import { cn, renderElement } from '@ultraviolet/utils'
import type { RenderProp } from '@ultraviolet/utils'
import { forwardRef, useMemo } from 'react'
import type { AriaRole, ButtonHTMLAttributes, CSSProperties, MouseEventHandler, ReactNode, Ref } from 'react'
import { Loader } from '../Loader'
import { Tooltip } from '../Tooltip'
import { VisuallyHidden } from '../VisuallyHidden'
import { buttonStyle } from './styles.css'

type CommonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  autoFocus?: ButtonHTMLAttributes<HTMLButtonElement>['autoFocus']
  role?: AriaRole
  className?: string
  'data-testid'?: string
  /**
   * @private
   */
  'data-flip-id'?: string
  isLoading?: boolean
  /**
   * @deprecated use `accessibleLabel` instead.
   */
  'aria-label'?: string
  'aria-current'?: boolean
  'aria-controls'?: string
  'aria-expanded'?: boolean
  'aria-haspopup'?: boolean
  'aria-describedby'?: string
  'aria-disabled'?: boolean
  'aria-pressed'?: boolean
  'aria-roledescription'?: string
  'aria-keyshortcuts'?: string
  onClick?: MouseEventHandler<HTMLElement>
  /**
   * @deprecated use `tooltipDescription` instead.
   */
  tooltip?: string
  /**
   * Label of the button rendered inside a Tooltip.
   */
  tooltipLabel?: string
  /**
   * Description of the button rendered inside a Tooltip.
   */
  tooltipDescription?: string
  /**
   * Accessible label hidden in the button.
   * Prefer this over `aria-label` as the text is localizable.
   */
  accessibleLabel?: string
  form?: ButtonHTMLAttributes<HTMLButtonElement>['form']
  tabIndex?: ButtonHTMLAttributes<HTMLButtonElement>['tabIndex']
  onMouseDown?: MouseEventHandler<HTMLElement>
  onMouseUp?: MouseEventHandler<HTMLElement>
  onMouseOut?: MouseEventHandler<HTMLElement>
  onBlur?: ButtonHTMLAttributes<HTMLElement>['onBlur']
  onMouseEnter?: MouseEventHandler<HTMLElement>
  onMouseLeave?: MouseEventHandler<HTMLElement>
  onPointerDown?: ButtonHTMLAttributes<HTMLButtonElement>['onPointerDown']
  onKeyDown?: ButtonHTMLAttributes<HTMLButtonElement>['onKeyDown']
  style?: CSSProperties
  disabled?: boolean
  fullWidth?: boolean
  sentiment?: 'danger' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'black' | 'white'
  size?: 'small' | 'medium' | 'large' | 'xsmall'
  variant?: 'filled' | 'outlined' | 'ghost'
}

type BaseButtonProps = CommonProps & {
  children: ReactNode
  name?: string
} & XOR<
    [
      {
        href?: string
        target?: string
        download?: string
      },
      {
        /**
         * Custom element or render function to use instead of the default button.
         *
         * Element form (props auto-merged):
         * ```tsx
         * <Button render={<NextLink href="/about" />}>About</Button>
         * ```
         *
         * Function form (you control prop merging):
         * ```tsx
         * <Button render={(props) => <NextLink {...props} href="/about" />}>About</Button>
         * ```
         */
        render: RenderProp
      },
    ]
  >

/**
 * Button component is used to trigger an action or event, such as submitting a form, opening a dialog,
 * canceling an action, or performing a delete operation.
 * Use `render` prop to render a custom element (e.g., Next.js Link) while preserving Button's styling.
 */
export const Button = forwardRef<Element, BaseButtonProps>(
  (
    {
      type = 'button' as const,
      className,
      'data-testid': dataTestId,
      'data-flip-id': dataFlipId,
      sentiment = 'primary',
      variant = 'filled',
      size = 'large',
      disabled = false,
      fullWidth = false,
      isLoading = false,
      children,
      onClick,
      onMouseDown,
      onMouseUp,
      onMouseOut,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      onKeyDown,
      name,
      form,
      'aria-label': ariaLabel,
      'aria-current': ariaCurrent,
      'aria-controls': ariaControls,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHaspopup,
      'aria-describedby': ariaDescribedby,
      'aria-disabled': ariaDisabled,
      'aria-pressed': ariaPressed,
      'aria-roledescription': ariaRoledescription,
      'aria-keyshortcuts': ariaKeyshortcuts,
      href,
      download,
      target,
      role,
      tooltip,
      tooltipLabel,
      tooltipDescription,
      accessibleLabel,
      tabIndex,
      autoFocus,
      style,
      render,
    },
    ref,
  ) => {
    const computeIsDisabled = disabled || isLoading
    const { theme } = useTheme()
    const computedSentimentLoader = useMemo(() => {
      if (variant === 'filled' && !['black', 'white'].includes(sentiment)) {
        if (theme === 'light') {
          return 'white'
        }

        return 'black'
      }

      return sentiment
    }, [sentiment, theme, variant])

    const tooltipText = tooltipLabel || tooltipDescription || tooltip
    const tooltipRelation = tooltipLabel ? 'label' : 'description'
    const computedAccessibleLabel = accessibleLabel ?? ariaLabel

    const content = (
      <>
        {isLoading ? <Loader active sentiment={computedSentimentLoader} size="small" /> : null}
        {computedAccessibleLabel ? <VisuallyHidden>{computedAccessibleLabel}</VisuallyHidden> : null}
        {children}
      </>
    )

    const computedClassName = cn(className, buttonStyle.button({ disabled, fullWidth, sentiment, size, variant }))

    // render prop: render custom element with Button styling
    if (render) {
      return (
        <Tooltip containerFullWidth={fullWidth} relation={tooltipRelation} text={tooltipText}>
          {renderElement(render, {
            children,
            className: computedClassName,
            'data-testid': dataTestId,
            'data-flip-id': dataFlipId,
            // oxlint-disable-next-line typescript/no-unsafe-type-assertion
            ref: ref as Ref<HTMLElement>,
            form,
            style,
          })}
        </Tooltip>
      )
    }

    const commonProps = {
      'aria-controls': ariaControls,
      'aria-current': ariaCurrent,
      'aria-disabled': ariaDisabled ?? disabled,
      'aria-describedby': ariaDescribedby,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHaspopup,
      'aria-keyshortcuts': ariaKeyshortcuts,
      'aria-pressed': ariaPressed,
      'aria-roledescription': ariaRoledescription,
      autoFocus,
      className: computedClassName,
      'data-testid': dataTestId,
      'data-flip-id': dataFlipId,
      onBlur,
      onClick,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseOut,
      onMouseUp,
      role,
      style,
      tabIndex,
    }

    // @note: an anchor can't be disabled
    if (href && !computeIsDisabled) {
      return (
        <Tooltip containerFullWidth={fullWidth} relation={tooltipRelation} text={tooltipText}>
          <a
            {...commonProps}
            download={download}
            href={href}
            // oxlint-disable-next-line typescript/no-unsafe-type-assertion
            ref={ref as Ref<HTMLAnchorElement>}
            target={target}
          >
            {content}
          </a>
        </Tooltip>
      )
    }

    return (
      <Tooltip containerFullWidth={fullWidth} relation={tooltipRelation} text={tooltipText}>
        <button
          {...commonProps}
          disabled={computeIsDisabled}
          name={name}
          form={form}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          // oxlint-disable-next-line typescript/no-unsafe-type-assertion
          ref={ref as Ref<HTMLButtonElement>}
          type={type} // oxlint-disable-line react/button-has-type
        >
          {content}
        </button>
      </Tooltip>
    )
  },
)

Button.displayName = 'Button'
