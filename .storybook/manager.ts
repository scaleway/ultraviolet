import { consoleLightTheme } from '@ultraviolet/themes'
import React, { useEffect } from 'react'
import { addons, types, useStorybookApi, useStorybookState } from 'storybook/manager-api'
import * as SB_THEMES from './storybookThemes'

const ThemeSync = () => {
  const api = useStorybookApi()
  const state = useStorybookState()
  const themeName = (state.globals?.['theme'] ?? 'light') as keyof typeof SB_THEMES

  useEffect(() => {
    api.setOptions({ theme: SB_THEMES[themeName] })
  }, [api, themeName])

  return null
}

addons.setConfig({
  tagBadges: [
    {
      badge: {
        bgColor: consoleLightTheme.colors.warning.background,
        fgColor: consoleLightTheme.colors.warning.text,
        text: '🧪 Experimental',
        tooltip: 'This component is at an unstable stage and is subject to change in future releases.',
      },
      tags: 'experimental',
    },
    {
      badge: {
        bgColor: consoleLightTheme.colors.danger.background,
        fgColor: consoleLightTheme.colors.danger.text,
        text: '⛔ Deprecated',
        tooltip: 'This component is deprecated please do not use it any more.',
      },
      tags: 'deprecated',
    },
  ],
  theme: SB_THEMES.light,
})

addons.register('uv/theme-sync', () => {
  addons.add('uv-theme-sync', {
    type: types.TOOL,
    title: '',
    render: () => React.createElement(ThemeSync),
  })
})
