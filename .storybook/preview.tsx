import React from 'react'
import I18n from '@scaleway/use-i18n'
import { Story } from '@storybook/react'
import { css, ThemeProvider, Global, Theme } from '@emotion/react'
import { mockRandom } from 'jest-mock-random'
import normalize from '../src/utils/normalize'

import theme from '../src/theme'

if (process.env.STORYBOOK_ENVIRONMENT === 'visual') mockRandom([0.25, 0.5])

const STORY_SORT = {
  order: ['Home', 'Testing', 'Theme', 'Components'],
}

const ENV_PARAMETERS = {
  development: {
    actions: { disable: true, argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    viewMode: 'canvas',
    previewTabs: {
      'storybook/docs/panel': { index: 1 },
    },
    viewport: {
      viewports: {},
    },
    options: {
      storySort: STORY_SORT,
    },
  },
  production: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    viewMode: 'docs',
    previewTabs: { canvas: { hidden: true } },
    options: {
      storySort: STORY_SORT,
    },
  },
  visual: {},
}
ENV_PARAMETERS.visual = ENV_PARAMETERS.production

export const parameters =
  ENV_PARAMETERS[
    process.env.STORYBOOK_ENVIRONMENT as keyof typeof ENV_PARAMETERS
  ] || ENV_PARAMETERS.production

const adjustedTheme = (ancestorTheme: Record<string, unknown>) => ({
  ...ancestorTheme,
  ...Object.keys(theme).reduce(
    (acc, themeItem) => ({
      ...acc,
      [themeItem]: {
        ...((acc[themeItem] as Record<string, unknown>) ?? {}),
        ...(theme[themeItem as keyof typeof theme] as Record<string, unknown>),
      },
    }),
    ancestorTheme,
  ),
})

export const globalStyles = (theme: Theme) => css`
  ${normalize()}

  body {
    font-family: ${theme.fonts.sansSerif};
  }
`

export const decorators = [
  (StoryComponent: Story) => (
    <I18n
      defaultLoad={async ({ locale }) => import(`./locales/${locale}.json`)}
      defaultLocale="en"
      defaultTranslations={{}}
      enableDebugKey={false}
      enableDefaultLocale={false}
      loadDateLocale={async locale => import(`date-fns/locale/${locale}/index`)}
      localeItemStorage="localeI18n"
      supportedLocales={['en', 'fr', 'es']}
    >
      {/* @ts-expect-error adjustedTheme is a merge between storybook theme and our own theme */}
      <ThemeProvider theme={adjustedTheme}>
        <Global styles={[globalStyles]} />
        <StoryComponent />
      </ThemeProvider>
    </I18n>
  ),
]
