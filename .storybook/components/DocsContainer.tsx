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
  /**
   * When a component is deprecated we can set this property to true
   */
  deprecated: boolean
  /**
   * When a component is deprecated we can why and by what to replace it
   */
  deprecatedReason: string
  /**
   * When a component is deprecated we can add a link to the migration guide
   */
  migrationLink: string
  /**
   * This prop, if set to true, will hide the args table where you have the props definition and controls
   */
  hideArgsTable?: boolean
  /**
   * This prop can be used to define if a component is being tested and not prod ready
   */
  experimental?: boolean
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
              hideArgsTable: context.parameters?.hideArgsTable,
              experimental: context.parameters?.experimental,
            })
          : children}
      </CustomBaseContainer>
    </ThemeProvider>
  )
}

export default DocsContainer
