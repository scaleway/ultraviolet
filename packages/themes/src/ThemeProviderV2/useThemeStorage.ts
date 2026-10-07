import { useEffect, useMemo } from 'react'
import { DEFAULT_THEME_STORAGE_KEY, DEFAULT_THEME_VALUES } from './constants'
import type { LocalStorageConfig, ThemesExtended } from './types'

const THEMES: ThemesExtended[] = ['light', 'dark', 'darker', 'system']

type UseThemeStorageProps = {
  /**
   * Whether the storage is enabled. When `false` nothing is stored and listened to
   */
  enabled: boolean
  localStorageConfig?: LocalStorageConfig
  chosenTheme: ThemesExtended
  onThemeChange: (theme: ThemesExtended) => void
}

const getLocalStorage = (): Storage | undefined => {
  try {
    return globalThis.localStorage
  } catch {
    return undefined
  }
}

/**
 * Stores the chosen theme in the local storage and listens to the `storage` event.
 */
export const useThemeStorage = ({ enabled, localStorageConfig, chosenTheme, onThemeChange }: UseThemeStorageProps) => {
  const storageValues = useMemo<Record<ThemesExtended, string>>(
    () => ({
      light: localStorageConfig?.values?.light ?? DEFAULT_THEME_VALUES.light,
      dark: localStorageConfig?.values?.dark ?? DEFAULT_THEME_VALUES.dark,
      darker: localStorageConfig?.values?.darker ?? DEFAULT_THEME_VALUES.darker,
      system: localStorageConfig?.values?.system ?? DEFAULT_THEME_VALUES.system,
    }),
    [
      localStorageConfig?.values?.light,
      localStorageConfig?.values?.dark,
      localStorageConfig?.values?.darker,
      localStorageConfig?.values?.system,
    ],
  )

  const storageKey = localStorageConfig?.key ?? DEFAULT_THEME_STORAGE_KEY

  // Update local storage when `chosenTheme` changes
  useEffect(() => {
    if (!enabled) {
      return
    }
    const storage = getLocalStorage()
    if (!storage) {
      return
    }

    storage.setItem(storageKey, storageValues[chosenTheme])
  }, [enabled, storageKey, storageValues, chosenTheme])

  // Updates theme to match storage
  useEffect(() => {
    if (!enabled) {
      return
    }
    const storage = getLocalStorage()
    if (!storage) {
      return
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) {
        return
      }

      const theme = THEMES.find(key => storageValues[key] === event.newValue)
      if (theme) {
        onThemeChange(theme)
      }
    }

    globalThis.addEventListener('storage', handleStorage)

    return () => globalThis.removeEventListener('storage', handleStorage)
  }, [enabled, storageKey, storageValues, onThemeChange])
}
