import { DEFAULT_THEME_CLASSES, DEFAULT_THEME_STORAGE_KEY } from './constants'
import type { GetThemeInitScriptOptions } from './types'

/**
 * Returns an inline script that applies the theme class on the document element
 * before the first paint, to avoid a flash of the wrong theme (FOUC).
 *
 * The script mirrors the `ThemeProvider` logic: it reads the theme persisted in
 * `localStorage` under `storageKey` (falling back to `initialTheme`, like the
 * provider does when the stored value is corrupted), resolves the `"system"`
 * option through the `prefers-color-scheme` media query and adds the matching
 * class on the document element (the `typeof` check ignores unknown themes and
 * inherited properties, e.g. a stored `"toString"`). Storage key and class names
 * are derived from the same constants as the provider, so the script and the
 * provider can never drift apart.
 *
 * The returned string must be inlined in the `<head>` of the document, before
 * any stylesheet, so it runs before the first paint:
 *
 * ```tsx
 * <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
 * ```
 */
export const getThemeInitScript = ({
  initialTheme = 'system',
  storageKey = DEFAULT_THEME_STORAGE_KEY,
}: GetThemeInitScriptOptions = {}) => {
  const script = `try {
  var theme = ${JSON.stringify(initialTheme)}
  var stored = localStorage.getItem(${JSON.stringify(storageKey)})
  if (stored !== null) {
    try {
      var parsed = JSON.parse(stored)
      if (typeof parsed === 'string' && parsed !== '') {
        theme = parsed
      }
    } catch (e) {}
  }
  if (theme === 'system') {
    theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  var themeClass = ${JSON.stringify(DEFAULT_THEME_CLASSES)}[theme]
  if (typeof themeClass === 'string') {
    document.documentElement.classList.add(themeClass)
  }
} catch (e) {}`

  // The script is inlined inside a <script> tag in the HTML: a `</script>`
  // sequence would close the tag early and break the page. `storageKey` is the
  // only interpolated input, so fail loudly here instead of shipping broken HTML.
  if (script.includes('</script>')) {
    throw new Error('getThemeInitScript: the generated script must not contain a `</script>` sequence.')
  }

  return script
}
