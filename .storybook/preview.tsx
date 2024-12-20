import { Global, ThemeProvider } from '@emotion/react'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import type { Preview, StoryFn } from '@storybook/react'
import { themes } from '@storybook/theming'
import {
  consoleDarkTheme as darkTheme,
  consoleDarkerTheme as darkerTheme,
  consoleLightTheme as lightTheme,
} from '@ultraviolet/themes'
import DocsContainer from './components/DocsContainer'
import Page from './components/Page'
import { globalStyles } from './components/globalStyle'
import { dark, light } from './storybookThemes'
import '@ultraviolet/fonts/fonts.css'

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
        value: '#ffffff',
        textColor: '#3f4250',
      },
      {
        name: 'dark',
        value: '#151a2d',
        textColor: '#b8bac0',
      },
      {
        name: 'darker',
        value: '#000000',
        textColor: '#d8d9dc',
      },
    ],
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
        'Guidelines',
        'Customization',
        ['Understand Tokens'],
        ['Dark mode', 'Colors', 'Typography', 'Shadows', 'Spaces and Radii'],
        'Tools',
        'State',
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
  const { value: backgroundColor, textColor } =
    parameters['backgrounds'].values.find(
      ({ name }: { name: string }) => name === theme,
    ) ?? parameters['backgrounds'].values[0]

  return { backgroundColor, textColor }
}

const withThemeProvider = (Story: StoryFn, context: { globals: any }) => {
  const { theme } = context.globals
  const { backgroundColor, textColor } = getThemeColor(theme)

  return (
    <div
      style={{
        backgroundColor,
        padding: '30px',
        color: textColor,
      }}
    >
      <Story {...context} />
    </div>
  )
}

const decorators = [
  (Story: StoryFn) => {
    return <>{<Story />}</> // Storybook is broken without this please refer to this issue: https://github.com/storybookjs/storybook/issues/24625
  },
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
} satisfies Preview
