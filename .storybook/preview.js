import React from 'react'
import I18n from '@scaleway/use-i18n'
import { css, ThemeProvider, Global } from '@emotion/react'
import { normalize } from 'polished'

import theme from '../src/theme'

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
}
export const parameters =
  ENV_PARAMETERS[process.env.STORYBOOK_ENVIRONMENT] || ENV_PARAMETERS.production

const adjustedTheme = ancestorTheme => ({
  ...ancestorTheme,
  ...Object.keys(theme).reduce(
    (acc, themeItem) => ({
      ...acc,
      [themeItem]: {
        ...(acc[themeItem] ?? {}),
        ...theme[themeItem],
      },
    }),
    ancestorTheme,
  ),
})

const globalStyles = theme => css`
  ${normalize()}
  /* Fallback system fonts */
  @font-face {
    font-family: 'System';
    font-style: normal;
    font-weight: 400;
    src: local('.SFNSText-Regular'),
      local('.HelveticaNeueDeskInterface-Regular'), local('.LucidaGrandeUI'),
      local('Segoe UI'), local('Ubuntu'), local('Roboto-Regular'),
      local('DroidSans'), local('Tahoma');
  }
  @font-face {
    font-family: 'System';
    font-style: normal;
    font-weight: 500;
    src: local('.SFNSText-Medium'),
      local('.HelveticaNeueDeskInterface-MediumP4'), local('.LucidaGrandeUI'),
      local('Segoe UI Semibold'), local('Ubuntu Medium'), local('Roboto-Medium'),
      local('DroidSans-Bold'), local('Tahoma Bold');
  }
  @font-face {
    font-family: 'System';
    font-style: normal;
    font-weight: 700;
    src: local('.SFNSText-Bold'), local('.HelveticaNeueDeskInterface-Bold'),
      local('.LucidaGrandeUI'), local('Segoe UI Bold'), local('Ubuntu Bold'),
      local('Roboto-Bold'), local('DroidSans-Bold'), local('Tahoma Bold');
  }
  * {
    box-sizing: border-box;
  }
  html {
    box-sizing: border-box;
    line-height: 1.5;
    font-size: 16px;
    height: 100%;
    -webkit-tap-highlight-color: transparent;
    margin: 0;
  }
  body {
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray700};
    font-family: ${theme.fonts.sansSerif};
    overflow: hidden;
    height: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  input,
  textarea,
  select,
  button {
    font-family: ${theme.fonts.sansSerif};
  }
  button,
  html [type='button'],
  [type='reset'],
  [type='submit'] {
    appearance: none;
  }
  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }
  a {
    color: ${theme.colors.blue};
    text-decoration: none;
  }
  a:hover,
  a:focus,
  a:active {
    color: ${theme.colors.darkBlue};
    text-decoration: underline;
  }
  p {
    margin: 0;
  }
`

const overflowStyle = css`
  body {
    overflow: initial !important;
  }
`

export const decorators = [
  Story => (
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
      <ThemeProvider theme={adjustedTheme}>
        <Global styles={[globalStyles, overflowStyle]} />
        <Story />
      </ThemeProvider>
    </I18n>
  ),
]
