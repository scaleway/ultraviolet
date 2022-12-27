import {
  isValidElement,
  cloneElement,
  FunctionComponent,
  ReactNode,
} from 'react'
import {
  DocsContainer as BaseContainer,
  DocsContainerProps,
} from '@storybook/addon-docs'
import { useDarkMode } from 'storybook-dark-mode'
import { light, dark } from '../storybookThemes'
import { darkTheme } from '../../packages/ui/src'
import { ThemeProvider, Global, css } from '@emotion/react'
import lightTheme from '../../packages/ui/src/theme'
import AsapRegularWoff2 from '../assets/fonts/asap/Asap-Regular.woff2'
import AsapMediumWoff2 from '../assets/fonts/asap/Asap-Medium.woff2'
import AsapBoldWoff2 from '../assets/fonts/asap/Asap-Bold.woff2'
import JetBrains from '../assets/fonts/jetbrains/JetBrainsMono-Regular.woff2'

export const fonts = css`
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

type ExtraProps = {
  deprecated: boolean
  deprecatedReason: string
  migrationLink: string
}

const CustomBaseContainer = BaseContainer as unknown as FunctionComponent<
  DocsContainerProps & { children: ReactNode } & {
    context: {
      parameters: ExtraProps
    }
  }
>

const DocsContainer: typeof CustomBaseContainer = ({ context, children }) => {
  const isDarkTheme = useDarkMode()
  const currentTheme = isDarkTheme ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={currentTheme}>
      <Global styles={[fonts]} />
      <CustomBaseContainer
        context={{
          ...context,
          storyById: (id: any) => {
            const storyContext = context.storyById(id)
            return {
              ...storyContext,
              parameters: {
                ...storyContext?.parameters,
                docs: {
                  ...storyContext?.parameters?.['docs'],
                  theme: isDarkTheme ? dark : light,
                },
              },
            }
          },
        }}
      >
        {isValidElement<ExtraProps>(children)
          ? cloneElement(children, {
              deprecated: context.parameters?.deprecated,
              deprecatedReason: context.parameters?.deprecatedReason,
              migrationLink: context.parameters?.migrationLink,
            })
          : children}
      </CustomBaseContainer>
    </ThemeProvider>
  )
}

export default DocsContainer
