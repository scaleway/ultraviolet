'use client'

import { useTheme } from '@ultraviolet/themes'
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

type FinalProps = CommonProps & {
  children: ReactNode
  name?: string
  href?: string
  target?: string
  download?: string
}

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
            autoFocus={autoFocus}
            className={`${className ? `${className} ` : ''}${button({ disabled, fullWidth, sentiment, size, variant })}`}
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
          autoFocus={autoFocus}
          className={`${className ? `${className} ` : ''}${button({ disabled, fullWidth, sentiment, size, variant })}`}
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
          type={type}
        >
          {content}
        </button>
      </Tooltip>
    )
  },
)
