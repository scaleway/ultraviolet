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
import AsapBoldWoff2 from './assets/fonts/asap/Asap-Bold.woff2'
import AsapMediumWoff2 from './assets/fonts/asap/Asap-Medium.woff2'
import AsapRegularWoff2 from './assets/fonts/asap/Asap-Regular.woff2'
import JetBrains from './assets/fonts/jetbrains/JetBrainsMono-Regular.woff2'
import isChromatic from 'chromatic/isChromatic'

if (isChromatic()) seedrandom('manual-seed', { global: true })

const STORY_SORT = {
  order: [
    'Home',
    'Testing',
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
    actions: { disable: true, argTypesRegex: '^on[A-Z].*' },
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
    actions: { argTypesRegex: '^on[A-Z].*' },
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
    process.env.STORYBOOK_ENVIRONMENT as keyof typeof ENV_PARAMETERS
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

const fonts = css`
  @font-face {
    font-family: 'Asap';
    font-style: normal;
    src: url(${AsapRegularWoff2}) format('woff2');
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Asap';
    font-style: normal;
    src: url(${AsapMediumWoff2}) format('woff2');
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Asap';
    font-style: normal;
    src: url(${AsapBoldWoff2}) format('woff2');
    font-weight: 600;
    font-display: swap;
  }
  @font-face {
    font-family: 'JetBrains';
    font-style: normal;
    src: url(${JetBrains}) format('woff2');
    font-weight: 400;
    font-display: swap;
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
          <Global styles={[globalStyles(mode), fonts]} />
          <StoryComponent />
        </ThemeProvider>
      </I18n>
    )
  },
]
