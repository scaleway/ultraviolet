import { addons } from 'storybook/manager-api'
import { consoleLightTheme } from '@ultraviolet/themes'
import { light } from './storybookThemes'

addons.setConfig({
  theme: light,
  tagBadges: [
    {
      tags: 'experimental',
      badge: {
        text: '🧪 Experimental',
        bgColor: consoleLightTheme.colors.warning.background,
        fgColor: consoleLightTheme.colors.warning.text,
        tooltip:
          'This component is at an unstable stage and is subject to change in future releases.',
      },
    },
    {
      tags: 'deprecated',
      badge: {
        text: '⛔ Deprecated',
        bgColor: consoleLightTheme.colors.danger.background,
        fgColor: consoleLightTheme.colors.danger.text,
        tooltip: 'This component is deprecated please do not use it any more.',
      },
    },
  ],
})
