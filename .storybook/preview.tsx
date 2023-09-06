import I18n from '@scaleway/use-i18n'
import { Preview } from '@storybook/react'
import { css, Global, Theme, ThemeProvider } from '@emotion/react'
import { normalize } from '@ultraviolet/ui'
import { themes } from '@storybook/theming'
import seedrandom from 'seedrandom'
import { dark, light } from './storybookThemes'
import lightTheme, { darkTheme } from '../packages/ui/src/theme'
import DocsContainer from './components/DocsContainer'
import Page from './components/Page'
import isChromatic from 'chromatic/isChromatic'
import AsapRegularWoff2 from './assets/fonts/asap/Asap-Regular.woff2'
import AsapMediumWoff2 from './assets/fonts/asap/Asap-Medium.woff2'
import AsapBoldWoff2 from './assets/fonts/asap/Asap-Bold.woff2'
import JetBrains from './assets/fonts/jetbrains/JetBrainsMono-Regular.woff2'

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

  previewTabs: { 'storybook/docs/panel': { index: -1 } },

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
        'Responsive',
        'Components',
        'Icons',
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

export const globalStyles = (mode: 'light' | 'dark') => (theme: Theme) => css`
  ${normalize()}
  body {
    color: ${theme.colors.neutral.text};
  }

  :root {
    color-scheme: ${mode};
  }

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

export const globalTypes: Preview['globalTypes'] = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      // The icon for the toolbar item
      icon: 'circlehollow',
      // Array of options
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
}

export const decorators: Preview['decorators'] = [
  (StoryComponent, context) => {
    const theme = context.parameters['theme'] || context.globals['theme']
    const storyTheme = theme === 'dark' ? darkTheme : lightTheme

    console.log(theme)

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
        <ThemeProvider theme={storyTheme}>
          <Global styles={[globalStyles(theme)]} />
          <StoryComponent />
        </ThemeProvider>
      </I18n>
    )
  },
]

export default {
  parameters,
  decorators,
  globalTypes,
} satisfies Preview
