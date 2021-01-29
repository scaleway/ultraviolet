import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { Normalize } from '@smooth-ui/core-em'

import { theme } from '../src'

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

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <>
        <Normalize />
        <Story />
      </>
    </ThemeProvider>
  ),
]
