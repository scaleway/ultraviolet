import { createTheme, createThemeContract } from '@vanilla-extract/css'
import { consoleDarkTheme, consoleLightTheme } from '@ultraviolet/themes'

export const theme = createThemeContract(consoleLightTheme)

export const ligthTheme = createTheme(theme, consoleLightTheme)
export const darkTheme = createTheme(theme, consoleDarkTheme)
