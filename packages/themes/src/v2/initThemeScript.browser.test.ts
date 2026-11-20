import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_THEME_STORAGE_KEY } from './constants'
import { getThemeInitScript } from './initThemeScript'

// allow us to execute the string template script
// oxlint-disable-next-line eslint/no-new-func, typescript/no-implied-eval
const runInitScript = (script: string) => new Function(script)()

// `matchMedia` exists in real browsers: spying on it is enough to control the
// system color scheme.
const mockPrefersDarkMode = (prefersDarkMode: boolean) =>
  vi.spyOn(globalThis, 'matchMedia').mockReturnValue({ matches: prefersDarkMode } as MediaQueryList)

const storeTheme = (storageKey: string, theme: string) => window.localStorage.setItem(storageKey, theme)

describe(getThemeInitScript, () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.className = ''
  })

  describe('theme resolution', () => {
    it('applies the dark class when nothing is stored and the system prefers dark', () => {
      mockPrefersDarkMode(true)

      runInitScript(getThemeInitScript())

      expect(document.documentElement).toHaveClass('dark-theme')
    })

    it('applies the light class when nothing is stored and the system prefers light', () => {
      mockPrefersDarkMode(false)

      runInitScript(getThemeInitScript())

      expect(document.documentElement).toHaveClass('light-theme')
    })

    it('applies the stored dark theme', () => {
      mockPrefersDarkMode(false)
      storeTheme(DEFAULT_THEME_STORAGE_KEY, JSON.stringify('dark'))

      runInitScript(getThemeInitScript())

      expect(document.documentElement).toHaveClass('dark-theme')
    })

    it('applies the stored darker theme', () => {
      mockPrefersDarkMode(false)
      storeTheme(DEFAULT_THEME_STORAGE_KEY, JSON.stringify('darker'))

      runInitScript(getThemeInitScript())

      expect(document.documentElement).toHaveClass('darker-theme')
    })

    it('resolves the stored system theme through the prefers-color-scheme media query', () => {
      mockPrefersDarkMode(true)
      storeTheme(DEFAULT_THEME_STORAGE_KEY, JSON.stringify('system'))

      runInitScript(getThemeInitScript())

      expect(document.documentElement).toHaveClass('dark-theme')
    })

    it('falls back to the initial theme when the stored value is not valid JSON', () => {
      mockPrefersDarkMode(true)
      storeTheme(DEFAULT_THEME_STORAGE_KEY, 'not-json')

      runInitScript(getThemeInitScript())

      expect(document.documentElement).toHaveClass('dark-theme')
    })

    it('falls back to the initial theme when the stored value is not a theme option', () => {
      mockPrefersDarkMode(true)
      storeTheme(DEFAULT_THEME_STORAGE_KEY, JSON.stringify('purple'))

      runInitScript(getThemeInitScript())

      expect(document.documentElement).toHaveClass('dark-theme')
    })

    it('applies the initial theme as-is when it is not "system"', () => {
      mockPrefersDarkMode(true)

      runInitScript(getThemeInitScript({ initialTheme: 'darker' }))

      expect(document.documentElement).toHaveClass('darker-theme')
    })

    it('reads the theme under the configured storage key', () => {
      mockPrefersDarkMode(false)
      storeTheme('app-theme', JSON.stringify('dark'))

      runInitScript(getThemeInitScript({ storageKey: 'app-theme' }))

      expect(document.documentElement).toHaveClass('dark-theme')
    })
  })

  describe('serialization', () => {
    it('minifies the script on a single line', () => {
      expect(getThemeInitScript()).not.toContain('\n')
    })

    it('escapes the storage key so it cannot close the script element', () => {
      const script = getThemeInitScript({
        storageKey: '</script><script>globalThis.uvScriptInjection = true</script>',
      })

      expect(script).not.toContain('</script>')
    })

    it('serializes the storage key so it cannot break out of the string literal', () => {
      const script = getThemeInitScript({
        storageKey: `';globalThis.uvScriptInjection = true;//`,
      })

      runInitScript(script)

      expect('uvScriptInjection' in globalThis).toBe(false)
    })

    it('round-trips a storage key containing special characters', () => {
      const storageKey = `a<b'c\u2028d`
      storeTheme(storageKey, JSON.stringify('darker'))

      runInitScript(getThemeInitScript({ storageKey }))

      expect(document.documentElement).toHaveClass('darker-theme')
    })
  })
})
