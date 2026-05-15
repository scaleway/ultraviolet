import addonA11y from '@storybook/addon-a11y'
import addonDocs from '@storybook/addon-docs'
import addonLinks from '@storybook/addon-links'
import addonTheme, { withThemeByClassName } from '@storybook/addon-themes'
import { definePreview } from '@storybook/react-vite'
import type { Decorator, Preview } from '@storybook/react-vite'
import {
  consoleDarkerTheme as darkerTheme,
  consoleDarkTheme as darkTheme,
  consoleLightTheme as lightTheme,
  ThemeProvider as ThemeProviderUI,
} from '@ultraviolet/themes'
import type { ReactNode } from 'react'
import { scan } from 'react-scan'
import { Fragment } from 'react/jsx-runtime'
import { themes } from 'storybook/theming'
import DocsContainer from './components/DocsContainer'
import Page from './components/Page'
import '@ultraviolet/fonts/fonts.css'

import { dark, light } from './storybookThemes'

const BREAKPOINT_ORDER = ['xlarge', 'large', 'medium', 'small', 'xsmall', 'xxsmall'] as const

const VIEWPORTS = BREAKPOINT_ORDER.reduce((acc, key) => {
  if (key in lightTheme.breakpoints) {
    return {
      ...acc,
      [key]: {
        name: key,
        styles: {
          height: '600px',
          width: lightTheme.breakpoints[key],
        },
      },
    }
  }
  return acc
}, {})

scan({
  enabled: true,
  log: true,
})

const parameters: Preview['parameters'] = {
  backgrounds: {
    disable: true,
    grid: {
      disable: true,
    },
    values: [
      {
        name: 'light',
        textColor: '#3f4250',
        value:
          'linear-gradient(90deg,#ffffff 10px,transparent 1%) 50%,linear-gradient(#ffffff 10px,transparent 1%) 50%,#eceef2',
      },
      {
        name: 'dark',
        textColor: '#b8bac0',
        value:
          'linear-gradient(90deg,#151a2d 10px,transparent 1%) 50%,linear-gradient(#151a2d 10px,transparent 1%) 50%,#303445',
      },
      {
        name: 'darker',
        textColor: '#d8d9dc',
        value:
          'linear-gradient(90deg,#000000 10px,transparent 1%) 50%,linear-gradient(#000000 10px,transparent 1%) 50%,#151a2d',
      },
    ],
  },
  darkMode: {
    dark: { ...themes.dark, ...dark },
    light: { ...themes.normal, ...light, default: true },
  },
  docs: {
    container: DocsContainer,
    page: Page,
    source: { excludeDecorators: true }, // Exclude decorators from source code
    toc: true,
  },
  options: {
    storySort: {
      order: [
        'Get started',
        'Components state',
        'Testing',
        'Changelog',
        'Guidelines',
        'Customization',
        ['Understand Tokens'],
        ['Dark mode', 'Colors', 'Typography', 'Shadows', 'Spaces and Radii'],
        'Tools',
        'State',
        'Guides',
        ['Components state', 'Properties'],
        'UI',
        'Compositions',
        'Icons',
        'Form',
        ['Introduction', 'Changelog', 'Components'],
        'Migrations',
      ],
    },
  },
  previewTabs: {
    canvas: { hidden: false },
  },
  controls: {
    exclude: 'data-flip-id',
  },
  viewMode: 'docs',
  viewport: {
    viewports: {
      ...VIEWPORTS,
    },
  },
} as const

const getThemeColor = (theme: string) => {
  const { value: background, textColor } =
    parameters['backgrounds'].values.find(({ name }: { name: string }) => name === theme) ??
    parameters['backgrounds'].values[0]

  return { background, textColor }
}

function DottedBackground({ theme, children }: { theme: string; children: ReactNode }) {
  const { background, textColor } = getThemeColor(theme)

  return (
    <div
      style={{
        background,
        backgroundPosition: '-4px -4px',
        backgroundSize: '12px 12px',
        color: textColor,
        padding: '30px',
      }}
    >
      {children}
    </div>
  )
}

const decorators: Decorator[] = [
  (Story, args) => {
    const { context } = args
    const { theme: globalTheme } = context.globals
    const theme = (globalTheme as 'light' | 'dark' | undefined) || 'light'
    const finalTheme = () => {
      if (theme === 'light') {
        return lightTheme
      }
      if (theme === 'dark') {
        return darkTheme
      }

      return darkerTheme
    }

    const Wrapper = context.parameters['layout'] === 'fullscreen' ? Fragment : DottedBackground

    return (
      <Wrapper theme={theme}>
        <ThemeProviderUI theme={finalTheme()}>
          <Story {...context} />
        </ThemeProviderUI>
      </Wrapper>
    )
  },
  withThemeByClassName({
    defaultTheme: 'light',
    themes: {
      dark: 'dark',
      darker: 'darker',
      light: '',
    },
  }),
]

export default definePreview({
  decorators,
  parameters,
  addons: [addonDocs(), addonLinks(), addonA11y(), addonTheme()],
  tags: ['autodocs'],
})
