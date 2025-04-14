'use client'

import type { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useRef } from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { useIsOverflowing } from '../../hooks/useIsOverflowing'
import type { Color, ExtendedColor } from '../../theme'
import { typography } from '../../theme'
import capitalize from '../../utils/capitalize'
import { Tooltip } from '../Tooltip'

const PROMINENCES = {
  default: '',
  strong: 'strong',
  stronger: 'stronger',
  weak: 'weak',
}

type ProminenceProps = keyof typeof PROMINENCES
type PlacementProps = CSSProperties['textAlign']
type WhiteSpaceProps = CSSProperties['whiteSpace']
type TextVariant = keyof typeof typography
export const textVariants = Object.keys(typography) as TextVariant[]

/**
 * Generate all styles available for text based on prominence and variants
 */
const generateStyles = ({
  placement,
  prominence,
  sentiment,
  variant,
  theme,
  oneLine,
  disabled,
  italic,
  underline,
  whiteSpace,
  strikeThrough,
}: {
  placement?: PlacementProps
  prominence: ProminenceProps
  theme: Theme
  variant: TextVariant
  sentiment?: ExtendedColor
  oneLine: boolean
  disabled: boolean
  italic: boolean
  underline: boolean
  whiteSpace?: WhiteSpaceProps
  strikeThrough?: boolean
}): string => {
  // stronger is available only for neutral sentiment
  const definedProminence =
    sentiment !== 'neutral' && prominence === 'stronger'
      ? capitalize(PROMINENCES.default)
      : capitalize(PROMINENCES[prominence])

  const isSentimentMonochrome = sentiment === 'black' || sentiment === 'white'

  const themeColor =
    sentiment && !isSentimentMonochrome ? theme.colors[sentiment] : undefined

  const text = `text${definedProminence}${
    disabled ? 'Disabled' : ''
  }` as keyof typeof themeColor

  const textColor =
    sentiment && !isSentimentMonochrome
      ? theme.colors[sentiment][text]
      : undefined

  return `
    ${sentiment ? `color: ${!isSentimentMonochrome ? textColor : theme.colors.other.monochrome[sentiment].text};` : ''}

    font-size: ${theme.typography[variant].fontSize};
    font-family: ${theme.typography[variant].fontFamily};
    font-weight: ${theme.typography[variant].weight};
    letter-spacing: ${theme.typography[variant].letterSpacing};
    line-height: ${theme.typography[variant].lineHeight};
    text-transform: ${theme.typography[variant].textCase};
    text-decoration: ${theme.typography[variant].textDecoration};
    ${placement ? ` text-align: ${placement};` : ''}
    ${whiteSpace ? `white-space: ${whiteSpace};` : ''}

    ${
      oneLine
        ? `white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;`
        : ''
    }
    ${italic ? `font-style: italic;` : ''}
    ${underline ? `text-decoration: underline;` : ''}
    ${strikeThrough ? `text-decoration: line-through;` : ''}
  `
}

type TextProps = {
  className?: string
  children: ReactNode
  placement?: PlacementProps
  variant: TextVariant
  /**
   * @deprecated use `sentiment` property instead
   */
  color?: Color
  sentiment?: ExtendedColor
  prominence?: ProminenceProps
  as: ElementType
  oneLine?: boolean
  disabled?: boolean
  italic?: boolean
  underline?: boolean
  id?: string
  dir?: 'ltr' | 'rtl' | 'auto'
  htmlFor?: string
  'data-testid'?: string
  'aria-hidden'?: boolean
  strikeThrough?: boolean
  whiteSpace?: WhiteSpaceProps
}

const StyledText = styled('div', {
  shouldForwardProp: prop =>
    ![
      'as',
      'placement',
      'variant',
      'sentiment',
      'prominence',
      'oneLine',
      'disabled',
      'italic',
      'underline',
      'strikeThrough',
      'whiteSpace',
    ].includes(prop),
})<{
  placement?: PlacementProps
  sentiment?: ExtendedColor
  prominence: ProminenceProps
  variant: TextVariant
  oneLine: boolean
  disabled: boolean
  italic: boolean
  underline: boolean
  htmlFor?: string
  strikeThrough?: boolean
  whiteSpace?: WhiteSpaceProps
}>(generateStyles)

/**
 * Text component is used to display text with different variants and sentiments.
 */
export const Text = ({
  variant,
  children,
  as,
  color,
  sentiment,
  oneLine = false,
  placement,
  prominence = 'default',
  className,
  disabled = false,
  italic = false,
  underline = false,
  strikeThrough = false,
  id,
  dir,
  whiteSpace,
  htmlFor,
  'data-testid': dataTestId,
  'aria-hidden': ariaHidden,
}: TextProps) => {
  const computedSentiment = sentiment ?? color
  const elementRef = useRef(null)
  const isOverflowing = useIsOverflowing(elementRef)

  const finalStringChildren = recursivelyGetChildrenString(children)

  return (
    <Tooltip text={oneLine && isOverflowing ? finalStringChildren : ''}>
      <StyledText
        ref={elementRef}
        as={as}
        placement={placement}
        prominence={prominence}
        sentiment={computedSentiment}
        variant={variant}
        oneLine={oneLine}
        className={className}
        disabled={disabled}
        italic={italic}
        underline={underline}
        strikeThrough={strikeThrough}
        id={id}
        dir={dir}
        htmlFor={htmlFor}
        data-testid={dataTestId}
        whiteSpace={whiteSpace}
        aria-hidden={ariaHidden}
      >
        {children}
      </StyledText>
    </Tooltip>
  )
}
