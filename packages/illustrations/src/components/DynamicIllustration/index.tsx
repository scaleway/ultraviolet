'use client'

import { useTheme } from '@ultraviolet/themes'
import type { CSSProperties } from 'react'
import type { IllustrationsKeys } from './__generated__/Illustrations'
import { ILLUSTRATIONS } from './__generated__/Illustrations'

type DynamicIllustrationProps = {
  /**
   * Name of the illustration (only illustrations that do have a light and a dark version)
   */
  name: keyof IllustrationsKeys
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
  style?: CSSProperties
}
/**
 * DynamicIllustration is a component made to automate the render of illustrations to adapt them to the current theme (light/dark/darker).
 */
export const DynamicIllustration = ({
  name,
  width,
  height,
  'data-testid': dataTestId,
  className,
  style,
}: DynamicIllustrationProps) => {
  const { theme } = useTheme()

  return (
    <img
      alt={name}
      className={className}
      data-testid={dataTestId}
      height={height}
      src={ILLUSTRATIONS[theme === 'light' ? 'light' : 'dark'][name]}
      style={style}
      width={width}
    />
  )
}
