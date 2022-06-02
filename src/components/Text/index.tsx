import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { ElementType, ReactNode, useCallback, useState } from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { Color, typography } from '../../theme'
import capitalize from '../../utils/capitalize'
import Tooltip from '../Tooltip'

export const PROMINENCES = {
  default: '',
  strong: 'strong',
  weak: 'weak',
}

type ProminenceProps = keyof typeof PROMINENCES

/**
 * Generate all styles available for text based on prominence and variants
 * @param prominence
 * @param variant
 * @param theme
 */
const generateStyles = ({
  prominence,
  color,
  variant,
  theme,
  oneLine,
}: {
  prominence: ProminenceProps
  theme: Theme
  variant: TextVariant
  color: Color
  oneLine: boolean
}): string => {
  const definedProminence = capitalize(PROMINENCES[prominence])

  const themeColor = theme.colors[color]
  const text = `text${definedProminence}` as keyof typeof themeColor

  if (!theme) return ''

  return `
    color: ${theme.colors[color][text]};

    font-size: ${theme.typography[variant].fontSize};
    font-family: ${theme.typography[variant].fontFamily};
    font-weight: ${theme.typography[variant].fontWeight};
    letter-spacing: ${theme.typography[variant].letterSpacing};
    line-height: ${theme.typography[variant].lineHeight};
    paragraph-spacing: ${theme.typography[variant].paragraphSpacing};
    text-case: ${theme.typography[variant].textCase};
    text-decoration: ${theme.typography[variant].textDecoration};

    ${
      oneLine
        ? `white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;`
        : ''
    }

    [title]:hover::after {
      content: attr(title);
      position: absolute;
      top: -100%;
      left: 0;
    }
  `
}

export type TextVariant = keyof typeof typography
export const textVariants = Object.keys(typography) as TextVariant[]

type TextProps = {
  className?: string
  children: ReactNode
  variant: TextVariant
  color?: Color
  prominence?: ProminenceProps
  as: ElementType
  oneLine?: boolean
}

const StyledText = styled('div', {
  shouldForwardProp: prop =>
    !['as', 'variant', 'color', 'prominence', 'oneLine'].includes(
      prop.toString(),
    ),
})`
  ${({
    color,
    prominence,
    variant,
    oneLine,
    theme,
  }: {
    prominence: ProminenceProps
    theme: Theme
    variant: TextVariant
    color: Color
    oneLine: boolean
  }) =>
    generateStyles({
      color,
      oneLine,
      prominence,
      theme,
      variant,
    })};
`

const Text = ({
  variant,
  children,
  as,
  color = 'neutral',
  oneLine = false,
  prominence = 'default',
  className,
}: TextProps) => {
  const [isTruncated, setIsTruncated] = useState(false)

  const determineTruncated = useCallback(
    (target = {}) => {
      // If the text is really truncated
      const { offsetWidth, scrollWidth } = target as {
        offsetWidth: number
        scrollWidth: number
      }

      setIsTruncated(offsetWidth < scrollWidth)
    },
    [setIsTruncated],
  )

  const finalStringChildren = recursivelyGetChildrenString(children)

  return (
    <Tooltip text={oneLine && isTruncated ? finalStringChildren : ''}>
      <StyledText
        onMouseEnter={event => determineTruncated(event.target)}
        onFocus={event => determineTruncated(event.target)}
        as={as}
        prominence={prominence}
        color={color}
        variant={variant}
        oneLine={oneLine}
        className={className}
      >
        {children}
      </StyledText>
    </Tooltip>
  )
}

export default Text
