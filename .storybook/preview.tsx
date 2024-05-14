import type { Preview, StoryFn } from '@storybook/react'
import { css, ThemeProvider, Global } from '@emotion/react'
import { normalize } from '@ultraviolet/ui'
import { themes } from '@storybook/theming'
import seedrandom from 'seedrandom'
import { light, dark } from './storybookThemes'
import {
  consoleDarkTheme as darkTheme,
  consoleLightTheme as lightTheme,
  consoleDarkerTheme as darkerTheme,
} from '@ultraviolet/themes'
import DocsContainer from './components/DocsContainer'
import Page from './components/Page'
import isChromatic from 'chromatic/isChromatic'
import JetBrains from './assets/fonts/jetbrains/JetBrainsMono-Regular.woff2'
import InterSemiBoldWoff2 from './assets/fonts/inter/Inter-SemiBold.woff2'
import InterMediumWoff2 from './assets/fonts/inter/Inter-Medium.woff2'
import InterRegularWoff2 from './assets/fonts/inter/Inter-Regular.woff2'
import SpaceGroteskMediumWoff2 from './assets/fonts/space-grotesk/SpaceGrotesk-Medium.woff2'
import SpaceGroteskRegularWoff2 from './assets/fonts/space-grotesk/SpaceGrotesk-Regular.woff2'
import { withThemeFromJSXProvider } from '@storybook/addon-themes'

if (isChromatic()) seedrandom('manual-seed', { global: true })

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

export const globalStyles = css`
  ${normalize()}

  p {
    margin: 0;
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
