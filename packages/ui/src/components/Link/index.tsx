'use client'

import styled from '@emotion/styled'
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
import type { ExtendedColor } from '../../theme'
import capitalize from '../../utils/capitalize'
import { Tooltip } from '../Tooltip'

const StyledArrowLeftIcon = styled(ArrowLeftIcon)`
  margin-right: ${({ theme }) => theme.space['0.5']};
`

const StyledArrowRightIcon = styled(ArrowRightIcon)`
  margin-left: ${({ theme }) => theme.space['0.5']};
`

const StyledOpenInNewIcon = StyledArrowRightIcon.withComponent(OpenInNewIcon)

export const PROMINENCES = {
  default: '',
  weak: 'weak',
  strong: 'strong',
  stronger: 'stronger',
}

export type ProminenceProps = keyof typeof PROMINENCES
type SupportedSentiments = 'primary'

/**
 * @deprecated Only `primary` is supported
 */
type DeprecatedSentiments = Exclude<ExtendedColor, SupportedSentiments>

type LinkSizes = 'large' | 'small' | 'xsmall'
type LinkIconPosition = 'left' | 'right'
type LinkProps = {
  children: ReactNode
  target?: HTMLAttributeAnchorTarget
  download?: string | boolean
  /**
   * **Only sentiment `primary` is supported.**
   * All the other sentiments are deprecated
   */
  sentiment?: SupportedSentiments | DeprecatedSentiments
  prominence?: ProminenceProps
  size?: LinkSizes
  iconPosition?: LinkIconPosition
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel']
  className?: string
  href: string
  // For react router shouldn't be used directly
  onClick?: MouseEventHandler<HTMLAnchorElement>
  'aria-label'?: string
  oneLine?: boolean
  'data-testid'?: string
  variant?: 'inline' | 'standalone'
}

const ICON_SIZE = 'small'
const BLANK_TARGET_ICON_SIZE = 'small'
const TRANSITION_DURATION = 250

const StyledExternalIconContainer = styled.span`
  display: inline-flex;
  padding-bottom: ${({ theme }) => theme.space['0.5']};
`

const StyledLink = styled('a', {
  shouldForwardProp: prop =>
    !['sentiment', 'iconPosition', 'as', 'oneLine'].includes(prop),
})<{
  sentiment: ExtendedColor
  prominence?: ProminenceProps
  variant: 'captionStrong' | 'bodySmallStrong' | 'bodyStrong'
  iconPosition?: LinkIconPosition
  oneLine?: boolean
}>`
  background-color: transparent;
  border: none;
  padding: 0;
  color: ${({ theme, sentiment, prominence }) => {
    const isMonochrome = sentiment === 'white' || sentiment === 'black'

    if (!isMonochrome) {
      const definedProminence = capitalize(PROMINENCES[prominence ?? 'default'])
      const themeColor = theme.colors[sentiment]
      const text = `text${definedProminence}` as keyof typeof themeColor

      return theme.colors[sentiment]?.[text] ?? theme.colors.neutral.text
    }

    return theme.colors.other.monochrome[sentiment].text
  }};
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  text-decoration-color: transparent;
  transition: text-decoration-color ${TRANSITION_DURATION}ms ease-out;

  ${StyledArrowLeftIcon}, ${StyledArrowRightIcon}, ${StyledOpenInNewIcon} {
    transition: transform ${TRANSITION_DURATION}ms ease-out;
  }

  gap: ${({ theme }) => theme.space['1']};
  position: relative;
  cursor: pointer;

  > * {
    // Safari issue when something is inside an anchor
    pointer-events: none;
  }

  ${({ oneLine }) =>
    oneLine
      ? `white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;`
      : 'width: fit-content;'}

  ${({ variant, theme }) => `
      font-size: ${theme.typography[variant].fontSize};
      font-family: ${theme.typography[variant].fontFamily};
      font-weight: ${theme.typography[variant].weight};
      letter-spacing: ${theme.typography[variant].letterSpacing};
      line-height: ${theme.typography[variant].lineHeight};
      paragraph-spacing: ${theme.typography[variant].paragraphSpacing};
      text-case: ${theme.typography[variant].textCase};
    `}


  &:visited {
      color: ${({ theme }) => theme.colors.primary.text};
      text-decoration-color: transparent;
  }


  &:hover,
  &:focus {
    ${StyledArrowLeftIcon}, ${StyledArrowRightIcon}, ${StyledOpenInNewIcon} {
      transform: ${({ theme, iconPosition }) =>
        iconPosition === 'left'
          ? `translate(${theme.space['0.25']}, 0)`
          : `translate(-${theme.space['0.25']}, 0)`};
    }

    outline: none;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    ${({ theme, sentiment, prominence }) => {
      const isMonochrome = sentiment === 'white' || sentiment === 'black'

      if (!isMonochrome) {
        const definedProminence = capitalize(
          PROMINENCES[prominence ?? 'default'],
        )

        const themeColor = theme.colors[sentiment]

        const text = `text${definedProminence}Hover` as keyof typeof themeColor

        return `
        color: ${
          theme.colors[sentiment]?.[text] ?? theme.colors.neutral.textHover
        };
        text-decoration-color: ${
          theme.colors[sentiment]?.[text] ?? theme.colors.neutral.textHover
        };`
      }

      return `
        color: ${theme.colors.other.monochrome[sentiment].textHover};
        text-decoration-color: ${theme.colors.other.monochrome[sentiment].textHover};
      `
    }}

    &:visited {
      color: ${({ theme }) => theme.colors.primary.textHover};
      text-decoration-color: ${({ theme }) => theme.colors.primary.textHover};
    }
  }

  &[data-variant='inline'] {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }

  &:hover::after,
  &:focus::after {
    background-color: ${({ theme, sentiment }) => {
      const isMonochrome = sentiment === 'white' || sentiment === 'black'

      if (!isMonochrome) {
        return theme.colors[sentiment]?.text ?? theme.colors.neutral.text
      }

      return theme.colors.other.monochrome[sentiment].text
    }};
  }

  &:active {
    text-decoration-thickness: 2px;
  }
`

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
      if (size === 'xsmall') return 'captionStrong'
      if (size === 'small') return 'bodySmallStrong'

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
        <StyledLink
          href={href}
          target={target}
          download={download}
          ref={usedRef}
          sentiment={sentiment}
          prominence={prominence}
          rel={computedRel}
          className={className}
          variant={textVariant}
          onClick={onClick}
          iconPosition={iconPosition}
          aria-label={ariaLabel}
          oneLine={oneLine}
          data-testid={dataTestId}
          data-variant={variant}
        >
          {!isBlank && iconPosition === 'left' ? (
            <StyledArrowLeftIcon size={ICON_SIZE} />
          ) : null}
          {children}

          {isBlank ? (
            <StyledExternalIconContainer>
              <StyledOpenInNewIcon size={BLANK_TARGET_ICON_SIZE} />
            </StyledExternalIconContainer>
          ) : null}

          {!isBlank && iconPosition === 'right' ? (
            <StyledArrowRightIcon size={ICON_SIZE} />
          ) : null}
        </StyledLink>
      </Tooltip>
    )
  },
)
