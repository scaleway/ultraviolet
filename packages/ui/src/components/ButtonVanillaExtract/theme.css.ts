import { consoleDarkTheme, consoleLightTheme } from '@ultraviolet/themes'
import { createTheme, createThemeContract } from '@vanilla-extract/css'

export const theme = createThemeContract(consoleLightTheme)

export const lightTheme = createTheme(theme, consoleLightTheme)
export const darkTheme = createTheme(theme, consoleDarkTheme)
