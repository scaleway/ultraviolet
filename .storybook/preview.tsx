import I18n from '@scaleway/use-i18n'
import { Preview } from '@storybook/react'
import { css, ThemeProvider, Global, Theme } from '@emotion/react'
import normalize from '@ultraviolet/ui/src/utils/normalize'
import { useDarkMode } from 'storybook-dark-mode'
import { themes } from '@storybook/theming'
import seedrandom from 'seedrandom'
import { light, dark } from './storybookThemes'
import lightTheme, { darkTheme } from '../packages/ui/src/theme'
import DocsContainer from './components/DocsContainer'
import Page from './components/Page'
import isChromatic from 'chromatic/isChromatic'

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
        'Responsive',
        'Components',
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
        loadDateLocale={async locale =>
          import(`date-fns/locale/${locale}/index`)
        }
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
