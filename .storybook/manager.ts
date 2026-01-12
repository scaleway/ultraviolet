import { consoleLightTheme } from '@ultraviolet/themes'
import { addons } from 'storybook/manager-api'
import { light } from './storybookThemes'

addons.setConfig({
  tagBadges: [
    {
      badge: {
        bgColor: consoleLightTheme.colors.warning.background,
        fgColor: consoleLightTheme.colors.warning.text,
        text: '🧪 Experimental',
        tooltip:
          'This component is at an unstable stage and is subject to change in future releases.',
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
  theme: light,
})
