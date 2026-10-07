'use client'

import { useTheme, useThemeV2 } from '@ultraviolet/themes'
import type { CSSProperties } from 'react'
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
  const { theme, defined } = useTheme()
  const { theme: themeV2, defined: definedV2 } = useThemeV2()

  const fallBackTheme = defined ? theme : 'light'
  const computedTheme = definedV2 ? themeV2 : fallBackTheme

  return (
    <img
      alt=""
      className={className}
      data-testid={dataTestId}
      height={height}
      src={ILLUSTRATIONS[computedTheme === 'light' ? 'light' : 'dark'][name]}
      style={style}
      width={width}
    />
  )
}

DynamicIllustration.displayName = 'DynamicIllustration'
