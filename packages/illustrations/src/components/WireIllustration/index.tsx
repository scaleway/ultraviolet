'use client'

import type { consoleLightTheme as theme } from '@ultraviolet/themes'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties } from 'react'
import { ILLUSTRATIONS } from './__generated__/Illustrations'
import { heightVar, illustrationVariants, url, widthVar } from './styles.css'

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
  style?: CSSProperties
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
  style,
}: IllustrationWireProp) => (
  <svg
    className={cn(className, illustrationVariants[sentiment])}
    data-testid={dataTestId}
    style={{
      ...assignInlineVars({
        [url]: `url(${ILLUSTRATIONS[name]}) center center / contain no-repeat`,
        [widthVar]: typeof width === 'number' ? `${width.toString()}px` : width,
        [heightVar]:
          typeof height === 'number' ? `${height.toString()}px` : height,
      }),
      ...style,
    }}
  />
)
