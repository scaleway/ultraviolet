import { DEFAULT_THEME_CLASSES, DEFAULT_THEME_STORAGE_KEY, DETAULT_INITIAL_THEME, THEME_OPTIONS } from './constants'
import type { ThemeOption } from './types'

type GetThemeInitScriptOptions = {
  /**
   * Theme used when nothing is persisted in the local storage.
   * @default "system"
   */
  initialTheme?: ThemeOption
  /**
   * Key used to read the theme persisted by the `ThemeProvider`.
   * @default "uv-theme"
   */
  storageKey?: string
}

/**
 * Serializes a value into a JS string literal safe to embed in an inline
 * `<script>`: `JSON.stringify` escapes quotes and backslashes, the extra
 * replacements handle what it does not — `<` (so a value cannot close the
 * script element) and the U+2028/U+2029 line separators.
 */
const serializeScriptValue = (value: string) =>
  JSON.stringify(value)
    .replaceAll('<', String.raw`\u003c`)
    .replaceAll('\u2028', String.raw`\u2028`)
    .replaceAll('\u2029', String.raw`\u2029`)

/**
 * Returns a self-contained, minified script to inline in the `<head>` of the
 * document, before any stylesheet, so the theme class is applied before the
 * first paint. Every value is inlined so the returned string has no
 * dependency on the module scope once evaluated in the page.
 */
export const getThemeInitScript = ({
  initialTheme = DETAULT_INITIAL_THEME,
  storageKey = DEFAULT_THEME_STORAGE_KEY,
}: GetThemeInitScriptOptions = {}) =>
  `try{var t=${serializeScriptValue(initialTheme)},o=${JSON.stringify(
    THEME_OPTIONS,
  )},c=${JSON.stringify(DEFAULT_THEME_CLASSES)},s=localStorage.getItem(${serializeScriptValue(
    storageKey,
  )});if(s){try{var n=JSON.parse(s);-1!==o.indexOf(n)&&(t=n)}catch{}}"system"===t&&(t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var a=c[t];a&&document.documentElement.classList.add(a)}catch{}`
