import { useCallback } from 'react'
import I18n from '@scaleway/use-i18n'
import { Story } from '@storybook/react'
import { css, ThemeProvider, Global, Theme } from '@emotion/react'
import normalize from '../src/utils/normalize'
import { useDarkMode } from 'storybook-dark-mode'
import { themes } from '@storybook/theming'
import seedrandom from 'seedrandom'
import { light, dark } from './storybookThemes'
import lightTheme, { darkTheme } from '../src/theme'
import DocsContainer from './components/DocsContainer'
import Page from './components/Page'
import isChromatic from 'chromatic/isChromatic'

if (isChromatic()) seedrandom('manual-seed', { global: true })

const STORY_SORT = {
  order: [
    'Get started',
    'Components state',
    'Testing',
    'Changelog',
    'Guidelines',
    'Customization',
    ['Dark mode', 'Colors', 'Typography', 'Shadows', 'Spaces and Radii'],
    'Responsive',
    'Components',
  ],
}

const darkMode = {
  dark: { ...themes.dark, ...dark },
  light: { ...themes.normal, ...light },
}

const ENV_PARAMETERS = {
  development: {
    darkMode,
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: false },
    },
    viewport: {
      viewports: {},
    },
    options: {
      storySort: STORY_SORT,
    },
    docs: {
      container: DocsContainer,
      page: Page,
      source: { excludeDecorators: true }, // Exclude decorators from source code
    },
  },
  production: {
    darkMode,
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    viewMode: 'docs',
    previewTabs: { canvas: { hidden: true } },
    options: {
      storySort: STORY_SORT,
    },
    docs: {
      container: DocsContainer,
      page: Page,
      source: { excludeDecorators: true }, // Exclude decorators from source code
    },
  },
  visual: {},
  layout: 'centered',
}
ENV_PARAMETERS.visual = ENV_PARAMETERS.production

export const parameters =
  ENV_PARAMETERS[
    process.env?.['STORYBOOK_ENVIRONMENT'] as keyof typeof ENV_PARAMETERS
  ] || ENV_PARAMETERS.production

const adjustedTheme = (ancestorTheme: Theme, theme: Theme) => ({
  ...ancestorTheme,
  ...Object.keys(theme).reduce(
    (acc, themeItem) => ({
      ...acc,
      [themeItem]: {
        ...((acc[themeItem as keyof typeof theme] as Record<string, unknown>) ??
          {}),
        ...(theme[themeItem as keyof typeof theme] as Record<string, unknown>),
      },
    }),
    ancestorTheme,
  ),
})

export const globalStyles = (mode: 'light' | 'dark') => (theme: Theme) =>
  css`
    ${normalize()}

    body {
      color: ${theme.colors.neutral.text};
    }

    :root {
      color-scheme: ${mode};
    }
  `

export const decorators = [
  (StoryComponent: Story) => {
    const mode = useDarkMode() ? 'dark' : 'light'

    const generatedTheme = useCallback(
      (ancestorTheme: Theme) =>
        adjustedTheme(ancestorTheme, mode === 'light' ? lightTheme : darkTheme),
      [mode, adjustedTheme, lightTheme, darkTheme],
    )

    return (
      <I18n
        defaultLoad={async ({ locale }) => import(`./locales/${locale}.json`)}
        defaultLocale="en"
        defaultTranslations={{}}
        enableDebugKey={false}
        enableDefaultLocale={false}
        loadDateLocale={async locale =>
          import(`date-fns/locale/${locale}/index`)
        }
        localeItemStorage="localeI18n"
        supportedLocales={['en', 'fr', 'es']}
      >
        <ThemeProvider theme={generatedTheme}>
          <Global styles={[globalStyles(mode)]} />
          <StoryComponent />
        </ThemeProvider>
      </I18n>
    )
  },
]
