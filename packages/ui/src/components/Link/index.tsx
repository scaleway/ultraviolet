'use client'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  OpenInNewIcon,
} from '@ultraviolet/icons'
import type {
  AnchorHTMLAttributes,
  ForwardedRef,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
  RefObject,
} from 'react'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { Tooltip } from '../Tooltip'
import type { PROMINENCES } from './constants'
import {
  containerIconLink,
  defaultLink,
  iconLeftLink,
  iconRightLink,
  link,
} from './styles.css'

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
  href: string
  // For react router shouldn't be used directly
  onClick?: MouseEventHandler<HTMLAnchorElement>
  'aria-label'?: string
  'aria-current'?: AnchorHTMLAttributes<HTMLAnchorElement>['aria-current']
  oneLine?: boolean
  'data-testid'?: string
  variant?: 'inline' | 'standalone'
}

const ICON_SIZE = 'small'
const BLANK_TARGET_ICON_SIZE = 'small'

/**
 * Link is a component used to navigate between pages or to external websites.
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
      'aria-label': ariaLabel,
      'aria-current': ariaCurrent,
      oneLine = false,
      'data-testid': dataTestId,
      variant = 'standalone',
    }: LinkProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const isBlank = target === '_blank'
    const computedRel = rel || (isBlank ? 'noopener noreferrer' : undefined)
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

    return (
      <Tooltip text={oneLine && isTruncated ? finalStringChildren : ''}>
        <a
          aria-current={ariaCurrent}
          aria-label={ariaLabel}
          className={`${className ? `${className} ` : ''}${link({ oneLine, prominence, sentiment, type: variant, variant: textVariant })} ${defaultLink}`}
          data-testid={dataTestId}
          data-variant={variant}
          download={download}
          href={href}
          onClick={onClick}
          ref={usedRef}
          rel={computedRel}
          target={target}
        >
          {!isBlank && iconPosition === 'left' ? (
            <ArrowLeftIcon className={iconLeftLink} size={ICON_SIZE} />
          ) : null}
          {children}

          {isBlank ? (
            <span className={containerIconLink}>
              <OpenInNewIcon
                className={iconRightLink}
                size={BLANK_TARGET_ICON_SIZE}
              />
            </span>
          ) : null}

          {!isBlank && iconPosition === 'right' ? (
            <ArrowRightIcon className={iconRightLink} size={ICON_SIZE} />
          ) : null}
        </a>
      </Tooltip>
    )
  },
)
