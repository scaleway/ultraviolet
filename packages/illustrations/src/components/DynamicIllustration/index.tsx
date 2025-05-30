'use client'

import { useTheme } from '@emotion/react'
import { ILLUSTRATIONS } from './__generated__/Illustrations'
import type { IllustrationsKeys } from './__generated__/Illustrations'

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
}: DynamicIllustrationProps) => {
  const { theme } = useTheme()

  return (
    <img
      className={className}
      data-testid={dataTestId}
      src={ILLUSTRATIONS[theme === 'light' ? 'light' : 'dark'][name]}
      alt={name}
      width={width}
      height={height}
    />
  )
}
