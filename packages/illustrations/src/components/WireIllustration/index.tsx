'use client'

import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import type { consoleLightTheme as theme } from '@ultraviolet/themes'
import { ILLUSTRATIONS } from './__generated__/Illustrations'

const StyledIllustration = styled('svg', {
  shouldForwardProp: prop =>
    !['height', 'width', 'sentiment', 'url', 'theme'].includes(prop),
})<{
  height?: string | number
  width?: string | number
  sentiment: Color
  url?: string
}>`
  background-color: ${({ theme, sentiment }) => theme.colors[sentiment].icon};
  -webkit-mask: url("${({ url }) => url}") no-repeat center;
  mask: url("${({ url }) => url}") no-repeat center;
  mask-size: contain;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};

`
type Color = Extract<
  keyof typeof theme.colors,
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
>

export type IllustrationWireProp = {
  /**
   * Width of the illustration
   */
  width?: string | number
  /**
   * Height of the illustration
   */
  height?: string | number
  'data-testid'?: string
  className?: string
  sentiment?: Color
  name: keyof typeof ILLUSTRATIONS
}

/**
 * DynamicIllustration is a component made to automate the render of illustrations to adapt them to the current theme (light/dark/darker).
 */
export const WireIllustration = ({
  width = 100,
  height = 100,
  'data-testid': dataTestId,
  className,
  sentiment = 'neutral',
  name,
}: IllustrationWireProp) => {
  const theme = useTheme()

  return (
    <StyledIllustration
      data-testid={dataTestId}
      className={className}
      width={width}
      height={height}
      theme={theme}
      sentiment={sentiment}
      url={ILLUSTRATIONS[name]}
    />
  )
}
