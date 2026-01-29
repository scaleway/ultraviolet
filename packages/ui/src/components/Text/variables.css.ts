import { createThemeContract } from '@vanilla-extract/css'
import type { CSSProperties } from 'react'

type Keys = Pick<CSSProperties, 'textAlign' | 'whiteSpace'>
type TextVarTheme = Record<keyof Keys, string>

export const textVars = createThemeContract<TextVarTheme>({
  textAlign: 'start',
  whiteSpace: 'normal',
})
