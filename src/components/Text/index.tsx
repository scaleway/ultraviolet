import { Theme } from '@emotion/react'
import styled from '@emotion/styled'
import { ElementType, ReactNode, useEffect, useRef, useState } from 'react'
import recursivelyGetChildrenString from '../../helpers/recursivelyGetChildrenString'
import { Color, typography } from '../../theme'
import capitalize from '../../utils/capitalize'
import Tooltip from '../Tooltip'

export const PROMINENCES = {
  default: '',
  strong: 'strong',
  stronger: 'stronger',
  weak: 'weak',
}

type ProminenceProps = keyof typeof PROMINENCES
export type TextVariant = keyof typeof typography
export const textVariants = Object.keys(typography) as TextVariant[]

/**
 * Generate all styles available for text based on prominence and variants
 */
const generateStyles = ({
  prominence,
  color,
  variant,
  theme,
  oneLine,
  disabled,
  italic,
  underline,
}: {
  prominence: ProminenceProps
  theme: Theme
  variant: TextVariant
  color: Color
  oneLine: boolean
  disabled: boolean
  italic: boolean
  underline: boolean
}): string => {
  // stronger is available only for neutral color
  const definedProminence =
    color !== 'neutral' && prominence === 'stronger'
      ? capitalize(PROMINENCES.default)
      : capitalize(PROMINENCES[prominence])

  const themeColor = theme.colors[color]
  const text = `text${definedProminence}${
    disabled ? 'Disabled' : ''
  }` as keyof typeof themeColor

  return `
    color: ${theme.colors[color][text]};

    font-size: ${theme.typography[variant].fontSize};
    font-family: ${theme.typography[variant].fontFamily};
    font-weight: ${theme.typography[variant].weight};
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
    ${italic ? `font-style: italic;` : ''}
    ${underline ? `text-decoration: underline;` : ''}
  `
}

type TextProps = {
  className?: string
  children: ReactNode
  variant: TextVariant
  color?: Color
  prominence?: ProminenceProps
  as: ElementType
  oneLine?: boolean
  disabled?: boolean
  italic?: boolean
  underline?: boolean
}

const StyledText = styled('div', {
  shouldForwardProp: prop =>
    ![
      'as',
      'variant',
      'color',
      'prominence',
      'oneLine',
      'disabled',
      'italic',
      'underline',
    ].includes(prop),
})<{
  color: Color
  prominence: ProminenceProps
  variant: TextVariant
  oneLine: boolean
  disabled: boolean
  italic: boolean
  underline: boolean
}>(generateStyles)

const Text = ({
  variant,
  children,
  as,
  color = 'neutral',
  oneLine = false,
  prominence = 'default',
  className,
  disabled = false,
  italic = false,
  underline = false,
}: TextProps) => {
  const [isTruncated, setIsTruncated] = useState(false)
  const elementRef = useRef(null)

  const finalStringChildren = recursivelyGetChildrenString(children)

  useEffect(() => {
    if (oneLine && elementRef && elementRef.current) {
      const { offsetWidth, scrollWidth } = elementRef.current
      setIsTruncated(offsetWidth <= scrollWidth)
    }
  }, [oneLine])

  return (
    <Tooltip text={oneLine && isTruncated ? finalStringChildren : ''}>
      <StyledText
        ref={elementRef}
        as={as}
        prominence={prominence}
        color={color}
        variant={variant}
        oneLine={oneLine}
        className={className}
        disabled={disabled}
        italic={italic}
        underline={underline}
      >
        {children}
      </StyledText>
    </Tooltip>
  )
}

export default Text
