import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { consoleDarkTheme, consoleLightTheme } from '../../themes'
import { ThemeProvider } from '../ThemeProvider'
import type { ThemeOption } from '../types'
import { useTheme } from '../useTheme'
import { useThemeObject } from '../useThemeObject'

const renderThemeObject = (initialTheme: ThemeOption) => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider initialTheme={initialTheme} storageKey="use-theme-object-test">
      {children}
    </ThemeProvider>
  )

  return renderHook(() => useThemeObject(), { wrapper })
}

describe(useThemeObject, () => {
  beforeEach(() => {
    globalThis.localStorage.clear()
  })

  it('should return the light theme object when the applied theme is light', async () => {
    const { result } = renderThemeObject('light')

    await waitFor(() => {
      expect(result.current).toBe(consoleLightTheme)
    })
  })

  it('should return the dark theme object when the applied theme is dark', async () => {
    const { result } = renderThemeObject('dark')

    await waitFor(() => {
      expect(result.current).toBe(consoleDarkTheme)
    })
  })

  it('should load the new theme object when the theme changes', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider initialTheme="light" storageKey="use-theme-object-test">
        {children}
      </ThemeProvider>
    )

    const { result } = renderHook(
      () => {
        const { setTheme } = useTheme()
        return { setTheme, themeObject: useThemeObject() }
      },
      { wrapper },
    )

    await waitFor(() => {
      expect(result.current.themeObject).toBe(consoleLightTheme)
    })

    act(() => {
      result.current.setTheme('dark')
    })

    await waitFor(() => {
      expect(result.current.themeObject).toBe(consoleDarkTheme)
    })
  })
})
