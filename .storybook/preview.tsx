import { Global, ThemeProvider } from '@emotion/react'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import type { Preview, StoryFn } from '@storybook/react-vite'
import { themes } from 'storybook/theming'
import {
  consoleDarkTheme as darkTheme,
  consoleDarkerTheme as darkerTheme,
  consoleLightTheme as lightTheme,
  ThemeProvider as ThemeProviderUI
} from '@ultraviolet/themes'
import DocsContainer from './components/DocsContainer'
import Page from './components/Page'
import { globalStyles } from './components/globalStyle'
import { dark, light } from './storybookThemes'
import '@ultraviolet/fonts/fonts.css'
import { scan } from "react-scan"

const BREAKPOINT_ORDER = [
  'xlarge',
  'large',
  'medium',
  'small',
  'xsmall',
  'xxsmall',
]

const VIEWPORTS = BREAKPOINT_ORDER.reduce((acc, key) => {
  if (key in lightTheme.breakpoints) {
    return {
      ...acc,
      [key]: {
        name: key,
        styles: {
          width: lightTheme.breakpoints[key as keyof typeof lightTheme.breakpoints],
          height: '600px',
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
  darkMode: {
    dark: { ...themes.dark, ...dark },
    light: { ...themes.normal, ...light, default: true },
  },
  backgrounds: {
    disable: true,
    grid: {
      disable: true,
    },
    values: [
      {
        name: 'light',
        value: 'linear-gradient(90deg,#ffffff 10px,transparent 1%) 50%,linear-gradient(#ffffff 10px,transparent 1%) 50%,#eceef2',
        textColor: '#3f4250',
      },
      {
        name: 'dark',
        value: 'linear-gradient(90deg,#151a2d 10px,transparent 1%) 50%,linear-gradient(#151a2d 10px,transparent 1%) 50%,#303445',
        textColor: '#b8bac0',
      },
      {
        name: 'darker',
        value: 'linear-gradient(90deg,#000000 10px,transparent 1%) 50%,linear-gradient(#000000 10px,transparent 1%) 50%,#151a2d',
        textColor: '#d8d9dc',
      },
    ],
  },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: false },
  },
  viewport: {
    viewports: {
      ...VIEWPORTS
    }
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
        'Migrations',
        'Components',
        'Icons',
        'Plus',
        'Form',
        ['Introduction', 'Changelog', 'Components'],
      ],
    },
  },
  docs: {
    toc: true,
    container: DocsContainer,
    page: Page,
    source: { excludeDecorators: true }, // Exclude decorators from source code
  },
}

const getThemeColor = (theme: string) => {
  const { value: background, textColor } =
    parameters['backgrounds'].values.find(
      ({ name }: { name: string }) => name === theme,
    ) ?? parameters['backgrounds'].values[0]

  return { background, textColor }
}

const withThemeProvider = (Story: StoryFn, context: { globals: { theme: string } }) => {
  const { theme } = context.globals
  const { background, textColor } = getThemeColor(theme)

  return (
    <div
      style={{
        background,
        backgroundPosition: '-4px -4px',
        backgroundSize: '12px 12px',
        padding: '30px',
        color: textColor,
      }}
    >
      <Story {...context} />
    </div>
  )
}

const decorators = [
  (Story: StoryFn, context: { globals: { theme: string } }) => {
    const theme = context.globals.theme || "light"
    const finalTheme = () => {
      if (theme === "light") {
        return lightTheme
      }
      if (theme === "dark") {
        return darkTheme
      }

      return darkerTheme
    }

    return (
      <>
        <ThemeProviderUI theme={finalTheme()}>
          {
            // eslint-disable-next-line react/jsx-curly-brace-presence
            <Story />
          }
        </ThemeProviderUI>
      </>
    )}, // Storybook is broken without this please refer to this issue: https://github.com/storybookjs/storybook/issues/24625
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
      darker: darkerTheme,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles: () => <Global styles={[globalStyles]} />,
  }),
  withThemeProvider,
]

export default {
  parameters,
  decorators,
  tags: ['autodocs']
} satisfies Preview
