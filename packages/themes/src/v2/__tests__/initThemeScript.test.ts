import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_THEME_STORAGE_KEY } from '../constants'
import { getThemeInitScript } from '../initThemeScript'

// Executes the generated script the way a browser would: as a classic inline
// <script> element, synchronously when it is appended to <head>.
const runScript = (script: string) => {
  const scriptElement = document.createElement('script')
  scriptElement.textContent = script
  document.head.appendChild(scriptElement)
  scriptElement.remove()
}

// jsdom does not implement matchMedia, and the inline script executes in the
// jsdom realm: stub it on the window the script runs against, reachable from
// the test through `document.defaultView`.
const stubPrefersDarkMode = (prefersDark: boolean) => {
  const { defaultView: scriptWindow } = document

  if (scriptWindow !== null) {
    scriptWindow.matchMedia = () => ({ matches: prefersDark }) as MediaQueryList
  }
}

const storeTheme = (storageKey: string, theme: unknown) => {
  localStorage.setItem(storageKey, JSON.stringify(theme))
}

describe(getThemeInitScript, () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })
  it.each`
    storedTheme | expectedClass
    ${'light'}  | ${'light-theme'}
    ${'dark'}   | ${'dark-theme'}
    ${'darker'} | ${'darker-theme'}
  `('applies the "$expectedClass" class when "$storedTheme" is stored', ({ storedTheme, expectedClass }) => {
    storeTheme(DEFAULT_THEME_STORAGE_KEY, storedTheme)

    runScript(getThemeInitScript())

    expect(document.documentElement.className).toBe(expectedClass)
  })

  it.each`
    prefersDark | expectedClass
    ${true}     | ${'dark-theme'}
    ${false}    | ${'light-theme'}
  `('resolves "system" to "$expectedClass" through prefers-color-scheme', ({ prefersDark, expectedClass }) => {
    storeTheme(DEFAULT_THEME_STORAGE_KEY, 'system')
    stubPrefersDarkMode(prefersDark)

    runScript(getThemeInitScript())

    expect(document.documentElement.className).toBe(expectedClass)
  })

  it.each`
    prefersDark | expectedClass
    ${true}     | ${'dark-theme'}
    ${false}    | ${'light-theme'}
  `(
    'resolves "system" to "$expectedClass" on first visit, when nothing is stored yet',
    ({ prefersDark, expectedClass }) => {
      stubPrefersDarkMode(prefersDark)

      runScript(getThemeInitScript())

      expect(document.documentElement.className).toBe(expectedClass)
    },
  )

  it.each`
    initialTheme | expectedClass
    ${'light'}   | ${'light-theme'}
    ${'dark'}    | ${'dark-theme'}
    ${'darker'}  | ${'darker-theme'}
  `('applies "$initialTheme" when nothing is stored', ({ initialTheme, expectedClass }) => {
    runScript(getThemeInitScript({ initialTheme }))

    expect(document.documentElement.className).toBe(expectedClass)
  })

  it('reads the theme under the storageKey option, not the default key', () => {
    storeTheme(DEFAULT_THEME_STORAGE_KEY, 'light')
    storeTheme('vite-theme-preference', 'darker')

    runScript(getThemeInitScript({ storageKey: 'vite-theme-preference' }))

    expect(document.documentElement.className).toBe('darker-theme')
  })

  it('falls back to initialTheme when the stored value is corrupted', () => {
    localStorage.setItem(DEFAULT_THEME_STORAGE_KEY, '{invalid')

    runScript(getThemeInitScript({ initialTheme: 'dark' }))

    expect(document.documentElement.className).toBe('dark-theme')
  })

  it.each`
    stored
    ${42}
    ${null}
    ${''}
  `('falls back to initialTheme when the stored value is $stored', ({ stored }) => {
    storeTheme(DEFAULT_THEME_STORAGE_KEY, stored)
    stubPrefersDarkMode(true)

    runScript(getThemeInitScript({ initialTheme: 'system' }))

    expect(document.documentElement.className).toBe('dark-theme')
  })

  it.each`
    stored
    ${'blue'}
    ${'toString'}
  `('applies no class when the stored theme "$stored" is unknown', ({ stored }) => {
    storeTheme(DEFAULT_THEME_STORAGE_KEY, stored)

    runScript(getThemeInitScript())

    expect(document.documentElement.className).toBe('')
  })

  it('throws when a storageKey would break the inline <script> tag', () => {
    expect(() => getThemeInitScript({ storageKey: '</script>' })).toThrow('the generated script must not contain')
  })
})
