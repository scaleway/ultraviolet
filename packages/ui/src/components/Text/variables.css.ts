import { createThemeContract } from '@vanilla-extract/css'
import type { CSSProperties } from 'react'



export const textVars = createThemeContract<{
  textAlign:NonNullable< CSSProperties['textAlign']> | null,
  whiteSpace: NonNullable<CSSProperties['whiteSpace']> | null,
}>({
    textAlign: null,
    whiteSpace: null,
});
