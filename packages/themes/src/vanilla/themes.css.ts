import { createThemeContract } from '@vanilla-extract/css'
import { consoleLightTheme } from '../themes'

// Theme contract that will defines all CSS variables used in the application.
export const theme = createThemeContract(consoleLightTheme)
