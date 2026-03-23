'use client'

import { ArrowLeftIcon } from '@ultraviolet/icons/ArrowLeftIcon'
import { ArrowRightIcon } from '@ultraviolet/icons/ArrowRightIcon'
import { OpenInNewIcon } from '@ultraviolet/icons/OpenInNewIcon'
import { cn, renderElement } from '@ultraviolet/utils'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { Tooltip } from '../Tooltip'

import { linkStyle } from './styles.css'

import type { PROMINENCES } from './constants'
import type { RenderProp } from '@ultraviolet/utils'
import type {
  AnchorHTMLAttributes,
  CSSProperties,
  ForwardedRef,
  HTMLAttributeAnchorTarget,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from 'react'

export type ProminenceProps = keyof typeof PROMINENCES

type LinkSizes = 'large' | 'small' | 'xsmall'
type LinkIconPosition = 'left' | 'right'

type LinkProps = {
  children: ReactNode
  target?: HTMLAttributeAnchorTarget
  download?: string | boolean
  sentiment?: 'primary' | 'info'
  prominence?: ProminenceProps
  size?: LinkSizes
  iconPosition?: LinkIconPosition
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel']
  className?: string
  // For react router shouldn't be used directly
  onClick?: MouseEventHandler<HTMLAnchorElement>
  onKeyDown?: KeyboardEventHandler<HTMLAnchorElement>
  'aria-label'?: string
  'aria-current'?: AnchorHTMLAttributes<HTMLAnchorElement>['aria-current']
  'aria-keyshortcuts'?: string
  oneLine?: boolean
  'data-testid'?: string
  variant?: 'inline' | 'standalone'
  style?: CSSProperties
} & XOR<
  [
    {
      href?: string
    },
    {
      /**
       * Custom element or render function to use instead of the default anchor.
       *
       * Element form (props auto-merged):
       * ```tsx
       * <Link render={<NextLink href="/about" />}>About</Link>
       * ```
       *
       * Function form (you control prop merging):
       * ```tsx
       * <Link render={(props) => <NextLink {...props} href="/about" />}>About</Link>
       * ```
       */
      render: RenderProp<AnchorHTMLAttributes<HTMLAnchorElement>>
    },
  ]
>

const ICON_SIZE = 'small'
const BLANK_TARGET_ICON_SIZE = 'small'

/**
 * Link is a component used to navigate between pages or to external websites.
 * Use `render` prop to render a custom element (e.g., Next.js Link) while preserving Link's styling.
 */
export const Link = forwardRef(
  (
    {
      children,
      href,
      target,
      download,
      sentiment = 'info',
      prominence,
      size = 'large',
      iconPosition,
      rel,
      className,
      onClick,
      onKeyDown,
      'aria-label': ariaLabel,
      'aria-current': ariaCurrent,
      'aria-keyshortcuts': ariaKeyshortcuts,
      oneLine = false,
      'data-testid': dataTestId,
      variant = 'standalone',
      style,
      render,
    }: LinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const isBlank = target === '_blank'
    const computedRel = rel ?? (isBlank ? 'noopener noreferrer' : undefined)
    const [isTruncated, setIsTruncated] = useState(false)
    const elementRef = useRef<HTMLAnchorElement>(null)

    const usedRef = (ref as RefObject<HTMLAnchorElement>) ?? elementRef

    const finalStringChildren = recursivelyGetChildrenString(children)
    const textVariant = useMemo(() => {
      if (size === 'xsmall') {
        return 'captionStrong'
      }
      if (size === 'small') {
        return 'bodySmallStrong'
      }

      return 'bodyStrong'
    }, [size])
    useEffect(() => {
      if (oneLine && usedRef?.current) {
        const { offsetWidth, scrollWidth } = usedRef.current
        setIsTruncated(offsetWidth < scrollWidth)
      }
    }, [oneLine, ref, usedRef])

    const computedClassName = cn(
      className,
      linkStyle.link({
        oneLine,
        prominence,
        sentiment,
        type: variant,
        variant: textVariant,
      }),
      linkStyle.defaultLink,
    )

    if (render) {
      return (
        <Tooltip text={oneLine && isTruncated ? finalStringChildren : ''}>
          {renderElement(render, {
            children,
            className: computedClassName,
            'data-testid': dataTestId,
            'data-variant': variant,
            ref: usedRef,
            style,
          })}
        </Tooltip>
      )
    }

    return (
      <Tooltip text={oneLine && isTruncated ? finalStringChildren : ''}>
        <a
          aria-current={ariaCurrent}
          aria-keyshortcuts={ariaKeyshortcuts}
          aria-label={ariaLabel}
          className={computedClassName}
          data-testid={dataTestId}
          data-variant={variant}
          download={download}
          href={href}
          onClick={onClick}
          onKeyDown={onKeyDown}
          ref={usedRef}
          rel={computedRel}
          style={style}
          target={target}
        >
          {!isBlank && iconPosition === 'left' ? (
            <ArrowLeftIcon className={linkStyle.iconLeft} size={ICON_SIZE} />
          ) : null}
          {children}

          {isBlank ? (
            <span className={linkStyle.containerIcon}>
              <OpenInNewIcon
                className={linkStyle.iconRight}
                size={BLANK_TARGET_ICON_SIZE}
              />
            </span>
          ) : null}

          {!isBlank && iconPosition === 'right' ? (
            <ArrowRightIcon className={linkStyle.iconRight} size={ICON_SIZE} />
          ) : null}
        </a>
      </Tooltip>
    )
  },
)
