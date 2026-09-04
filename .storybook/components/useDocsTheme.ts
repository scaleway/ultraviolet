import { useEffect, useState } from 'react'
import { GLOBALS_UPDATED } from 'storybook/internal/core-events'
import { addons } from 'storybook/manager-api'

type ThemeName = 'light' | 'dark' | 'darker'

export const useDocsTheme = () => {
  const channel = addons.getChannel()
  const [themeName, setThemeName] = useState(() => {
    const last = channel.last(GLOBALS_UPDATED)?.[0] as { globals?: { theme?: string } } | undefined
    return (last?.globals?.theme || 'light') as ThemeName
  })

  useEffect(() => {
    const handler = (...args: unknown[]) => {
      const payload = args[0] as { globals?: { theme?: string } } | undefined
      setThemeName((payload?.globals?.theme || 'light') as ThemeName)
    }

    channel.on(GLOBALS_UPDATED, handler)
    return () => channel.off(GLOBALS_UPDATED, handler)
  }, [channel])

  useEffect(() => {
    document.documentElement.style.colorScheme = themeName === 'light' ? 'light' : 'dark'
  }, [themeName])

  return themeName
}
