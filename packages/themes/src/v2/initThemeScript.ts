import { DEFAULT_THEME_CLASSES, DEFAULT_THEME_STORAGE_KEY } from './constants'
import type { GetThemeInitScriptOptions } from './types'

/**
 * Returns an inline script that applies the theme class on the document element
 * before the first paint, to avoid a flash of the wrong theme (FOUC).
 *
 * The script mirrors the `ThemeProvider` logic: it reads the theme persisted in
 * `localStorage` under `storageKey` (falling back to `initialTheme`), resolves
 * the `"system"` option through the `prefers-color-scheme` media query and adds
 * the matching class on the document element. Class names and storage key are
 * derived from the same constants as the provider, so the script and the
 * provider can never drift apart.
 *
 * Inline it in the `<head>` of the document so it runs before the first paint:
 *
 * ```tsx
 * <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
 * ```
 */
export const getThemeInitScript = ({
  initialTheme = 'system',
  storageKey = DEFAULT_THEME_STORAGE_KEY,
}: GetThemeInitScriptOptions = {}) => {

  try {
      const item = localStorage.getItem(storageKey) ?? initialTheme

      const parsed: unknown = JSON.parse(item)
      const theme = typeof parsed === 'string' && parsed ? parsed : initialTheme

      if (theme === 'system') {
        const isDark = matchMedia('(prefers-color-scheme: dark)').matches

        document.documentElement.classList.add(`${isDark ? 'dark' : 'light'}-theme`)
        return
      }

      if (theme === 'light' || theme === 'dark' || theme === 'darker') {
        document.documentElement.classList.add(`${theme}-theme`)
      }
    } catch {
      // Corrupted storage entry or unavailable matchMedia: fail silently, the
      // ThemeProvider re-applies the theme once the app is mounted.
    }
}
