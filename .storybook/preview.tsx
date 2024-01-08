import I18n from '@scaleway/use-i18n'
import { Preview } from '@storybook/react'
import { css, ThemeProvider, Global } from '@emotion/react'
import { normalize } from '@ultraviolet/ui'
import { useDarkMode } from 'storybook-dark-mode'
import { themes } from '@storybook/theming'
import seedrandom from 'seedrandom'
import { light, dark } from './storybookThemes'
import lightTheme, { darkTheme } from '../packages/ui/src/theme'
import DocsContainer from './components/DocsContainer'
import Page from './components/Page'
import { enGB, fr as frFr, es } from 'date-fns/locale'
import isChromatic from 'chromatic/isChromatic'
import JetBrains from './assets/fonts/jetbrains/JetBrainsMono-Regular.woff2'
import InterSemiBoldWoff2 from './assets/fonts/inter/Inter-SemiBold.woff2'
import InterMediumWoff2 from './assets/fonts/inter/Inter-Medium.woff2'
import InterRegularWoff2 from './assets/fonts/inter/Inter-Regular.woff2'
import SpaceGroteskMediumWoff2 from './assets/fonts/space-grotesk/SpaceGrotesk-Medium.woff2'
import SpaceGroteskRegularWoff2 from './assets/fonts/space-grotesk/SpaceGrotesk-Regular.woff2'

if (isChromatic()) seedrandom('manual-seed', { global: true })

const parameters = {
  darkMode: {
    dark: { ...themes.dark, ...dark },
    light: { ...themes.normal, ...light, default: true },
  },
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
    storySort: {
      order: [
        'Get started',
        'Components state',
        'Testing',
        'Changelog',
        'State',
        ['Components state', 'Properties'],
        'Guidelines',
        'Migrations',
        'Customization',
        ['Understand Tokens'],
        ['Dark mode', 'Colors', 'Typography', 'Shadows', 'Spaces and Radii'],
        'Tools',
        'Components',
        'Icons',
        'Plus',
        'Form',
        ['Introduction', 'Changelog', 'Components'],
      ],
    },
  },
  docs: {
    container: DocsContainer,
    page: Page,
    source: { excludeDecorators: true }, // Exclude decorators from source code
  },
}

export const globalStyles = (mode: 'light' | 'dark') => () => css`
  ${normalize()}

  :root {
    color-scheme: ${mode};
  }

  p {
    margin: 0 !important;
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    src: url(${InterRegularWoff2}) format('woff2');
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    src: url(${InterMediumWoff2}) format('woff2');
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    src: url(${InterSemiBoldWoff2}) format('woff2');
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
  @font-face {
    font-family: 'Space Grotesk';
    font-style: normal;
    src: url(${SpaceGroteskMediumWoff2}) format('woff2');
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Space Grotesk';
    font-style: normal;
    src: url(${SpaceGroteskRegularWoff2}) format('woff2');
    font-weight: 400;
    font-display: swap;
  }
`

const loadDateLocaleAsync = async (locale: string) => {
  if (locale === 'en') {
    return (await import('date-fns/locale/en-GB')).default
  }
  if (locale === 'fr') {
    return (await import('date-fns/locale/fr')).default
  }

  if (locale === 'es') {
    return (await import('date-fns/locale/es')).default
  }

  return (await import(`date-fns/locale/en-GB`)).default
}

const loadDateLocale = (locale: string) => {
  if (locale === 'en') {
    return enGB
  }
  if (locale === 'fr') {
    return frFr
  }
  if (locale === 'es') {
    return es
  }

  return enGB
}

const decorators: Preview['decorators'] = [
  StoryComponent => {
    const mode = useDarkMode() ? 'dark' : 'light'

    return (
      <I18n
        defaultLoad={async ({ locale }) => import(`./locales/${locale}.json`)}
        defaultLocale="en"
        defaultTranslations={{}}
        enableDebugKey={false}
        enableDefaultLocale={false}
        loadDateLocale={loadDateLocale}
        loadDateLocaleAsync={loadDateLocaleAsync}
        localeItemStorage="localeI18n"
        supportedLocales={['en', 'fr', 'es']}
      >
        <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
          <Global styles={[globalStyles(mode)]} />
          <StoryComponent />
        </ThemeProvider>
      </I18n>
    )
  },
]

export default {
  parameters,
  decorators,
} satisfies Preview
