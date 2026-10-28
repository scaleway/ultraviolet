import type { UltravioletUITheme } from '../constants'
import type { Theme } from './types'
import { useTheme } from './useTheme'
import { darkTheme } from '../themes/console/dark/__generated__/index'
import { darkerTheme } from '../themes/console/darker/__generated__/index'
import { lightTheme } from '../themes/console/light/__generated__/index'

const THEMES_MAP: Record<Theme, UltravioletUITheme> = {
  dark: darkTheme,
  darker: darkerTheme,
  light: lightTheme,
}

export const useThemeObject = (): UltravioletUITheme | undefined => {
  const { theme } = useTheme()

  return theme  ? THEMES_MAP[theme] : undefined
}
