import { createThemeContract } from '@vanilla-extract/css'
import { consoleLightTheme } from '../themes'

type Theme = ReturnType<typeof createThemeContract<typeof consoleLightTheme>>
// Theme contract that will defines all CSS variables used in the application.
export const theme: Theme = createThemeContract(consoleLightTheme)
