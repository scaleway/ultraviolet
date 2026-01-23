// biome-ignore-all lint/a11y/useAriaPropsSupportedByRole: to fix

'use client'

import { useTheme } from '@ultraviolet/themes'
import type { RenderProp } from '@ultraviolet/utils'
import { cn, renderElement } from '@ultraviolet/utils'
import type {
  AriaRole,
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react'
import { forwardRef, useMemo } from 'react'
import { Loader } from '../Loader'
import { Tooltip } from '../Tooltip'
import type { ButtonVariants } from './styles.css'
import { button } from './styles.css'

type CommonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  autoFocus?: ButtonHTMLAttributes<HTMLButtonElement>['autoFocus']
  role?: AriaRole
  className?: string
  'data-testid'?: string
  isLoading?: boolean
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
  tooltip?: string
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
} & ButtonVariants

type BaseButtonProps = CommonProps & {
  children: ReactNode
  name?: string
} & XOR<[{
  href: string
  target?: string,
  download?: string
}, {
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
}]>


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

    const content = (
      <>
        {isLoading ? (
          <Loader active sentiment={computedSentimentLoader} size="small" />
        ) : null}
        {children}
      </>
    )

    const computedClassName = cn(
      className,
      button({ disabled, fullWidth, sentiment, size, variant }),
    )

    // render prop: render custom element with Button styling
    if (render) {
      return (
        <Tooltip containerFullWidth={fullWidth} text={tooltip}>
          {renderElement(render, {
            children,
            className: computedClassName,
            'data-testid': dataTestId,
            ref: ref as Ref<HTMLElement>,
            style,
          })}
        </Tooltip>
      )
    }

    // @note: an anchor can't be disabled
    if (href && !computeIsDisabled) {
      return (
        <Tooltip containerFullWidth={fullWidth} text={tooltip}>
          <a
            aria-controls={ariaControls}
            aria-current={ariaCurrent}
            aria-describedby={ariaDescribedby}
            aria-disabled={ariaDisabled ?? disabled}
            aria-expanded={ariaExpanded}
            aria-haspopup={ariaHaspopup}
            aria-keyshortcuts={ariaKeyshortcuts}
            aria-label={ariaLabel}
            aria-pressed={ariaPressed}
            aria-roledescription={ariaRoledescription}
            autoFocus={autoFocus} // oxlint-disable-line jsx_a11y/no-autofocus
            className={computedClassName}
            data-testid={dataTestId}
            download={download}
            href={href}
            onBlur={onBlur}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseOut={onMouseOut}
            onMouseUp={onMouseUp}
            ref={ref as Ref<HTMLAnchorElement>}
            role={role}
            style={style}
            tabIndex={tabIndex}
            target={target}
            type={type}
          >
            {content}
          </a>
        </Tooltip>
      )
    }

    return (
      <Tooltip containerFullWidth={fullWidth} text={tooltip}>
        <button
          aria-controls={ariaControls}
          aria-current={ariaCurrent}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHaspopup}
          aria-label={ariaLabel}
          autoFocus={autoFocus} // oxlint-disable-line jsx_a11y/no-autofocus
          className={computedClassName}
          data-testid={dataTestId}
          disabled={computeIsDisabled}
          name={name}
          onBlur={onBlur}
          onClick={onClick}
          onKeyDown={onKeyDown}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseOut={onMouseOut}
          onMouseUp={onMouseUp}
          onPointerDown={onPointerDown}
          ref={ref as Ref<HTMLButtonElement>}
          role={role}
          style={style}
          tabIndex={tabIndex}
          type={type} // oxlint-disable-line react/button-has-type
        >
          {content}
        </button>
      </Tooltip>
    )
  },
)
