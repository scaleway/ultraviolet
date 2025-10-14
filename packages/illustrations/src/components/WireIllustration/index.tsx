'use client'

import type { consoleLightTheme as theme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
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
}: IllustrationWireProp) => (
  <svg
    className={`${illustrationVariants[sentiment]}${className ? ` ${className}` : ''}`}
    data-testid={dataTestId}
    style={assignInlineVars({
      [url]: `url(${ILLUSTRATIONS[name]}) center center / contain no-repeat`,
      [widthVar]: typeof width === 'number' ? `${width.toString()}px` : width,
      [heightVar]:
        typeof height === 'number' ? `${height.toString()}px` : height,
    })}
  />
)
