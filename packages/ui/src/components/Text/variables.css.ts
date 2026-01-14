import { createThemeContract } from '@vanilla-extract/css'
import type { CSSProperties } from 'react'

type Keys = Pick<CSSProperties, 'textAlign' | 'whiteSpace'>
type TextVarTheme = Record<keyof Keys, null | string>

export const textVars = createThemeContract<TextVarTheme>({
  textAlign: null,
  whiteSpace: null,
})
