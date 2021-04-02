import React from 'react'
import { css, ThemeProvider } from '@emotion/react'

import theme from '../src/theme'
import { GlobalStyle } from '../src'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  previewTabs: { canvas: { hidden: true } },
  options: {
    storySort: {
      order: ['Home', 'Migration'],
    },
  },
}

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

export const decorators = [
  Story => (
    <>
      <ThemeProvider theme={adjustedTheme}>
        <GlobalStyle
          additionalStyles={[
            css`
              body {
                overflow: initial !important;
              }
            `,
          ]}
        />
        <Story />
      </ThemeProvider>
    </>
  ),
]
